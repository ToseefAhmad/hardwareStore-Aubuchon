import { gql } from '@apollo/client';

import { MiniCartFragment } from './miniCartFragment.gql';

const GET_APPLIED_COUPONS = gql`
    query getAppliedCoupons($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...MiniCartFragment
        }
    }
    ${MiniCartFragment}
`;

const APPLY_COUPON_MUTATION = gql`
    mutation applyCouponToCart($cartId: String!, $couponCode: String!) {
        applyCouponToCart(
            input: { cart_id: $cartId, coupon_code: $couponCode }
        ) {
            cart {
                id
                ...MiniCartFragment
                # If this mutation causes "free" to become available we need to know.
                available_payment_methods {
                    code
                    title
                }
            }
        }
    }
    ${MiniCartFragment}
`;

const REMOVE_COUPON_MUTATION = gql`
    mutation removeCouponFromCart($cartId: String!) {
        removeCouponFromCart(input: { cart_id: $cartId }) {
            cart {
                id
                ...MiniCartFragment
                # If this mutation causes "free" to become available we need to know.
                available_payment_methods {
                    code
                    title
                }
            }
        }
    }
    ${MiniCartFragment}
`;

export default {
    getAppliedCouponsQuery: GET_APPLIED_COUPONS,
    applyCouponMutation: APPLY_COUPON_MUTATION,
    removeCouponMutation: REMOVE_COUPON_MUTATION
};
