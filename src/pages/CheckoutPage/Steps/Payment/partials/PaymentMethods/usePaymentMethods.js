import { useMutation } from '@apollo/client';
import { useFieldApi, useFieldState } from 'informed';
import { useCallback, useMemo, useEffect, useState } from 'react';

import { useCheckoutPageContext } from '../../../../context';
import { PAYMENT_FORM_FIELDS } from '../../constants';

import { useUserContext } from '@app/context/user';
import { PAYMENT_METHOD_CODES } from '@app/pages/CheckoutPage/constants';

import { PAYMENT_METHODS_CONFIG } from './paymentMethods.config';
import PaymentMethodsOperations from './paymentMethods.gql';

export const usePaymentMethods = () => {
    const {
        mutations: { setPaymentMethodOnCartMutation }
    } = PaymentMethodsOperations;

    const { value: fieldValue } = useFieldState(
        PAYMENT_FORM_FIELDS.paymentMethod
    );
    const fieldApi = useFieldApi(PAYMENT_FORM_FIELDS.paymentMethod);
    const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false);

    const [
        { cartId, currentStepData: paymentTabData },
        { setHandlePaymentMethod }
    ] = useCheckoutPageContext();
    const [{ isSignedIn }] = useUserContext();

    const [setPaymentMethodOnCart] = useMutation(
        setPaymentMethodOnCartMutation,
        {
            fetchPolicy: 'network-only',
            variables: { cartId }
        }
    );

    /**
     * Payment methods
     */
    const paymentMethods = useMemo(() => {
        const filteredMethods = paymentTabData.cart.available_payment_methods.filter(
            ({ code }) => {
                return PAYMENT_METHODS_CONFIG.find(
                    ({ id, disabled }) => id === code && !disabled
                );
            }
        );

        const freePaymentMethod = filteredMethods.find(
            ({ code }) => code === PAYMENT_METHOD_CODES.free
        );
        if (freePaymentMethod) {
            return [
                {
                    value: freePaymentMethod.code,
                    label: freePaymentMethod.title
                }
            ];
        }

        return filteredMethods.map(({ code, title }) => {
            const configValue = PAYMENT_METHODS_CONFIG.find(
                ({ id }) => id === code
            );

            return {
                value: code,
                label: title,
                ...(configValue && { ...configValue })
            };
        });
    }, [paymentTabData]);

    const isStoredPaymentMethods = useMemo(() => {
        return paymentTabData?.customerPaymentTokens?.items?.length;
    }, [paymentTabData]);

    const handleShowPaymentMethodForm = useCallback(() => {
        setShowPaymentMethodForm(val => !val);
        fieldApi.setValue('braintree');
    }, [fieldApi]);

    const isZeroTotalCheckout =
        paymentMethods.length === 1 && paymentMethods[0].value === 'free';

    /**
     * Handler for payment method
     */
    const handlePayment = useCallback(async () => {
        try {
            await setPaymentMethodOnCart({
                variables: { paymentCode: fieldValue }
            });
        } catch (e) {
            throw new Error(e);
        }
    }, [setPaymentMethodOnCart, fieldValue]);

    /**
     * Method for setting default payment method handler into checkout page context
     */
    useEffect(() => {
        setHandlePaymentMethod(() => handlePayment);
    }, [
        fieldValue,
        setPaymentMethodOnCart,
        setHandlePaymentMethod,
        handlePayment
    ]);

    return {
        fieldName: PAYMENT_FORM_FIELDS.paymentMethod,
        fieldValue,
        paymentMethods,
        showSelectedPaymentMethod:
            isSignedIn &&
            isStoredPaymentMethods &&
            !showPaymentMethodForm &&
            !isZeroTotalCheckout,
        handleShowPaymentMethodForm
    };
};
