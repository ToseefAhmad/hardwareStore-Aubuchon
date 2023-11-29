import { gql } from '@apollo/client';

const LOYALTY_API_CUSTOMER_DETAILS = gql`
    query LoyaltyApiCustomerDetails($id: String!) {
        loyaltyApiCustomerDetails(id: $id) {
            customerData {
                id
                firstname
            }
        }
    }
`;

const LOYALTY_API_CUSTOMER_NAME = gql`
    query LoyaltyApiCustomerName($id: String!) {
        loyaltyApiCustomerName(id: $id) {
            firstname
        }
    }
`;

export default {
    queries: {
        loyaltyApiCustomerDetails: LOYALTY_API_CUSTOMER_DETAILS,
        loyaltyApiCustomerName: LOYALTY_API_CUSTOMER_NAME
    }
};
