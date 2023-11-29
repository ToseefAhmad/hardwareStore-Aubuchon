import { useMemo } from 'react';

/**
 * Helper for formatting field names
 *
 * @param {string} name
 *
 * @return string
 */
export const formatAdditionalDataFieldName = name => {
    switch (name) {
        case 'cc_type':
            return 'Credit Card Type';
        case 'cc_number':
            return 'Credit Card Number';
        default:
            return name;
    }
};

/**
 * Helper for formatting field values
 * @param {string|number} value
 * @param {string} type
 * @return {string}
 */
export const formatAdditionalDataFieldValue = (value, type) => {
    if (type === 'cc_number') {
        const parts = ('' + value).split('-');
        const lastDigits = parts[parts.length - 1];

        return `**** **** **** ${lastDigits}`;
    }

    return value;
};

/**
 * PaymentMethodSection component talon
 *
 * @param {OrderInfo} orderInfo
 */
export const usePaymentMethodSection = ({ orderInfo }) => {
    const paymentMethodInfo = useMemo(() => {
        const {
            payment_methods: [paymentMethodInfo]
        } = orderInfo;

        return {
            name: paymentMethodInfo.name,
            additionalData: paymentMethodInfo.additional_data
        };
    }, [orderInfo]);

    return {
        paymentMethodInfo
    };
};

/**
 * JSDoc type definitions
 */

/**
 * @typedef PaymentMethodAdditionalData
 *
 * @property {string} name
 * @property {number} value
 */

/**
 * @typedef PaymentMethod
 *
 * @property {string} name
 * @property {PaymentMethodAdditionalData[]} additional_data
 */

/**
 * @typedef OrderInfo
 *
 * @property {PaymentMethod[]} payment_methods
 */
