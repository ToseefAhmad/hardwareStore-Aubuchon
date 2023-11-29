import { gql } from '@apollo/client';

import { MiniCartFragment } from '@app/components/MiniCart/miniCartFragment.gql';

export const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductToCart($cartId: String!, $product: CartItemInput!) {
        addProductsToCart(cartId: $cartId, cartItems: [$product]) {
            cart {
                id
                ...MiniCartFragment
            }
        }
    }
    ${MiniCartFragment}
`;

export default {
    addProductToCartMutation: ADD_PRODUCT_TO_CART
};
