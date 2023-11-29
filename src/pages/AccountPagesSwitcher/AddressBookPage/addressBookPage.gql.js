import { gql } from '@apollo/client';

const GET_CUSTOMER_ADDRESSES = gql`
    query GetCustomerAddressesForAddressBook {
        customer {
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
    }
`;

const DELETE_CUSTOMER_ADDRESS = gql`
    mutation DeleteCustomerAddressFromAddressBook($addressId: Int!) {
        deleteCustomerAddress(id: $addressId)
    }
`;

export default {
    queries: {
        getCustomerAddressesQuery: GET_CUSTOMER_ADDRESSES
    },
    mutations: {
        deleteCustomerAddressMutation: DELETE_CUSTOMER_ADDRESS
    }
};
