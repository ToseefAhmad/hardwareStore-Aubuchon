import { gql } from '@apollo/client';

const LOYALTY_API_CUSTOMER_DETAILS = gql`
    query LoyaltyApiCustomerDetails($id: String!) {
        loyaltyApiCustomerDetails(id: $id) {
            customerData {
                id
                firstname
                lastname
                emailaddr
                phonenumber
                addr1
                addr2
                region_id
                city
                zip
                loyalty_id
            }
            error
            linkedEmail
        }
    }
`;

export default {
    queries: {
        loyaltyApiCustomerDetails: LOYALTY_API_CUSTOMER_DETAILS
    }
};
