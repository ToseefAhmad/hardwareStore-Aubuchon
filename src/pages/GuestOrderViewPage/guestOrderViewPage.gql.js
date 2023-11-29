import { gql } from '@apollo/client';

import { GuestOrderNavigationFragment } from '@app/components/OrderNavigation/orderNavigation.fragment.gql';
import { GuestOrderProductsFragment } from '@app/components/OrderProducts/orderProducts.fragment.gql';

const GET_GUEST_ORDER_INFO = gql`
    query getGuestOrderInfo($shortUrl: String!, $orderNumber: String!) {
        guestOrder(shortUrl: $shortUrl, orderNumber: $orderNumber) {
            ...GuestOrderNavigationFragment
            ...GuestOrderProductsFragment
            status
            status_code
            pickup_type
            curbside_delivered_at
            billing_address {
                firstname
                lastname
            }
            pickup_person {
                firstname
                lastname
            }
            pickup_store {
                city
                region_code
            }
            payment_methods {
                type
                name
                additional_data {
                    name
                    value
                }
            }
            total {
                discounts {
                    amount {
                        currency
                        value
                    }
                }
                subtotal {
                    currency
                    value
                }
                total_tax {
                    currency
                    value
                }
                reward_amount {
                    currency
                    value
                }
            }
        }
    }
    ${GuestOrderNavigationFragment}
    ${GuestOrderProductsFragment}
`;

export default {
    getGuestOrderQuery: GET_GUEST_ORDER_INFO
};
