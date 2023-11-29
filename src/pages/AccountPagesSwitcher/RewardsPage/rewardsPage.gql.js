import { gql } from '@apollo/client';

const GET_REWARDS_PAGE_INFO = gql`
    query GetRewardsPageInfo {
        rewards {
            point_total
            items {
                id
                amount
                expires
            }
        }
    }
`;

export default {
    queries: {
        getRewardsPageInfoQuery: GET_REWARDS_PAGE_INFO
    }
};
