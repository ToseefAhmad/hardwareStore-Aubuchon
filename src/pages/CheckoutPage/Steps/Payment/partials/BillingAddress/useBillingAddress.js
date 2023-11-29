import { useCallback, useMemo, useState } from 'react';

import { useCheckoutPageContext } from '@app/pages/CheckoutPage/context';

export const useBillingAddress = () => {
    const [{ currentStepData: paymentTabData }] = useCheckoutPageContext();

    const autoSelectedAddress = useMemo(() => {
        let addressData = null;
        const customer = paymentTabData.customer;
        if (
            !!customer?.default_billing &&
            customer.default_billing !== '0' &&
            customer?.addresses?.length > 0
        ) {
            addressData = customer.addresses.find(
                ({ id }) => id === +customer.default_billing
            );
        } else if (customer?.addresses?.length > 0) {
            addressData = customer.addresses[customer.addresses.length - 1];
        }
        return addressData;
    }, [paymentTabData.customer]);

    // Show address form if there is no customer address or if custom address was entered earlier.
    const [isFormShown, setIsFormShown] = useState(!autoSelectedAddress);

    const toggleIsShownForm = useCallback(() => {
        setIsFormShown(prevState => !prevState);
    }, []);

    return {
        isFormShown,
        toggleIsShownForm,
        autoSelectedAddress
    };
};
