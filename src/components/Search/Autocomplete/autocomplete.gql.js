import { gql } from '@apollo/client';

import { ProductCardFragment } from '@app/components/ProductCard';

export const GET_PRODUCTS_BY_URL_KEY = gql`
    query getProductsByUrlKey($url_keys: [String]) {
        products(filter: { url_key: { in: $url_keys } }) {
            items {
                ...ProductCardFragment
            }
        }
    }
    ${ProductCardFragment}
`;

export default {
    getProductsByUrlKeyQuery: GET_PRODUCTS_BY_URL_KEY
};
