import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useMemo } from 'react';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import { normalizeTokens } from '@magento/peregrine/lib/talons/SavedPaymentsPage/useSavedPaymentsPage';

import { useCheckoutPageContext } from '../../../../../../context';
import {
    PAYMENT_FORM_FIELDS,
    SHOW_CREDIT_CARD_FORM
} from '../../../../../Payment/constants';

import { useUserContext } from '@app/context/user';
import { CARD_TYPE_MAPPER } from '@app/utils/creditCardUtils';

import BraintreePaymentOperations from './braintreePayment.gql';

export const useBraintreePayment = () => {
    const {
        mutations: { setBraintreeVaultCreditCardOnCartMutation }
    } = BraintreePaymentOperations;

    const [
        { cartId, currentStepData: paymentTabData },
        { setHandlePaymentMethod }
    ] = useCheckoutPageContext();
    const [{ isSignedIn }] = useUserContext();
    const { value: fieldValue } = useFieldState(
        PAYMENT_FORM_FIELDS.selectedPaymentMethod
    );

    const [setBraintreeVaultCreditCardOnCart] = useMutation(
        setBraintreeVaultCreditCardOnCartMutation,
        {
            fetchPolicy: 'network-only',
            variables: { cartId }
        }
    );

    const storedPaymentMethods = useMemo(() => {
        if (!isSignedIn || !paymentTabData?.customerPaymentTokens?.items)
            return [];

        return normalizeTokens(paymentTabData);
    }, [paymentTabData, isSignedIn]);

    const mappedPaymentMethods = useMemo(() => {
        const methods = [
            {
                key: 'new_credit_card',
                value: 'new_credit_card',
                label: 'New credit card'
            }
        ];

        storedPaymentMethods.forEach(({ details, public_hash }) => {
            methods.push({
                key: public_hash,
                value: public_hash,
                label: `${CARD_TYPE_MAPPER[details.type]} ending ${
                    details.maskedCC
                }, expiration date ${details.expirationDate}`
            });
        });

        return methods;
    }, [storedPaymentMethods]);

    /**
     * Handler for credit card payment method
     */
    const handleCreditCardPayment = useCallback(async () => {
        try {
            await setBraintreeVaultCreditCardOnCart({
                variables: { publicHash: fieldValue }
            });
        } catch (e) {
            throw new Error(e);
        }
    }, [fieldValue, setBraintreeVaultCreditCardOnCart]);

    const showCreditCardSelect = useMemo(() => {
        return isSignedIn && storedPaymentMethods?.length > 0;
    }, [isSignedIn, storedPaymentMethods?.length]);

    /**
     * Method for override default payment method handler into checkout page context
     */
    useEffect(() => {
        if (isSignedIn && fieldValue !== SHOW_CREDIT_CARD_FORM) {
            setHandlePaymentMethod(() => handleCreditCardPayment);
        }
    }, [
        fieldValue,
        handleCreditCardPayment,
        isSignedIn,
        setHandlePaymentMethod
    ]);

    return {
        mappedPaymentMethods,
        showCreditCardForm:
            !showCreditCardSelect || fieldValue === SHOW_CREDIT_CARD_FORM,
        showCreditCardSelect
    };
};
