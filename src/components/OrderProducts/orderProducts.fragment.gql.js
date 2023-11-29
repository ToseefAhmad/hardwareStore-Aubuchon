import { gql } from '@apollo/client';

export const OrderProductsFragment = gql`
    fragment OrderProductsFragment on CustomerOrder {
        items {
            id
            item_status
            product_name
            product_sku
            product_url_key
            quantity_ordered
            product_options {
                label
                value
            }
            selected_options {
                label
                value
            }
            product_thumbnail {
                url
            }
            tax_amount {
                value
                currency
            }
            price_incl_tax {
                value
                currency
            }
            row_total_incl_tax {
                value
                currency
            }
            original_price {
                value
                currency
            }
            product_sale_price {
                value
                currency
            }
            discounts {
                amount {
                    currency
                    value
                }
            }
        }
    }
`;
export const GuestOrderProductsFragment = gql`
    fragment GuestOrderProductsFragment on GuestOrder {
        items {
            id
            item_status
            product_name
            product_sku
            product_url_key
            quantity_ordered
            product_thumbnail {
                url
            }
            tax_amount {
                value
                currency
            }
            price_incl_tax {
                value
                currency
            }
            row_total_incl_tax {
                value
                currency
            }
            original_price {
                value
                currency
            }
            product_sale_price {
                value
                currency
            }
            discounts {
                amount {
                    currency
                    value
                }
            }
        }
    }
`;
