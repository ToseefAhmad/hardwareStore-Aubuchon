import { gql } from '@apollo/client';

import { CheckoutInfoStepFragment } from './Steps/Info/infoFragment.gql';
import { CheckoutPickupStepFragment } from './Steps/Pickup/pickupFragment.gql';

export const typePolicies = {
    Cart: {
        fields: {
            guestCheckoutCustomerInfo: {
                read(_, { cache }) {
                    const cacheData = cache.data.data;

                    return cacheData?.Cart?.guestCheckoutCustomerInfo || {};
                }
            }
        }
    }
};

const INITIALIZE_CHECKOUT = gql`
    mutation InitializeCheckout($cartId: String!, $isSignedIn: Boolean!) {
        initializeCheckout(cartId: $cartId) {
            cart {
                id
                ...CheckoutInfoStepFragment @skip(if: $isSignedIn)
                ...CheckoutPickupStepFragment @include(if: $isSignedIn)
            }
        }
    }
    ${CheckoutInfoStepFragment}
    ${CheckoutPickupStepFragment}
`;

export default {
    mutations: {
        initializeCheckoutMutation: INITIALIZE_CHECKOUT
    },
    typePolicies
};
