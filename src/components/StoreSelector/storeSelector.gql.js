import { gql } from '@apollo/client';

import { StoreListFragment } from '@app/components/StoresList';

const GET_STORE_LIST = gql`
    query GetStoreList {
        pickupStoreList {
            id
            ...StoreListFragment
        }
    }
    ${StoreListFragment}
`;

export default {
    queries: {
        getStoreListQuery: GET_STORE_LIST
    }
};
