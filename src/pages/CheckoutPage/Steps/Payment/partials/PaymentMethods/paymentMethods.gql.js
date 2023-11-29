import { gql } from '@apollo/client';

import { AddDataLayerInfoFragment } from '../../../../checkoutPageFragment.gql';
import { SelectedPaymentMethodFragment } from '../../paymentFragment.gql';

const SET_PAYMENT_METHOD_ON_CART = gql`
    mutation SetPaymentMethodOnCart($cartId: String!, $paymentCode: String!) {
        setPaymentMethodOnCart(
            input: { cart_id: $cartId, payment_method: { code: $paymentCode } }
        ) {
            cart {
                id
                ...AddDataLayerInfoFragment
                ...SelectedPaymentMethodFragment
            }
        }
    }
    ${AddDataLayerInfoFragment}
    ${SelectedPaymentMethodFragment}
`;

export default {
    mutations: {
        setPaymentMethodOnCartMutation: SET_PAYMENT_METHOD_ON_CART
    }
};
