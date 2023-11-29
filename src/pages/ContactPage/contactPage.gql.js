import { gql } from '@apollo/client';

import { StoreMapFragment } from '@app/components/StoreMap';

const GET_STORE_LIST = gql`
    query GetStoreList {
        pickupStoreList {
            id
            ...StoreMapFragment
        }
    }
    ${StoreMapFragment}
`;

export default {
    queries: {
        getStoreListQuery: GET_STORE_LIST
    }
};
