import { gql } from '@apollo/client';

export const GET_PRODUCT_IMAGE = gql`
    query getProductImage($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                uid
                name
                small_image {
                    label
                    url
                }
            }
        }
    }
`;

export default {
    queries: {
        getProductImageQuery: GET_PRODUCT_IMAGE
    }
};
