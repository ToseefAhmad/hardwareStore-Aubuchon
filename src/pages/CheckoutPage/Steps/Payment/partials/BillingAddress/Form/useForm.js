import { useFormApi } from 'informed';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import {
    CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE,
    PAYMENT_FORM_FIELDS
} from '../../../constants';

import { useCheckoutPageContext } from '@app/pages/CheckoutPage/context';

const getFormattedCustomerAddress = address => {
    const {
        billingFirstName,
        billingLastName,
        billingCompany,
        billingTelephone,
        billingStreet,
        billingCity,
        billingRegionCode,
        billingRegionName,
        billingPostCode
    } = PAYMENT_FORM_FIELDS;

    return {
        [billingFirstName]: address.firstname || '',
        [billingLastName]: address.lastname || '',
        [billingTelephone]: address.telephone || '',
        [billingCompany]: address.company || '',
        [billingStreet]: address.street?.[0] || '',
        [billingCity]: address.city || '',
        [billingRegionCode]: address.region?.region_id || '',
        [billingRegionName]: address.region?.region || '',
        [billingPostCode]: address.postcode || ''
    };
};

export const useForm = () => {
    const { setValues } = useFormApi();
    const [
        { currentStepData: paymentTabData, phoneNumber }
    ] = useCheckoutPageContext();

    /**
     * Customer addresses values for select component
     */
    const customerAddresses = useMemo(() => {
        const addresses = paymentTabData.customer?.addresses || [];
        const defaultValue = {
            key: CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE,
            label: 'New Address',
            value: CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE
        };

        return [
            defaultValue,
            ...addresses.map(({ id, city, region: { region_code } }) => ({
                key: id,
                label: `${city}, ${region_code}`,
                value: id
            }))
        ];
    }, [paymentTabData]);

    /**
     * onChange handler for customer addresses select
     */
    const handleChangeCustomerAddress = useCallback(
        async v => {
            const { cart, customer } = paymentTabData;
            const value = v.target?.value || v;
            let values;

            if (value !== CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE) {
                values = getFormattedCustomerAddress(
                    customer?.addresses.find(({ id }) => id === +value)
                );
                values[PAYMENT_FORM_FIELDS.billingCustomerAddresses] = value;
            } else {
                values = getFormattedCustomerAddress({
                    firstname:
                        cart.guestCheckoutCustomerInfo?.firstname ||
                        customer?.firstname,
                    lastname:
                        cart.guestCheckoutCustomerInfo?.lastname ||
                        customer?.lastname,
                    telephone:
                        cart.guestCheckoutCustomerInfo?.phone ||
                        customer?.telephone ||
                        phoneNumber,
                    company: cart.guestCheckoutCustomerInfo?.company
                });
                values[
                    PAYMENT_FORM_FIELDS.billingCustomerAddresses
                ] = CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE;
            }

            setValues(values);
        },
        [paymentTabData, phoneNumber, setValues]
    );

    // If saved address is selected, do not allow field editing
    const addressId = useFieldState(
        PAYMENT_FORM_FIELDS.billingCustomerAddresses
    ).value;
    const isFormPrefilledAndDisabled = useMemo(
        () => addressId && addressId !== CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE,
        [addressId]
    );

    const isFormRendered = useRef(false);

    useEffect(() => {
        if (!isFormRendered.current) {
            isFormRendered.current = true;
            handleChangeCustomerAddress(CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE);
        }
    }, [handleChangeCustomerAddress]);

    return {
        isFormPrefilledAndDisabled,
        countries: paymentTabData.countries,
        customerAddresses,
        handleChangeCustomerAddress
    };
};
