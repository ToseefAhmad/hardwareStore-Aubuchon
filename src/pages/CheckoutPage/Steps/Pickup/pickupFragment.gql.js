import { gql } from '@apollo/client';

import {
    AddDataLayerInfoFragment,
    CheckoutOrderTotalFragment
} from '../../checkoutPageFragment.gql';

import { GuestCheckoutCustomerInfoFragment } from '@app/pages/CheckoutPage/Steps/Info/infoFragment.gql';

const AvailableShippingMethodsCheckoutFragment = gql`
    fragment AvailableShippingMethodsCheckoutFragment on Cart {
        id
        shipping_addresses {
            available_shipping_methods {
                amount {
                    currency
                    value
                }
                available
                carrier_code
                carrier_title
                method_code
                method_title
            }
            street
        }
    }
`;

export const SelectedShippingMethodCheckoutFragment = gql`
    fragment SelectedShippingMethodCheckoutFragment on Cart {
        id
        shipping_addresses {
            selected_shipping_method {
                carrier_code
                method_code
            }
            street
        }
    }
`;

export const PickupPersonFragment = gql`
    fragment PickupPersonFragment on Cart {
        id
        pickup_person {
            email
            firstname
            lastname
            phoneNumber
            hideFields
        }
    }
`;

export const CheckoutPickupStepFragment = gql`
    fragment CheckoutPickupStepFragment on Cart {
        id
        ...AvailableShippingMethodsCheckoutFragment
        ...SelectedShippingMethodCheckoutFragment
        ...CheckoutOrderTotalFragment
        ...AddDataLayerInfoFragment
        ...PickupPersonFragment
        ...GuestCheckoutCustomerInfoFragment
    }
    ${AvailableShippingMethodsCheckoutFragment}
    ${SelectedShippingMethodCheckoutFragment}
    ${CheckoutOrderTotalFragment}
    ${AddDataLayerInfoFragment}
    ${PickupPersonFragment}
    ${GuestCheckoutCustomerInfoFragment}
`;
