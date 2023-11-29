import { gql } from '@apollo/client';

import { CartPageFragment } from '@magento/peregrine/lib/talons/CartPage/cartPageFragments.gql.js';
import { CheckoutPageFragment } from '@magento/peregrine/lib/talons/CheckoutPage/checkoutPageFragments.gql';

import { CustomerDetailsFragment } from './customerFragment';

const GET_COUNTRIES_LIST = gql`
    query GetCountriesList {
        countries {
            id
            available_regions {
                id
                name
            }
        }
    }
`;

const GET_CUSTOMER = gql`
    query GetCustomerAfterSignIn {
        customer {
            ...CustomerDetailsFragment
        }
    }
    ${CustomerDetailsFragment}
`;

export const GET_CART_DETAILS = gql`
    query GetCartDetailsAfterSignIn($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            items {
                uid
                product {
                    uid
                    name
                    sku
                    small_image {
                        url
                        label
                    }
                    price {
                        regularPrice {
                            amount {
                                value
                            }
                        }
                    }
                }
                quantity
                ... on ConfigurableCartItem {
                    configurable_options {
                        configurable_product_option_uid
                        option_label
                        configurable_product_option_value_uid
                        value_label
                    }
                }
            }
            prices {
                grand_total {
                    value
                    currency
                }
            }
            ...CartPageFragment
        }
    }
    ${CartPageFragment}
`;

const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
            token
        }
    }
`;

const SIGN_UP = gql`
    mutation SignUp($customerInput: CustomerCreateInput!) {
        createCustomerV2(input: $customerInput) {
            customer {
                created_at
            }
        }
    }
`;

const CREATE_CUSTOMER_ADDRESS = gql`
    mutation AddNewCustomerAddressToAddressBook(
        $address: CustomerAddressInput!
    ) {
        createCustomerAddress(input: $address) {
            id
        }
    }
`;

export const CREATE_CART = gql`
    mutation CreateCartAfterSignIn {
        cartId: createEmptyCart
    }
`;

const MERGE_CARTS = gql`
    mutation MergeCartsAfterSignIn(
        $sourceCartId: String!
        $destinationCartId: String!
    ) {
        mergeCarts(
            source_cart_id: $sourceCartId
            destination_cart_id: $destinationCartId
        ) {
            id
            items {
                uid
            }
            ...CheckoutPageFragment
        }
    }
    ${CheckoutPageFragment}
`;

export default {
    queries: {
        getCustomerQuery: GET_CUSTOMER,
        getCartDetailsQuery: GET_CART_DETAILS,
        getCountriesListQuery: GET_COUNTRIES_LIST
    },
    mutations: {
        signInMutation: SIGN_IN,
        signUpMutation: SIGN_UP,
        createCustomerAddressMutation: CREATE_CUSTOMER_ADDRESS,
        createCartMutation: CREATE_CART,
        mergeCartsMutation: MERGE_CARTS
    }
};
