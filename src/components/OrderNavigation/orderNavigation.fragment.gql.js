import { gql } from '@apollo/client';

export const OrderNavigationFragment = gql`
    fragment OrderNavigationFragment on CustomerOrder {
        id
        order_date
        number
        total {
            grand_total {
                currency
                value
            }
        }
        pickup_type
        curbside_delivered_at
        curbside_customer_arrived_at
        pickup_store {
            id
        }
        items {
            item_status
            delivery_date
            qty_picked
        }
        pickup_person {
            firstname
            lastname
        }
    }
`;

export const GuestOrderNavigationFragment = gql`
    fragment GuestOrderNavigationFragment on GuestOrder {
        id
        order_date
        number
        total {
            grand_total {
                currency
                value
            }
        }
        pickup_type
        curbside_delivered_at
        curbside_customer_arrived_at
        pickup_store {
            id
        }
        items {
            item_status
            delivery_date
            qty_picked
        }
        pickup_person {
            firstname
            lastname
        }
    }
`;
