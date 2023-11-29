import { gql } from '@apollo/client';

import { TaxSummaryFragment } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/taxSummary.gql';

import { DiscountSummaryFragment } from '@app/talons/CartPage/PriceSummary/discountSummary.gql';

const RewardsFragment = gql`
    fragment RewardsFragment on Cart {
        id
        applied_store_credit {
            enabled
            current_balance {
                value
                currency
            }
            applied_balance {
                value
                currency
            }
        }
    }
`;

export const CheckoutOrderTotalFragment = gql`
    fragment CheckoutOrderTotalFragment on Cart {
        id
        total_quantity
        items {
            uid
            product {
                uid
                price_range {
                    maximum_price {
                        discount {
                            amount_off
                        }
                    }
                }
                stock_status
            }
            quantity
        }
        prices {
            grand_total {
                currency
                value
            }
            subtotal_excluding_tax {
                value
            }
            ...TaxSummaryFragment
            ...DiscountSummaryFragment
        }
        ...RewardsFragment
        sms
    }
    ${TaxSummaryFragment}
    ${DiscountSummaryFragment}
    ${RewardsFragment}
`;

export const AddDataLayerInfoFragment = gql`
    fragment AddDataLayerInfoFragment on Cart {
        items {
            uid
            product {
                uid
                id
                sku
                name
                categories {
                    uid
                    name
                }
                brand
                url_key
                small_image {
                    url
                }
            }
            prices {
                price {
                    value
                    currency
                }
            }
            quantity
            is_paint_fee
        }
        meta_event_id
    }
`;
