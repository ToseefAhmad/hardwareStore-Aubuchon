import { gql } from '@apollo/client';

import { AppliedCouponsFragment } from './couponCodeFragments.gql';
import { ProductListFragment } from './ProductList/productListFragments.gql';

export const MiniCartFragment = gql`
    fragment MiniCartFragment on Cart {
        id
        ...AppliedCouponsFragment
        total_quantity
        prices {
            subtotal_excluding_tax {
                currency
                value
            }
            grand_total {
                currency
                value
            }
            subtotal_with_discount_excluding_tax {
                currency
                value
            }
            discounts {
                amount {
                    currency
                    value
                }
                label
                is_promo_code
            }
        }
        meta_event_id
        ...ProductListFragment
    }
    ${ProductListFragment}
    ${AppliedCouponsFragment}
`;
