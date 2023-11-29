import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useState, useMemo, useEffect, useRef } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

import { CHECKOUT_STEPS_KEYS } from '../../constants';
import { useCheckoutPageContext } from '../../context';
import {
    serializeShippingMethod,
    deserializeShippingMethod
} from '../../utils';

import { useUserContext } from '@app/context/user';

import CheckoutPickupStepOperations from './pickup.gql';

const STORE_PICKUP_METHOD = 'storepickup';

export const usePickup = () => {
    const {
        mutations: { setShippingMethodMutation },
        queries: { getPaymentStepDataQuery, getRewardsQuery }
    } = CheckoutPickupStepOperations;

    const [
        { cartId, currentStep, currentStepData },
        { changeActiveTab, changeCurrentStep, setPhoneNumber }
    ] = useCheckoutPageContext();
    const [{ isSignedIn }] = useUserContext();

    const formApi = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const [, { dispatch }] = useEventingContext();

    // Preload rewards data as Loyalty API can be slow
    const { data: rewardsData } = useQuery(getRewardsQuery, {
        variables: {
            cartId
        },
        skip: !isSignedIn || !cartId,
        fetchPolicy: 'network-only'
    });
    const hasRewardsData = useMemo(() => {
        return !isSignedIn || !!rewardsData;
    }, [isSignedIn, rewardsData]);
    const [formData, setFormData] = useState(null);

    const [setShippingMethod] = useMutation(setShippingMethodMutation, {
        fetchPolicy: 'network-only'
    });

    const getPaymentStepData = useAwaitQuery(getPaymentStepDataQuery);

    /**
     * Derived primary shipping address
     */
    const derivedPrimaryShippingAddress = useMemo(() => {
        return currentStepData.cart.shipping_addresses.length
            ? currentStepData.cart.shipping_addresses[0]
            : null;
    }, [currentStepData]);

    /**
     * Derived sms data
     */
    const derivedSmsData = useMemo(() => {
        return currentStepData?.cart?.sms?.length
            ? currentStepData.cart.sms
            : null;
    }, [currentStepData]);

    /**
     * Derived sms data
     */
    const derivedPickupPersonData = useMemo(() => {
        if (currentStepData.cart?.pickup_person?.phoneNumber?.length) {
            return {
                email: currentStepData.cart.pickup_person.email,
                firstname: currentStepData.cart.pickup_person.firstname,
                lastname: currentStepData.cart.pickup_person.lastname,
                phoneNumber: currentStepData.cart.pickup_person.phoneNumber,
                hideFields: currentStepData.cart.pickup_person.hideFields
            };
        }
        return null;
    }, [currentStepData]);

    /**
     * Form initial values
     */
    const initialValues = useMemo(() => {
        const value = {};

        if (derivedPrimaryShippingAddress) {
            const selectedShippingMethod =
                derivedPrimaryShippingAddress.selected_shipping_method ||
                derivedPrimaryShippingAddress.available_shipping_methods?.find(
                    m => m.method_code === STORE_PICKUP_METHOD
                );

            if (selectedShippingMethod) {
                value.shippingMethod = serializeShippingMethod(
                    selectedShippingMethod
                );
            }
        }

        if (derivedSmsData) {
            value.shouldSave = true;
        }

        value.phoneNumber =
            currentStepData?.cart?.guestCheckoutCustomerInfo?.phone ||
            derivedSmsData;

        if (derivedPickupPersonData) {
            // In case the customer information was selected from the customer,
            // don't auto select the pickup person option
            value.pickupPerson = derivedPickupPersonData.hideFields ? '0' : '1';
            value.pickupEmail = derivedPickupPersonData.email;
            value.pickupFirstname = derivedPickupPersonData.firstname;
            value.pickupLastname = derivedPickupPersonData.lastname;
            value.pickupPhone = derivedPickupPersonData.phoneNumber;
        } else {
            value.pickupPerson = '0';
        }

        return value;
    }, [
        derivedPrimaryShippingAddress,
        derivedSmsData,
        currentStepData,
        derivedPickupPersonData
    ]);

    /**
     * Helper for getting formApi ref
     */
    const getFormApi = useCallback(v => {
        formApi.current = v;
    }, []);

    /**
     * Handler for submit form
     */
    const handleSubmit = useCallback(
        async formValues => {
            setIsLoading(true);

            // Do not continue if rewards data has not loaded yet
            if (!hasRewardsData) {
                setFormData(formValues);
                return;
            }

            const [carrier_code, method_code] = deserializeShippingMethod(
                formValues.shippingMethod
            );
            const tabChangeFn =
                currentStep === CHECKOUT_STEPS_KEYS.pickup
                    ? changeCurrentStep
                    : changeActiveTab;

            try {
                const variables = {
                    cartId,
                    shippingMethod: {
                        carrier_code,
                        method_code
                    },
                    skipRewards: hasRewardsData
                };

                if (formValues.pickupPerson === '1') {
                    variables.pickupPerson = {
                        firstname: formValues.pickupFirstname || '',
                        lastname: formValues.pickupLastname || '',
                        email: formValues.pickupEmail || '',
                        phoneNumber: formValues.pickupPhone || ''
                    };
                } else {
                    variables.pickupPerson = {
                        firstname: '',
                        lastname: '',
                        email: '',
                        phoneNumber: ''
                    };
                }

                if (formValues.phoneNumber) {
                    variables.sms = {
                        phoneNumber: formValues.phoneNumber || '',
                        shouldSave: formValues.shouldSave || false
                    };
                }

                const { data: cartResult } = await setShippingMethod({
                    variables
                });

                dispatch({
                    type: 'SHIPPING_METHOD_MUTATION',
                    payload: cartResult.setShippingMethodsOnCart.cart
                });

                await getPaymentStepData({
                    fetchPolicy: 'network-only',
                    variables: {
                        isSignedIn
                    }
                });

                setIsLoading(false);
                setPhoneNumber(formValues.phoneNumber);
                tabChangeFn(CHECKOUT_STEPS_KEYS.payment);
            } catch (e) {
                process.env.NODE_ENV !== 'production' && console.error(e);
                setIsLoading(false);
            }
        },
        [
            cartId,
            changeActiveTab,
            changeCurrentStep,
            currentStep,
            dispatch,
            getPaymentStepData,
            hasRewardsData,
            isSignedIn,
            setPhoneNumber,
            setShippingMethod
        ]
    );

    // Wait for rewards and only then continue to next step
    useEffect(() => {
        if (isLoading && hasRewardsData && !!formData) {
            handleSubmit({ ...formData });
            setFormData(null);
        }
    }, [formData, handleSubmit, hasRewardsData, isLoading]);

    /**
     * Reset the form whenever initial values change
     */
    useEffect(() => {
        formApi.current && formApi.current.reset();
    }, [initialValues]);

    useEffect(() => {
        dispatch({
            type: 'CHECKOUT_PICKUP_STEP_ENTER'
        });
    }, [dispatch]);

    return {
        getFormApi,
        initialValues,
        isLoading,
        handleSubmit,
        isSignedIn
    };
};
