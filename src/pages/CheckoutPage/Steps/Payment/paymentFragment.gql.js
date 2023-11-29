import { gql } from '@apollo/client';

import { SavedPaymentsFragment } from '@magento/peregrine/lib/talons/SavedPaymentsPage/savedPaymentsPage.gql';

import {
    AddDataLayerInfoFragment,
    CheckoutOrderTotalFragment
} from '../../checkoutPageFragment.gql';

import { ProductListFragment } from '@app/components/MiniCart/ProductList/productListFragments.gql';

import { GuestCheckoutCustomerInfoFragment } from '../Info/infoFragment.gql';

const AvailablePaymentMethodsFragment = gql`
    fragment AvailablePaymentMethodsFragment on Cart {
        id
        available_payment_methods {
            code
            title
        }
    }
`;

export const SelectedPaymentMethodFragment = gql`
    fragment SelectedPaymentMethodFragment on Cart {
        id
        selected_payment_method {
            code
            title
        }
    }
`;

const AvailableCustomerAddressesFragment = gql`
    fragment AvailableCustomerAddressesFragment on Customer {
        uid
        firstname
        lastname
        telephone
        default_billing
        addresses {
            id
            firstname
            lastname
            company
            street
            city
            country_code
            region {
                region
                region_id
                region_code
            }
            postcode
            telephone
        }
    }
`;

const AvailableCountriesFragment = gql`
    fragment AvailableCountriesFragment on Country {
        id
        full_name_locale
        available_regions {
            id
            name
        }
    }
`;

export const CheckoutRewardFragment = gql`
    fragment CheckoutRewardFragment on Cart {
        available_rewards {
            id
            amount
            expires
        }
        applied_rewards {
            id
            amount
        }
    }
`;

export const CheckoutAppliedRewardFragment = gql`
    fragment CheckoutAppliedRewardFragment on Cart {
        applied_rewards {
            id
            amount
        }
    }
`;

export const CheckoutPaymentStepFragment = gql`
    fragment CheckoutPaymentStepFragment on Cart {
        id
        ...AvailablePaymentMethodsFragment
        ...SelectedPaymentMethodFragment
        ...GuestCheckoutCustomerInfoFragment
        ...CheckoutOrderTotalFragment
        ...AddDataLayerInfoFragment
        ...ProductListFragment
        ...CheckoutRewardFragment @skip(if: $skipRewards)
    }
    ${AvailablePaymentMethodsFragment}
    ${SelectedPaymentMethodFragment}
    ${GuestCheckoutCustomerInfoFragment}
    ${CheckoutOrderTotalFragment}
    ${AddDataLayerInfoFragment}
    ${ProductListFragment}
    ${CheckoutRewardFragment}
`;

export const CheckoutPaymentStepRefreshFragment = gql`
    fragment CheckoutPaymentStepRefreshFragment on Cart {
        id
        ...AvailablePaymentMethodsFragment
        ...SelectedPaymentMethodFragment
        ...CheckoutOrderTotalFragment
        ...AddDataLayerInfoFragment
        ...ProductListFragment
        ...CheckoutAppliedRewardFragment
    }
    ${AvailablePaymentMethodsFragment}
    ${SelectedPaymentMethodFragment}
    ${CheckoutOrderTotalFragment}
    ${AddDataLayerInfoFragment}
    ${ProductListFragment}
    ${CheckoutAppliedRewardFragment}
`;

export const CheckoutPaymentStepAdditionalFragment = gql`
    fragment CheckoutPaymentStepAdditionalFragment on Query {
        customerPaymentTokens @include(if: $isSignedIn) {
            ...SavedPaymentsFragment
        }
        customer @include(if: $isSignedIn) {
            ...AvailableCustomerAddressesFragment
        }
        countries {
            ...AvailableCountriesFragment
        }
    }
    ${SavedPaymentsFragment}
    ${AvailableCustomerAddressesFragment}
    ${AvailableCountriesFragment}
`;
