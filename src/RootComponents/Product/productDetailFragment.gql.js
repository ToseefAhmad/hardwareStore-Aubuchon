import { gql } from '@apollo/client';

/**
 * Fields provided in this fragment are used also in UPWARD connector.
 * If you edit this, make sure upward.yml is updated.
 *
 * @type {DocumentNode}
 */
export const ProductInitialDetailsFragment = gql`
    fragment ProductInitialDetailsFragment on ProductInterface {
        uid
        id
        __typename
        sku
        url_key
        name
        brand
        review_rating
        review_count
        description {
            html
        }
        media_gallery {
            url
            label
            position
            disabled
        }
        meta_title
        meta_description
        meta_keyword
        manufacturer_part_number
        upc
    }
`;

export const ProductDetailsFragment = gql`
    fragment ProductDetailsFragment on ProductInterface {
        uid
        ...ProductInitialDetailsFragment
        categories {
            uid
            id
            name
            breadcrumbs {
                category_uid
            }
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
        specification_attributes {
            code
            label
            value
        }
        stock_status
        pickup_store_inventory {
            qty
            bopis_available
            boss_available
            boss_eligible
            boss_qty
            location
            store_name
            show_check_nearby
        }
        custom_attributes {
            selected_attribute_options {
                attribute_option {
                    uid
                    label
                    is_default
                }
            }
            entered_attribute_value {
                value
            }
            attribute_metadata {
                uid
                code
                label
                attribute_labels {
                    store_code
                    label
                }
                data_type
                is_system
                entity_type
                ui_input {
                    ui_input_type
                    is_html_allowed
                }
                ... on ProductAttributeMetadata {
                    used_in_components
                }
            }
        }
        related_products {
            uid
        }
        ... on ConfigurableProduct {
            configurable_options {
                attribute_code
                attribute_id
                uid
                label
                values {
                    uid
                    default_label
                    label
                    store_label
                    use_default_value
                    value_index
                    swatch_data {
                        ... on ImageSwatchData {
                            thumbnail
                        }
                        value
                    }
                }
            }
            options {
                uid
                title
            }
            variants {
                attributes {
                    code
                    value_index
                }
                product {
                    uid
                    id
                    url_key
                    paint_color_multi
                    media_gallery {
                        url
                        label
                        position
                        disabled
                    }
                    name
                    sku
                    stock_status
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
                                percent_off
                            }
                        }
                    }
                    pickup_store_inventory {
                        qty
                        bopis_available
                        boss_available
                        boss_eligible
                        boss_qty
                        location
                        store_name
                    }
                    options {
                        uid
                        title
                    }
                }
            }
        }
    }
    ${ProductInitialDetailsFragment}
`;
