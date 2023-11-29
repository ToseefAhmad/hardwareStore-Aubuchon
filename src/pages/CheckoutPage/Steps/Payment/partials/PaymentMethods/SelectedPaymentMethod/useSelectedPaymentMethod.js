import { useMutation } from '@apollo/client';
import { useFieldState } from 'informed';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha';
import { normalizeTokens } from '@magento/peregrine/lib/talons/SavedPaymentsPage/useSavedPaymentsPage';

import { useCheckoutPageContext } from '../../../../../context';
import { PAYMENT_FORM_FIELDS } from '../../../../Payment/constants';

import { useUserContext } from '@app/context/user';

import BraintreePaymentOperations from '../partials/BraintreePayment/braintreePayment.gql';

export const useSelectedPaymentMethod = () => {
    const {
        mutations: { setBraintreeVaultCreditCardOnCartMutation }
    } = BraintreePaymentOperations;
    const { value: fieldValue } = useFieldState(
        PAYMENT_FORM_FIELDS.selectedPaymentMethod
    );

    const [
        { cartId, currentStepData: paymentTabData },
        { setHandlePaymentMethod }
    ] = useCheckoutPageContext();
    const [{ isSignedIn }] = useUserContext();

    const [isReady, setIsReady] = useState(false);

    const { recaptchaLoading } = useGoogleReCaptcha({
        currentForm: 'BRAINTREE',
        formAction: 'braintree'
    });

    const [setBraintreeVaultCreditCardOnCart] = useMutation(
        setBraintreeVaultCreditCardOnCartMutation,
        {
            fetchPolicy: 'network-only',
            variables: { cartId }
        }
    );

    const storedPaymentMethods = useMemo(() => {
        return normalizeTokens(paymentTabData);
    }, [paymentTabData]);

    const selectedPaymentMethod = useMemo(() => {
        if (!storedPaymentMethods || !storedPaymentMethods.length) return null;

        return storedPaymentMethods[storedPaymentMethods.length - 1];
    }, [storedPaymentMethods]);

    /**
     * Handler for credit card payment method
     */
    const handleCreditCardPayment = useCallback(async () => {
        try {
            if (
                !isReady &&
                selectedPaymentMethod?.public_hash &&
                !recaptchaLoading
            ) {
                setIsReady(true);

                await setBraintreeVaultCreditCardOnCart({
                    variables: {
                        publicHash: selectedPaymentMethod?.public_hash
                    }
                });
            }
        } catch (e) {
            throw new Error(e);
        }
    }, [
        isReady,
        recaptchaLoading,
        selectedPaymentMethod?.public_hash,
        setBraintreeVaultCreditCardOnCart
    ]);

    /**
     * Method for override default payment method handler into checkout page context
     */
    useEffect(() => {
        if (!isReady) {
            setHandlePaymentMethod(() => handleCreditCardPayment);
        }
    }, [
        handleCreditCardPayment,
        isReady,
        selectedPaymentMethod?.public_hash,
        setHandlePaymentMethod
    ]);

    return {
        isSignedIn,
        selectedPaymentMethod,
        fieldValue
    };
};
