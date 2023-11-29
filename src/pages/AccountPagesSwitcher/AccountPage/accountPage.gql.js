import { gql } from '@apollo/client';

const GET_ACCOUNT_PAGE_INFO = gql`
    query GetAccountPageInfo {
        customer {
            firstname
            lastname
            email
            default_billing
            default_shipping
            addresses {
                id
                firstname
                lastname
                street
                city
                country_code
                region {
                    region
                }
                postcode
                telephone
            }
        }

        rewardInformation {
            money
        }
        rewards {
            point_total
        }
    }
`;

export default {
    queries: {
        getAccountPageInfoQuery: GET_ACCOUNT_PAGE_INFO
    }
};
