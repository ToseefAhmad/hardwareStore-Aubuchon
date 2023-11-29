import { useApolloClient, useMutation } from '@apollo/client';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha/useGoogleReCaptcha';
import { normalizeTokens } from '@magento/peregrine/lib/talons/SavedPaymentsPage/useSavedPaymentsPage';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

import { useCheckoutPageContext } from '../../context';

import { APP_ROUTER_PATHS } from '@app/constants';
import { useBrandContext } from '@app/context/Brand';
import useSubmitAnimation from '@app/hooks/useSubmitAnimation';
import { PAYMENT_METHOD_CODES } from '@app/pages/CheckoutPage/constants';
import { PAYMENT_METHODS_CONFIG } from '@app/pages/CheckoutPage/Steps/Payment/partials/PaymentMethods/paymentMethods.config';
import { smoothScroll } from '@app/utils/smooth-scroll';

import {
    CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE,
    PAYMENT_FORM_FIELDS,
    STORE_CARD
} from './constants';
import CheckoutPaymentStepOperations from './payment.gql';

/**
 * Filter out methods that shouldn't be displayed
 */
const enabledPaymentMethods = (methods, isFree) => {
    return methods.filter(({ code }) => {
        return PAYMENT_METHODS_CONFIG.find(
            ({ id, disabled }) =>
                id === code &&
                !disabled &&
                (!isFree || (isFree && code === PAYMENT_METHOD_CODES.free))
        );
    });
};

/**
 * Helper for getting initial values of payment method form
 */
const getPaymentMethodFormInitialValues = ({ cart }) => {
    const { paymentMethod } = PAYMENT_FORM_FIELDS;
    const enabledMethods = enabledPaymentMethods(
        cart.available_payment_methods,
        cart.prices?.grand_total?.value === 0
    );

    const values = {
        [paymentMethod]:
            cart.selected_payment_method.code || enabledMethods[0]?.code
    };

    for (const key in values) {
        if (values[key] === undefined) {
            delete values[key];
        }
    }

    return values;
};

/**
 * Helper for getting initial values of billing address form
 */
const getBillingAddressFormInitialValues = ({ countries }) => {
    const { billingCountryCode, billingCountryName } = PAYMENT_FORM_FIELDS;

    // Country is not changeable.
    const primaryCountry = countries.find(({ id }) => id === 'US');

    return {
        [billingCountryCode]: primaryCountry?.id,
        [billingCountryName]: primaryCountry?.full_name_locale
    };
};

/**
 * Helper for getting values from billing address form for it save
 */
const getBillingAddressFormValues = formValues => {
    let result = {};

    if (formValues) {
        const {
            billingFirstName,
            billingLastName,
            billingStreet,
            billingCity,
            billingRegionCode,
            billingPostCode,
            billingCountryCode,
            billingTelephone,
            billingSaveAddress
        } = PAYMENT_FORM_FIELDS;

        result = {
            firstname: formValues[billingFirstName],
            lastname: formValues[billingLastName],
            street: formValues[billingStreet],
            city: formValues[billingCity],
            region: formValues[billingRegionCode],
            postcode: formValues[billingPostCode],
            country_code: formValues[billingCountryCode],
            telephone: formValues[billingTelephone],
            save_in_address_book: !!formValues[billingSaveAddress]
        };
    }

    return result;
};

/**
 * Helper for getting initial values for selected payment method
 */
const getSelectedPaymentMethodFormInitialValues = ({ paymentTabData }) => {
    const { selectedPaymentMethod } = PAYMENT_FORM_FIELDS;

    if (!paymentTabData?.customerPaymentTokens) {
        return {
            [selectedPaymentMethod]: ''
        };
    }

    const storedPaymentMethods = normalizeTokens(paymentTabData);
    const selectedPaymentMethodData =
        storedPaymentMethods[storedPaymentMethods.length - 1];

    return {
        [selectedPaymentMethod]: selectedPaymentMethodData?.public_hash
    };
};

const storage = new BrowserPersistence();

