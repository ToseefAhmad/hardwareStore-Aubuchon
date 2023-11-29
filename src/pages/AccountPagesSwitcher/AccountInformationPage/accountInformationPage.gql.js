import { gql } from '@apollo/client';

const AccountInformationPageFragment = gql`
    fragment AccountInformationPageFragment on Customer {
        firstname
        lastname
        telephone
        email
        date_of_birth
    }
`;

const GET_CUSTOMER_INFORMATION = gql`
    query GetCustomerInformation {
        customer {
            ...AccountInformationPageFragment
        }
    }
    ${AccountInformationPageFragment}
`;

const UPDATE_CUSTOMER_INFORMATION = gql`
    mutation UpdateCustomerInformation($customerInput: CustomerUpdateInput!) {
        updateCustomerV2(input: $customerInput) {
            customer {
                ...AccountInformationPageFragment
            }
        }
    }
    ${AccountInformationPageFragment}
`;

const UPDATE_CUSTOMER_EMAIL = gql`
    mutation UpdateCustomerEmailMutation($email: String!, $password: String!) {
        updateCustomerEmail(email: $email, password: $password) {
            customer {
                email
            }
        }
    }
`;

const CHANGE_CUSTOMER_PASSWORD = gql`
    mutation ChangeCustomerPasswordMutation(
        $currentPassword: String!
        $newPassword: String!
    ) {
        changeCustomerPassword(
            currentPassword: $currentPassword
            newPassword: $newPassword
        ) {
            email
        }
    }
`;

export default {
    mutations: {
        updateCustomerInformationMutation: UPDATE_CUSTOMER_INFORMATION,
        updateCustomerEmailMutation: UPDATE_CUSTOMER_EMAIL,
        changeCustomerPasswordMutation: CHANGE_CUSTOMER_PASSWORD
    },
    queries: {
        getCustomerInformationQuery: GET_CUSTOMER_INFORMATION
    }
};
