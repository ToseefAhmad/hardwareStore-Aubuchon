import { gql } from '@apollo/client';

export const ProductCardFragment = gql`
    fragment ProductCardFragment on ProductInterface {
        __typename
        id
        uid
        sku
        url_key
        name
        brand
        stock_status
        review_rating
        type_id
        simple_categories {
            uid
            name
            level
            url_path
            url_suffix
        }
        price_range {
            maximum_price {
                regular_price {
                    currency
                    value
                }
                final_price {
                    currency
                    value
                }
                discount {
                    amount_off
                }
            }
        }
        small_image {
            url
        }
        pickup_store_inventory {
            qty
            bopis_available
            location
            store_name
            boss_available
            boss_eligible
            boss_qty
            show_check_nearby
        }
        ... on ConfigurableProduct {
            uid
            paint_size_unit
            price_range {
                maximum_price {
                    final_price {
                        currency
                        value
                    }
                }
                minimum_price {
                    final_price {
                        currency
                        value
                    }
                }
            }
        }
    }
`;
