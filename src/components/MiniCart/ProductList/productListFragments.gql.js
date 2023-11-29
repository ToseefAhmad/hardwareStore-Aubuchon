import { gql } from '@apollo/client';

import { ProductCardFragment } from '@app/components/ProductCard';

export const ProductListFragment = gql`
    fragment ProductListFragment on Cart {
        id
        items {
            uid
            product {
                uid
                ...ProductCardFragment
                thumbnail {
                    url
                }
                ... on ConfigurableProduct {
                    configurable_options {
                        attribute_code
                        uid
                        label
                        values {
                            uid
                            value_index
                        }
                    }
                    variants {
                        attributes {
                            uid
                            value_index
                            label
                        }
                        product {
                            uid
                            thumbnail {
                                url
                            }
                            paint_color_multi
                            pickup_store_inventory {
                                qty
                            }
                            price_range {
                                maximum_price {
                                    regular_price {
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
            prices {
                price {
                    currency
                    value
                }
                total_item_discount {
                    currency
                    value
                }
            }
            quantity
            is_paint_fee
            linked_parent
            ... on ConfigurableCartItem {
                configurable_options {
                    configurable_product_option_uid
                    option_label
                    configurable_product_option_value_uid
                    value_label
                }
                customizable_options {
                    customizable_option_uid
                    label
                    values {
                        customizable_option_value_uid
                        value
                    }
                }
            }
        }
    }
    ${ProductCardFragment}
`;
