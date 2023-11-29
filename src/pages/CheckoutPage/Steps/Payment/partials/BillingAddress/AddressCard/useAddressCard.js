import { useFormApi, useFormState } from 'informed';
import { useEffect, useMemo } from 'react';

import { PAYMENT_FORM_FIELDS } from '@app/pages/CheckoutPage/Steps/Payment/constants';

export const useAddressCard = ({ autoSelectedAddress }) => {
    const { setValue } = useFormApi();
    const formState = useFormState();

    /**
     * Address card data
     */
    const addressCardData = useMemo(() => {
        const {
            id,
            firstname,
            lastname,
            street: [street],
            city,
            region: { region },
            postcode,
            country_code,
            telephone
        } = autoSelectedAddress;

        return {
            id,
            name: `${firstname} ${lastname}`,
            address: `${street}, ${city}, ${region}, ${postcode}, ${country_code}`,
            phone: telephone
        };
    }, [autoSelectedAddress]);

    /**
     * Address card config for render
     */
    const addressCardConfig = useMemo(() => {
        const { name, address, phone } = addressCardData;

        return [
            {
                label: 'Name',
                value: name
            },
            {
                label: 'Address',
                value: address
            },
            {
                label: 'Phone',
                value: phone
            }
        ];
    }, [addressCardData]);

    useEffect(() => {
        // Set the selected address in form so payment handler can use it.
        if (
            formState &&
            formState.values[PAYMENT_FORM_FIELDS.billingCustomerAddresses] !==
                autoSelectedAddress.id
        ) {
            setValue(
                PAYMENT_FORM_FIELDS.billingCustomerAddresses,
                autoSelectedAddress.id
            );
        }
    }, [autoSelectedAddress.id, setValue, formState]);

    return {
        addressCardConfig
    };
};
