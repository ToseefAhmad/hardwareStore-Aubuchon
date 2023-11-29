import { gql } from '@apollo/client';

const GET_ORDERS_LIST = gql`
    query GetOrdersList($currentPage: Int!, $pageSize: Int!) {
        customer {
            orders(currentPage: $currentPage, pageSize: $pageSize) {
                items {
                    id
                    status
                    number
                    order_date
                    total {
                        grand_total {
                            value
                        }
                    }
                    shipping_address {
                        lastname
                    }
                    pickup_store {
                        brand {
                            uid
                        }
                    }
                }
                page_info {
                    total_pages
                }
            }
        }
    }
`;

export default {
    queries: {
        getOrdersListQuery: GET_ORDERS_LIST
    }
};
