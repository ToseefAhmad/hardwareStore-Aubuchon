import { gql } from '@apollo/client';

import { StoreMapFragment } from '@app/components/StoreMap';
import { StoreListFragment } from '@app/components/StoresList';

const GET_STORE_LIST = gql`
    query GetStoreList {
        pickupStoreList {
            id
            ...StoreMapFragment
            ...StoreListFragment
        }
    }
    ${StoreMapFragment}
    ${StoreListFragment}
`;

export default {
    queries: {
        getStoreListQuery: GET_STORE_LIST
    }
};
