import { useFieldState } from 'informed';
import { useCallback, useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import { useCheckoutPageContext } from '../../../context';
import { serializeShippingMethod } from '../../../utils';

import { priceFormatter } from '@app/utils/priceFormatter';

// Sorts available shipping methods by price.
const byPrice = (a, b) => a.amount.value - b.amount.value;

const FIELD_NAME = 'shippingMethod';
const DEFAULT_AVAILABLE_SHIPPING_METHODS = [];
const SHIPPING_METHODS_WITH_DESCRIPTION = ['curbside', 'storepickup'];

export const useShippingMethodBlock = () => {
    const [{ currentStepData }] = useCheckoutPageContext();
    const { locale } = useIntl();
    const fieldState = useFieldState(FIELD_NAME);
    const [, { dispatch }] = useEventingContext();
    const isEventSent = useRef(false);

    /**
     * Derived primary shipping address
     */
    const derivedPrimaryShippingAddress = useMemo(() => {
        return currentStepData.cart.shipping_addresses.length
            ? currentStepData.cart.shipping_addresses[0]
            : null;
    }, [currentStepData]);

    /**
     * Derived primary shipping methods
     */
    const derivedShippingMethods = useMemo(() => {
        if (!derivedPrimaryShippingAddress)
            return DEFAULT_AVAILABLE_SHIPPING_METHODS;

        const rawShippingMethods =
            derivedPrimaryShippingAddress.available_shipping_methods;
        const shippingMethodsByPrice = [...rawShippingMethods].sort(byPrice);

        return shippingMethodsByPrice.map(shippingMethod => {
            const { amount, method_code, method_title } = shippingMethod;

            const serialized_value = serializeShippingMethod(shippingMethod);
            const price = !amount.value
                ? 'Free'
                : priceFormatter({
                      locale,
                      currency: amount.currency,
                      value: amount.value
                  });
            let title = method_title;
            let description = '';

            if (SHIPPING_METHODS_WITH_DESCRIPTION.includes(method_code)) {
                const CURBSIDE_TITLE = 'Curbside Pickup';
                const STORE_PICKUP_TITLE = 'Store Pickup';
                const CURBSIDE_DESCRIPTION =
                    'Enter a mobile number below, pull up in your vehicle, check-in on your phone, and sit tight while we bring it out to you—quick & easy';
                const STORE_PICKUP_DESCRIPTION =
                    'Have your order waiting for you at the store—quick & easy';

                title =
                    method_code === 'curbside'
                        ? CURBSIDE_TITLE
                        : STORE_PICKUP_TITLE;
                description =
                    method_code === 'curbside'
                        ? CURBSIDE_DESCRIPTION
                        : STORE_PICKUP_DESCRIPTION;
            }

            return {
                serialized_value,
                label: `${price} ${title}`,
                description
            };
        });
    }, [derivedPrimaryShippingAddress, locale]);

    const handleEvent = useCallback(() => {
        if (!isEventSent.current) {
            isEventSent.current = true;
            dispatch({
                type: 'CHECKOUT_SELECT_SHIPPING_METHOD'
            });
        }
    }, [dispatch]);

    return {
        fieldName: FIELD_NAME,
        fieldState,
        derivedShippingMethods,
        handleEvent
    };
};