export const usePayment = () => {
    const {
        mutations: { setBillingAddressMutation, placeOrderMutation }
    } = CheckoutPaymentStepOperations;

    const apolloClient = useApolloClient();

    const [
        { cartId, isSignedIn, currentStepData, handlePaymentMethod }
    ] = useCheckoutPageContext();
    const [, { removeCart }] = useCartContext();

    const {
        generateReCaptchaData,
        recaptchaLoading,
        recaptchaWidgetProps
    } = useGoogleReCaptcha({
        currentForm: 'PLACE_ORDER',
        formAction: 'placeOrder'
    });

    const paymentTabData = currentStepData;
    const [{ brand }] = useBrandContext();
    const [, { dispatch }] = useEventingContext();
    const formApi = useRef(null);
    const successButtonRef = useRef(null);
    const paymentMethodsBlockRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const { runAnimation } = useSubmitAnimation();
    const history = useHistory();

    const [setBillingAddress] = useMutation(setBillingAddressMutation, {
        fetchPolicy: 'network-only'
    });

    const [placeOrder] = useMutation(placeOrderMutation, {
        fetchPolicy: 'network-only',
        variables: { cartId }
    });

    const appliedRewards = useMemo(
        () => paymentTabData?.cart?.applied_rewards || [],
        [paymentTabData?.cart?.applied_rewards]
    );

    const availableRewards = useMemo(
        () => paymentTabData?.cart?.available_rewards || [],
        [paymentTabData?.cart?.available_rewards]
    );

    /**
     * Array containing both available and applied rewards in a constant order
     */
    const rewardItems = useMemo(() => {
        return availableRewards.map(availableReward => {
            const appliedReward = appliedRewards.find(reward => {
                return availableReward.id === reward.id;
            });

            return appliedReward || availableReward;
        });
    }, [availableRewards, appliedRewards]);

    /**
     * Form initial values
     */
    const initialValues = useMemo(() => {
        let value = {};

        const { cart, countries } = paymentTabData;

        value = {
            ...getPaymentMethodFormInitialValues({ cart }),
            ...getBillingAddressFormInitialValues({ countries }),
            ...getSelectedPaymentMethodFormInitialValues({ paymentTabData }),
            [STORE_CARD]: true
        };

        return value;
    }, [paymentTabData]);

    /**
     * Helper for getting formApi ref
     */
    const getFormApi = useCallback(v => {
        formApi.current = v;
    }, []);

    /**
     * Form submit handler
     */
    const handleSubmit = useCallback(
        async formValues => {
            try {
                setIsLoading(true);
                setError(null);

                let billingAddress = {};
                const selectedAddressId =
                    formValues[PAYMENT_FORM_FIELDS.billingCustomerAddresses];
                if (
                    !!selectedAddressId &&
                    selectedAddressId !== CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE
                ) {
                    billingAddress = { customer_address_id: selectedAddressId };
                } else {
                    billingAddress = {
                        address: getBillingAddressFormValues(formValues)
                    };
                    if (
                        isSignedIn &&
                        !paymentTabData?.customer?.addresses?.length
                    ) {
                        billingAddress.address.save_in_address_book = true;
                    }
                }

                if (handlePaymentMethod) {
                    await handlePaymentMethod();
                }

                const {
                    data: { setBillingAddressOnCart: orderDetailsData }
                } = await setBillingAddress({
                    variables: {
                        cartId,
                        billingAddress
                    }
                });

                dispatch({
                    type: 'PAYMENT_METHOD_MUTATION',
                    payload: orderDetailsData.cart
                });

                // Get recaptchaV3 data for place order
                const recaptchaData = await generateReCaptchaData();

                const { data: placeOrderData } = await placeOrder({
                    ...recaptchaData
                });

                // Clear apollo cache
                await apolloClient.clearCacheData(apolloClient, 'cart');
                await removeCart();

                if (placeOrderData) {
                    setIsSuccess(true);

                    // Store info needed for success/error page
                    storage.setItem('checkout_success_data', {
                        orderInfo: placeOrderData?.placeOrder?.order,
                        ...orderDetailsData
                    });

                    dispatch({
                        type: 'CHECKOUT_PURCHASE',
                        payload: {
                            orderInfo: placeOrderData?.placeOrder?.order,
                            ...orderDetailsData.cart,
                            brand
                        }
                    });

                    runAnimation(successButtonRef, async () => {
                        history.push(APP_ROUTER_PATHS.checkoutSuccessPage);
                    });
                } else {
                    throw new Error(
                        'Something went wrong with placeOrder operation.'
                    );
                }
            } catch (e) {
                process.env.NODE_ENV !== 'production' && console.error(e);
                setIsLoading(false);

                if (e?.message?.includes('BraintreeError')) {
                    smoothScroll({
                        to: {
                            y: paymentMethodsBlockRef.current.offsetTop - 140
                        },
                        duration: 750
                    });
                }

                if (e?.message?.indexOf('placeOrder')) {
                    setError(e);
                }
            }
        },
        [
            apolloClient,
            brand,
            cartId,
            dispatch,
            generateReCaptchaData,
            handlePaymentMethod,
            history,
            isSignedIn,
            paymentTabData?.customer?.addresses?.length,
            placeOrder,
            removeCart,
            runAnimation,
            setBillingAddress
        ]
    );

    return {
        isSignedIn,
        getFormApi,
        initialValues,
        handleSubmit,
        isLoading,
        isSuccess,
        successButtonRef,
        paymentMethodsBlockRef,
        error,
        rewardItems,
        appliedRewards,
        recaptchaWidgetProps,
        recaptchaLoading
    };
};
