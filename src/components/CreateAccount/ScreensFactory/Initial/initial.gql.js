import { gql } from '@apollo/client';

const LOYALTY_API_CUSTOMER_LOOKUP = gql`
    query LoyaltyApiCustomerLookup($email: String, $phone: String) {
        loyaltyApiCustomerLookup(email: $email, phone: $phone) {
            id
            name
            location
        }
    }
`;

const IS_EMAIL_AVAILABLE = gql`
    query IsEmailAvailable($email: String!) {
        isEmailAvailable(email: $email) {
            is_email_available
        }
    }
`;

export default {
    queries: {
        loyaltyApiCustomerLookup: LOYALTY_API_CUSTOMER_LOOKUP,
        isEmailAvailable: IS_EMAIL_AVAILABLE
    }
};
