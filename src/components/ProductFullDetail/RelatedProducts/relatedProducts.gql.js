import { gql } from '@apollo/client';

import { ProductCardFragment } from '@app/components/ProductCard';

export const GET_PRODUCT_DETAIL_QUERY = gql`
    query getRelatedProducts($urlKey: String!) {
        products(filter: { url_key: { eq: $urlKey } }) {
            items {
                uid
                related_products {
                    ...ProductCardFragment
                    # For unknown reason, below fields return null with the product card fragment in this query
                    name
                    url_key
                    small_image {
                        url
                    }
                }
            }
        }
    }
    ${ProductCardFragment}
`;

export default {
    queries: {
        getRelatedProducts: GET_PRODUCT_DETAIL_QUERY
    }
};
