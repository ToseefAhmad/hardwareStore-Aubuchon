import { gql } from '@apollo/client';

import { OrderNavigationFragment } from '@app/components/OrderNavigation/orderNavigation.fragment.gql';
import { OrderProductsFragment } from '@app/components/OrderProducts/orderProducts.fragment.gql';

const GET_ORDER_INFO = gql`
    query GetOrderInfo($orderNumber: String!) {
        customer {
            orders(filter: { number: { eq: $orderNumber } }) {
                items {
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
                    ...OrderNavigationFragment
                    ...OrderProductsFragment
                }
            }
        }
    }
    ${OrderNavigationFragment}
    ${OrderProductsFragment}
`;

const IS_ORDER_AVAILABLE_FOR_PICKUP = gql`
    query IsOrderAvailableForPickup($id: String!) {
        isOrderAvailableForPickup(id: $id) {
            is_available
        }
    }
`;

const ADD_ORDER_INSTRUCTION = gql`
    mutation AddOrderInstruction($id: String!, $message: String) {
        addOrderInstruction(input: { id: $id, instruction: $message }) {
            status
        }
    }
`;

export default {
    queries: {
        getOrderInfoQuery: GET_ORDER_INFO,
        isOrderAvailableForPickupQuery: IS_ORDER_AVAILABLE_FOR_PICKUP
    },
    mutations: {
        addOrderInstructionMutation: ADD_ORDER_INSTRUCTION
    }
};
