import { gql } from '@apollo/client';

import { GuestOrderNavigationFragment } from '@app/components/OrderNavigation/orderNavigation.fragment.gql';
import { GuestOrderProductsFragment } from '@app/components/OrderProducts/orderProducts.fragment.gql';

const GET_GUEST_ORDER_INFO = gql`
    query getGuestOrderPickupInfo($shortUrl: String!, $orderNumber: String!) {
        guestOrder(shortUrl: $shortUrl, orderNumber: $orderNumber) {
            ...GuestOrderNavigationFragment
            ...GuestOrderProductsFragment
            status_code
            pickup_store {
                id
                brand {
                    uid
                }
                schedule {
                    uid
                    day
                    open
                    close
                    status
                }
                specialDays {
                    id
                    name
                    date_from
                    date_to
                    time_open
                    time_close
                    comment
                }
                latitude
                longitude
                images
                address
                city
                phone
                email
                region_code
                allow_curbside
            }
        }
    }
    ${GuestOrderNavigationFragment}
    ${GuestOrderProductsFragment}
`;

const IS_ORDER_AVAILABLE_FOR_PICKUP = gql`
    query isOrderAvailableForPickup($shortUrl: String!, $orderNumber: String!) {
        isOrderAvailableForPickup(
            shortUrl: $shortUrl
            orderNumber: $orderNumber
        ) {
            is_available
        }
    }
`;

const ADD_ORDER_INSTRUCTION = gql`
    mutation addOrderInstruction(
        $shortUrl: String!
        $orderNumber: String!
        $message: String
    ) {
        addOrderInstruction(
            input: {
                shortUrl: $shortUrl
                orderNumber: $orderNumber
                instruction: $message
            }
        ) {
            status
        }
    }
`;

export default {
    queries: {
        getGuestOrderQuery: GET_GUEST_ORDER_INFO,
        isOrderAvailableForPickupQuery: IS_ORDER_AVAILABLE_FOR_PICKUP
    },
    mutations: {
        addOrderInstructionMutation: ADD_ORDER_INSTRUCTION
    }
};
