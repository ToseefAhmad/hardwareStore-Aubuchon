import { gql } from '@apollo/client';

import { StoreMapFragment } from '@app/components/StoreMap';

import { StoreViewPageFragment } from './storeViewPageFragment.gql';

const GET_STORE_BY_URL_KEY = gql`
    query GetStoreByUrlKey($urlKey: String!) {
        pickupStore(pickupStoreUrlKey: $urlKey) {
            id
            ...StoreViewPageFragment
            ...StoreMapFragment
        }
    }
    ${StoreViewPageFragment}
    ${StoreMapFragment}
`;

export default {
    queries: {
        getStoreByUrlKeyQuery: GET_STORE_BY_URL_KEY
    }
};
