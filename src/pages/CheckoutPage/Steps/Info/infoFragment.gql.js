import { gql } from '@apollo/client';

import {
    AddDataLayerInfoFragment,
    CheckoutOrderTotalFragment
} from '../../checkoutPageFragment.gql';

const GuestCheckoutCustomerEmailFragment = gql`
    fragment GuestCheckoutCustomerEmailFragment on Cart {
        id
        email
    }
`;

export const GuestCheckoutCustomerInfoFragment = gql`
    fragment GuestCheckoutCustomerInfoFragment on Cart {
        id
        guestCheckoutCustomerInfo @client
    }
`;

export const CheckoutInfoStepFragment = gql`
    fragment CheckoutInfoStepFragment on Cart {
        id
        ...GuestCheckoutCustomerEmailFragment
        ...GuestCheckoutCustomerInfoFragment
        ...CheckoutOrderTotalFragment
        ...AddDataLayerInfoFragment
    }
    ${GuestCheckoutCustomerEmailFragment}
    ${GuestCheckoutCustomerInfoFragment}
    ${CheckoutOrderTotalFragment}
    ${AddDataLayerInfoFragment}
`;
