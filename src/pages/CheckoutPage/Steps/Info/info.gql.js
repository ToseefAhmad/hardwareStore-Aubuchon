import { gql } from '@apollo/client';

import { CheckoutPickupStepFragment } from '../Pickup/pickupFragment.gql';
import { GuestCheckoutCustomerInfoFragment } from './infoFragment.gql';

const GET_EMAIL_AVAILABLE_QUERY = gql`
    query IsEmailAvailable($email: String!) {
        isEmailAvailable(email: $email) {
            is_email_available
        }
    }
`;

const SET_GUEST_EMAIL_ON_CART = gql`
    mutation SetGuestEmailOnCart($cartId: String!, $email: String!) {
        setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
            cart {
                id
                ...CheckoutPickupStepFragment
            }
        }
    }
    ${CheckoutPickupStepFragment}
`;

const WRITE_GUEST_CUSTOMER_INFO_QUERY = gql`
    query WriteGuestCustomerInfo {
        cart {
            id
            ...GuestCheckoutCustomerInfoFragment
        }
    }
    ${GuestCheckoutCustomerInfoFragment}
`;

export default {
    queries: {
        getEmailAvailableQuery: GET_EMAIL_AVAILABLE_QUERY,
        writeGuestCustomerQuery: WRITE_GUEST_CUSTOMER_INFO_QUERY
    },
    mutations: {
        setGuestEmailOnCartMutation: SET_GUEST_EMAIL_ON_CART
    }
};
