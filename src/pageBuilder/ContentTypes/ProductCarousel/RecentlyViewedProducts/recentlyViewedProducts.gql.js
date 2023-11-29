import { gql } from '@apollo/client';

import { ProductCardFragment } from '@app/components/ProductCard';

export const GET_PRODUCTS_BY_SKU = gql`
    query getProductsBySku($sku: [String], $pageSize: Int!) {
        products(filter: { sku: { in: $sku } }, pageSize: $pageSize) {
            items {
                ...ProductCardFragment
            }
        }
    }
    ${ProductCardFragment}
`;
