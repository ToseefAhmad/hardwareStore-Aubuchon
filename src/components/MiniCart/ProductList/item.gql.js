import { gql } from '@apollo/client';

import { MiniCartFragment } from '@app/components/MiniCart/miniCartFragment.gql';

export const REMOVE_ITEM_MUTATION = gql`
    mutation RemoveItemForMiniCart($cartId: String!, $itemId: ID!) {
        removeItemFromCart(
            input: { cart_id: $cartId, cart_item_uid: $itemId }
        ) {
            cart {
                id
                ...MiniCartFragment
            }
        }
    }
    ${MiniCartFragment}
`;

export const UPDATE_QUANTITY_MUTATION = gql`
    mutation updateItemQuantity(
        $cartId: String!
        $itemId: ID!
        $quantity: Float!
    ) {
        updateCartItems(
            input: {
                cart_id: $cartId
                cart_items: [{ cart_item_uid: $itemId, quantity: $quantity }]
            }
        ) {
            cart {
                id
                ...MiniCartFragment
            }
        }
    }
    ${MiniCartFragment}
`;

export const GET_PRODUCT_PAINT_COLORS_QUERY = gql`
    query getPaintColors {
        paintColors {
            uid
            label
            hex
            linked_value
        }
    }
`;

export default {
    removeItemMutation: REMOVE_ITEM_MUTATION,
    updateItemQuantityMutation: UPDATE_QUANTITY_MUTATION,
    getProductPaintColorsQuery: GET_PRODUCT_PAINT_COLORS_QUERY
};
