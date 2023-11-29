import { gql } from '@apollo/client';

import { CheckoutPaymentStepRefreshFragment } from '../../../Payment/paymentFragment.gql';

const APPLY_CART_REWARDS = gql`
    mutation ApplyCartRewards($cartId: String!, $usedRewards: String) {
        applyCartRewards(
            input: { cartId: $cartId, usedRewards: $usedRewards }
        ) {
            cart {
                ...CheckoutPaymentStepRefreshFragment
            }
        }
    }
    ${CheckoutPaymentStepRefreshFragment}
`;

export default {
    mutations: {
        applyCartRewardsMutation: APPLY_CART_REWARDS
    }
};
