import { PAYMENT_METHOD_CODES } from '../../../../constants';

import BraintreePayment from './partials/BraintreePayment';
import SupportedCards from './partials/SupportedCards';

/**
 * @typedef PaymentMethodConfig
 *
 * @property {string} id Payment method identifier
 * @property {React.FC} [Logo] Payment method logo component
 * @property {React.FC} [Component] Component of the additional payment method form
 */

/**
 *
 * @type {PaymentMethodConfig[]}
 */
export const PAYMENT_METHODS_CONFIG = [
    {
        id: PAYMENT_METHOD_CODES.braintree,
        Logo: SupportedCards,
        Component: BraintreePayment
    },
    {
        id: PAYMENT_METHOD_CODES.checkmo
    },
    {
        id: PAYMENT_METHOD_CODES.banktransfer
    },
    {
        id: PAYMENT_METHOD_CODES.free
    },
    {
        id:
            PAYMENT_METHOD_CODES.braintree_cc_vault /* We want to hide this payment method on FE */,
        disabled: true
    }
];
