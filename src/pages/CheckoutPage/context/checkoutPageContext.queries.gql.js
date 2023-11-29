import { gql } from '@apollo/client';

import { CHECKOUT_STEPS_KEYS } from '../constants';
import { CheckoutInfoStepFragment } from '../Steps/Info/infoFragment.gql';
import {
    CheckoutPaymentStepAdditionalFragment,
    CheckoutPaymentStepFragment
} from '../Steps/Payment/paymentFragment.gql';
import { CheckoutPickupStepFragment } from '../Steps/Pickup/pickupFragment.gql';

const GET_CHECKOUT_INFO_STEP_DATA = gql`
    query GetCheckoutInfoStepData($cartId: String!, $signedIn: Boolean!) {
        cart(cart_id: $cartId) {
            id
            ...CheckoutInfoStepFragment
        }
    }
    ${CheckoutInfoStepFragment}
`;

const GET_CHECKOUT_PICKUP_STEP_DATA = gql`
    query GetCheckoutPickupStepData($cartId: String!, $signedIn: Boolean!) {
        cart(cart_id: $cartId) {
            id
            ...CheckoutPickupStepFragment
        }
    }
    ${CheckoutPickupStepFragment}
`;

const GET_CHECKOUT_PAYMENT_STEP_DATA = gql`
    query GetCheckoutPaymentStepData(
        $cartId: String!
        $isSignedIn: Boolean
        $skipRewards: Boolean!
    ) {
        cart(cart_id: $cartId) {
            id
            ...CheckoutPaymentStepFragment
        }
        ...CheckoutPaymentStepAdditionalFragment
    }
    ${CheckoutPaymentStepFragment}
    ${CheckoutPaymentStepAdditionalFragment}
`;

export default {
    [CHECKOUT_STEPS_KEYS.info]: GET_CHECKOUT_INFO_STEP_DATA,
    [CHECKOUT_STEPS_KEYS.pickup]: GET_CHECKOUT_PICKUP_STEP_DATA,
    [CHECKOUT_STEPS_KEYS.payment]: GET_CHECKOUT_PAYMENT_STEP_DATA
};
