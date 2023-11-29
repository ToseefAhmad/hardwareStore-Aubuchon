import { gql } from '@apollo/client';

import {
    GET_CART_DETAILS,
    CREATE_CART
} from '@app/hooks/useAuthForm/authForm.gql';

import { OrderDetailsFragment } from './orderDetailsFragment.gql';

const SET_BILLING_ADDRESS = gql`
    mutation SetBillingAddress(
        $cartId: String!
        $billingAddress: BillingAddressInput!
    ) {
        setBillingAddressOnCart(
            input: { cart_id: $cartId, billing_address: $billingAddress }
        ) {
            cart {
                id
                ...OrderDetailsFragment
            }
        }
    }
    ${OrderDetailsFragment}
`;

const PLACE_ORDER = gql`
    mutation PlaceOrder($cartId: String!) {
        placeOrder(input: { cart_id: $cartId }) {
            order {
                order_number
                status
                meta_event_id
            }
        }
    }
`;

export default {
    mutations: {
        setBillingAddressMutation: SET_BILLING_ADDRESS,
        placeOrderMutation: PLACE_ORDER,
        createCartMutation: CREATE_CART
    },
    queries: {
        getCartDetailsQuery: GET_CART_DETAILS
    }
};
