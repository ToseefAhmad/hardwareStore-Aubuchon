import { gql } from '@apollo/client';

// @todo add addresses field filter when functionality will implement on backend
const GET_ADD_EDIT_ADDRESS_PAGE_DATA = gql`
    query GetAddEditAddressPageData($withAddresses: Boolean!) {
        customer @include(if: $withAddresses) {
            addresses {
                id
                firstname
                lastname
                company
                street
                city
                postcode
                country_code
                default_billing
                default_shipping
                region {
                    region_id
                }
                telephone
            }
        }

        countries {
            id
            full_name_locale
            available_regions {
                id
                name
            }
        }
    }
`;

const ADD_NEW_CUSTOMER_ADDRESS = gql`
    mutation AddNewCustomerAddressToAddressBook(
        $address: CustomerAddressInput!
    ) {
        createCustomerAddress(input: $address) {
            id
        }
    }
`;

const UPDATE_CUSTOMER_ADDRESS = gql`
    mutation UpdateCustomerAddressInAddressBook(
        $addressId: Int!
        $updated_address: CustomerAddressInput!
    ) {
        updateCustomerAddress(id: $addressId, input: $updated_address) {
            id
        }
    }
`;

export default {
    queries: {
        getAddEditAddressPageDataQuery: GET_ADD_EDIT_ADDRESS_PAGE_DATA
    },
    mutations: {
        addNewCustomerAddressMutation: ADD_NEW_CUSTOMER_ADDRESS,
        updateCustomerAddressMutation: UPDATE_CUSTOMER_ADDRESS
    }
};
