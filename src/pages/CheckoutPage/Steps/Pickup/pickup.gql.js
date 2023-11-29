import { gql } from '@apollo/client';

import {
    CheckoutPaymentStepAdditionalFragment,
    CheckoutPaymentStepFragment,
    CheckoutRewardFragment
} from '../Payment/paymentFragment.gql';
import {
    SelectedShippingMethodCheckoutFragment,
    PickupPersonFragment
} from './pickupFragment.gql';

const SET_SHIPPING_METHOD = gql`
    mutation SetShippingMethod(
        $cartId: String!
        $shippingMethod: ShippingMethodInput!
        $pickupPerson: PickupPersonInput
        $sms: SmsOptinInput
        $skipRewards: Boolean!
    ) {
        setShippingMethodsOnCart(
            input: {
                cart_id: $cartId
                shipping_methods: [$shippingMethod]
                pickupPerson: $pickupPerson
                sms: $sms
            }
        ) {
            cart {
                id
                ...SelectedShippingMethodCheckoutFragment
                ...CheckoutPaymentStepFragment
                ...PickupPersonFragment
            }
        }
    }
    ${SelectedShippingMethodCheckoutFragment}
    ${CheckoutPaymentStepFragment}
    ${PickupPersonFragment}
`;

const GET_PAYMENT_STEP_DATA = gql`
    query GetPaymentStepData($isSignedIn: Boolean!) {
        ...CheckoutPaymentStepAdditionalFragment
    }
    ${CheckoutPaymentStepAdditionalFragment}
`;

const GET_REWARDS = gql`
    query getRewards($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...CheckoutRewardFragment
        }
    }
    ${CheckoutRewardFragment}
`;

export default {
    mutations: {
        setShippingMethodMutation: SET_SHIPPING_METHOD
    },
    queries: {
        getPaymentStepDataQuery: GET_PAYMENT_STEP_DATA,
        getRewardsQuery: GET_REWARDS
    }
};
