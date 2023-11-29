import { gql } from '@apollo/client';

import { OrderNavigationFragment } from '@app/components/OrderNavigation/orderNavigation.fragment.gql';
import { OrderProductsFragment } from '@app/components/OrderProducts/orderProducts.fragment.gql';

const GET_ORDER_INFO = gql`
    query GetOrderInfo($orderNumber: String!) {
        customer {
            orders(filter: { number: { eq: $orderNumber } }) {
                items {
                    ...OrderNavigationFragment
                    ...OrderProductsFragment
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
        }
    }
    ${OrderNavigationFragment}
    ${OrderProductsFragment}
`;

export default {
    queries: {
        getOrderInfoQuery: GET_ORDER_INFO
    }
};
