import { gql } from '@apollo/client';

import { AddDataLayerInfoFragment } from '../../checkoutPageFragment.gql';

export const OrderDetailsFragment = gql`
    fragment OrderDetailsFragment on Cart {
        id
        email
        estimate_delivery
        applied_coupons {
            code
        }
        billing_address {
            telephone
            firstname
            lastname
            street
            city
            postcode
            region {
                region_id
            }
            country {
                label
            }
        }
        shipping_addresses {
            selected_shipping_method {
                amount {
                    value
                }
            }
            street
        }
        prices {
            grand_total {
                value
                currency
            }
            applied_taxes {
                amount {
                    value
                }
            }
        }
        ...AddDataLayerInfoFragment
    }
    ${AddDataLayerInfoFragment}
`;
