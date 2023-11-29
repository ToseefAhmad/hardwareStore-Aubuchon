import { gql } from '@apollo/client';

import { ProductCardFragment } from '@app/components/ProductCard';

export const GET_ITEMS_FOR_PLP = gql`
    query getItemsForPLP(
        $filters: ProductAttributeFilterInput
        $search: String
        $pageSize: Int!
        $currentPage: Int!
        $sort: ProductAttributeSortInput
    ) {
        products(
            filter: $filters
            search: $search
            pageSize: $pageSize
            currentPage: $currentPage
            sort: $sort
        ) {
            # Aggregations are needed so filtering would be applied on Magento's end
            aggregations {
                attribute_code
                count
            }
            items {
                ...ProductCardFragment
            }
            total_count
            page_info {
                total_pages
            }
        }
    }
    ${ProductCardFragment}
`;

export const GET_AGGREGATIONS_FOR_PLP = gql`
    query getAggregationsForPLP(
        $filters: [ProductAttributeFilterInput]
        $search: String
    ) {
        aggregationsList(filters: $filters, search: $search) {
            filters
            aggregations {
                label
                count
                attribute_code
                options {
                    label
                    value
                    count
                }
                position
            }
        }
    }
`;

export const GET_FILTER_INPUTS = gql`
    query getFilterInputs {
        __type(name: "ProductAttributeFilterInput") {
            inputFields {
                name
                type {
                    name
                }
            }
        }
    }
`;

export const GET_SORT_METHODS = gql`
    query getSortMethods($isSearch: Boolean!) {
        getSortFields(isSearch: $isSearch) {
            options {
                label
                value
            }
        }
    }
`;

export default {
    getProductsQuery: GET_ITEMS_FOR_PLP,
    getFilterInputsQuery: GET_FILTER_INPUTS,
    getAggregationsQuery: GET_AGGREGATIONS_FOR_PLP,
    getSortMethodsQuery: GET_SORT_METHODS
};
