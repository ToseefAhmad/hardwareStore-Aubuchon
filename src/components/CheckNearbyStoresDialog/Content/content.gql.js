import { gql } from '@apollo/client';

const GET_CURRENT_PICKUP_STORE = gql`
    query GetStoresListByProduct($sku: String!) {
        pickupStoreProductList(sku: $sku) {
            store {
                id
                city
                region_code
                latitude
                longitude
                brand {
                    uid
                }
                schedule {
                    uid
                    open
                    close
                    status
                }
                specialDays {
                    id
                    date_from
                    date_to
                    time_open
                    time_close
                    comment
                }
                url_key
            }
            product {
                uid
                sku
                pickup_store_inventory {
                    qty
                    location
                    store_name
                    boss_available
                }
            }
        }
    }
`;

const GET_CART_QTY = gql`
    query MiniCartQuery($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
        }
    }
`;

export default {
    queries: {
        getStoresListByProductQuery: GET_CURRENT_PICKUP_STORE,
        getCartQtyQuery: GET_CART_QTY
    }
};
