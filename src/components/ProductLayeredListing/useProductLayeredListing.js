import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { usePagination } from '@magento/peregrine/lib/hooks/usePagination';
import { useScrollTopOnChange } from '@magento/peregrine/lib/hooks/useScrollTopOnChange';

import { useProductImpressions } from '@app/hooks/useProductImpressions';
import { useSort } from '@app/hooks/useSort';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

import operations from './productLayeredListing.gql';
import {
    useFilters,
    getFiltersFromSearch,
    getFilterInput
} from './ProductLayeredListingContext';

const DEFAULT_PAGE_SIZE = 6;

// Unresolved state. Need to wait for product query to load and see if there are 0 items in stock
const NO_STOCK_INITIAL = 0;
// Product query returned 0 items - wait for special order query to start
const NO_STOCK_PENDING = 1;
// Special order query started loading
const NO_STOCK_LOADING = 2;
// Initial product query returned items or special order query finished
const NO_STOCK_RESOLVED = 3;
// If we have data from Apollo cache, need to verify that it has items. If it has, we should not wait for product query.
const NO_STOCK_CACHE_PENDING = 4;

export const useProductLayeredListing = ({ queryVariable }) => {
    const location = useLocation();
    const history = useHistory();

    const {
        getProductsQuery,
        getFilterInputsQuery,
        getAggregationsQuery,
        getSortMethodsQuery
    } = operations;

    const {
        storeConfig: storeConfigData,
        loading: storeConfigLoading,
        error: storeConfigError
    } = useStoreConfig({
        fields: ['grid_per_page']
    });
    const isStoreConfigLoading =
        storeConfigError || storeConfigLoading || !storeConfigData;

    // Set up pagination state
    const pageSize = !isStoreConfigLoading && storeConfigData.grid_per_page;
    const [paginationValues, paginationApi] = usePagination();
    const { currentPage, totalPages } = paginationValues;
    const { setCurrentPage, setTotalPages } = paginationApi;
    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages
    };

    const sortProps = useSort({ sortFromSearch: !!queryVariable.search });
    const [currentSort] = sortProps;
    // Keep track of the sort criteria, so we can tell when they change.
    const previousSort = useRef(currentSort);
    const { data: sortMethodsData } = useQuery(getSortMethodsQuery, {
        variables: {
            isSearch: !!queryVariable.search
        }
    });
    const sortMethods = useMemo(
        () => sortMethodsData?.getSortFields.options || null,
        [sortMethodsData?.getSortFields.options]
    );

    // Set state to register at what point product loading is
    // Initial state is NO_STOCK_CACHE_PENDING because we utilize Apollo Cache
    // and product data might be available before GQL request
    const [noStockFlag, setNoStockFlag] = useState(NO_STOCK_CACHE_PENDING);
    const [
        productsQuery,
        {
            called: productsQueryCalled,
            loading: productsQueryLoading,
            error: productsQueryError,
            data: productsQueryData
        }
    ] = useLazyQuery(getProductsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        onCompleted: data => {
            setNoStockFlag(prevState => {
                // Need to wait for special order
                if (
                    prevState === NO_STOCK_INITIAL &&
                    (data.products?.total_count === undefined ||
                        data.products.total_count <= 0)
                ) {
                    return NO_STOCK_PENDING;
                }

                return NO_STOCK_RESOLVED;
            });
        }
    });

    // Get available filters by querying category/search term without stock filtering
    const [
        aggregationsQuery,
        {
            called: aggregationsQueryCalled,
            loading: aggregationsQueryLoading,
            error: aggregationsQueryError,
            data: aggregationsQueryData
        }
    ] = useLazyQuery(getAggregationsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    // Get "allowed" filters by intersection of schema and aggregations
    const {
        called: introspectionCalled,
        data: introspectionData,
        loading: introspectionLoading
    } = useQuery(getFilterInputsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const hasError = useMemo(() => {
        return (
            introspectionCalled &&
            (aggregationsQueryError || productsQueryError)
        );
    }, [aggregationsQueryError, introspectionCalled, productsQueryError]);

    // Create a type map we can reference later to ensure we pass valid args
    // to the graphql query.
    // For example: { category_id: 'FilterEqualTypeInput', price: 'FilterRangeTypeInput' }
    const filterTypeMap = useMemo(() => {
        const typeMap = new Map();
        if (introspectionData) {
            introspectionData.__type.inputFields.forEach(({ name, type }) => {
                typeMap.set(name, type.name);
            });
        }
        return typeMap;
    }, [introspectionData]);

    /**
     * Observe current filters, so they can be used to refetch data.
     * @todo Remove filters from search that are not available in aggregations
     */
    const currentFilters = useMemo(() => {
        // Wait until we have the type map to fetch product data.
        if (!filterTypeMap.size || !pageSize) {
            return null;
        }

        const filters = getFiltersFromSearch(location.search);

        // Construct the filter arg object.
        const newFilters = {};

        if (queryVariable.filter) {
            Object.keys(queryVariable.filter).forEach(key => {
                newFilters[key] = queryVariable.filter[key];
            });
        }

        filters.forEach((values, key) => {
            newFilters[key] = getFilterInput(values, filterTypeMap.get(key));
        });

        // Always include in stock item filter in product queries
        // Stock filter needs to be used with "in" operator only for ElasticSearch to work
        if (!newFilters['stock_info']) {
            newFilters['stock_info'] = { in: ['in-stock-items'] };
        } else if (
            newFilters['stock_info']['eq'] &&
            newFilters['stock_info']['eq'] !== 'in-stock-items'
        ) {
            newFilters['stock_info']['in'] = [
                'in-stock-items',
                newFilters['stock_info']['eq']
            ];
            delete newFilters['stock_info']['eq'];
        } else if (
            !newFilters['stock_info']['in']?.includes('in-stock-items')
        ) {
            newFilters['stock_info']['in']?.unshift('in-stock-items');
        }

        return newFilters;
    }, [filterTypeMap, location.search, pageSize, queryVariable]);

    const isFilterApplied = useMemo(() => {
        const filters = getFiltersFromSearch(location.search);
        return !!filters.size;
    }, [location.search]);

    // Run the product query immediately and whenever its variable values change.
    useEffect(() => {
        if (!currentFilters) {
            return;
        }

        productsQuery({
            variables: {
                ...queryVariable,
                currentPage: Number(currentPage),
                filters: currentFilters,
                pageSize: Number(pageSize),
                sort: { [currentSort.sortAttribute]: currentSort.sortDirection }
            }
        });
    }, [
        currentFilters,
        currentPage,
        currentSort.sortAttribute,
        currentSort.sortDirection,
        pageSize,
        productsQuery,
        queryVariable
    ]);

    // Run the aggregations query immediately and whenever its variable values change.
    useEffect(() => {
        if (!currentFilters) {
            return;
        }

        // Build query variable for aggregations list
        // Each filter group should fetch all of its available options within the context of other filters
        // E.g. Category and Brand filter is applied. Fetch all Category options with Brand filter applied,
        // and fetch all Brand options with Category filter applied.
        const aggregationFilters = Object.keys(currentFilters)
            .filter(
                filterKey =>
                    !queryVariable.filter ||
                    !Object.keys(queryVariable.filter).includes(filterKey)
            )
            .map(filterKey => {
                const aggregationFilter = { ...currentFilters };
                delete aggregationFilter[filterKey];
                return aggregationFilter;
            });
        aggregationFilters.push(currentFilters);

        aggregationsQuery({
            variables: {
                ...queryVariable,
                filters: aggregationFilters
            }
        });
    }, [aggregationsQuery, currentFilters, queryVariable]);

    // Use a separate state to hold product data to avoid empty data flashing while new data is loaded.
    const [productData, setProductData] = useState();
    useEffect(() => {
        if (hasError) {
            setProductData(undefined);
        } else if (productsQueryData && productsQueryData.products) {
            setProductData(productsQueryData.products);
        }
    }, [hasError, productsQueryData]);

    // Combine fetched aggregations lists
    // Query responds with each filter's available options, given other filter context
    // Example: Category and Brand filter is applied. Aggregations list will include:
    // 1. Aggregations for all applied filters.
    //    This aggregation data should be used for filters that don't have any options selected
    // 2. Aggregations for each filter group that had an option selected.
    //    These should be picked out and merged into the first one for all available options and their accurate qty
    const combinedAggregations = useMemo(() => {
        if (aggregationsQueryData && aggregationsQueryData.aggregationsList) {
            const aggregationsList = [
                ...aggregationsQueryData.aggregationsList
            ];
            // Find aggregations result for query with all filters applied. That will be basis (as seen in example 1.)
            const {
                aggregations: mainAggregations,
                filters: mainAggregationFilters
            } = aggregationsList
                .sort((a, b) => b.filters.length - a.filters.length)
                .find(() => true);
            const aggregations = [...mainAggregations];
            mainAggregationFilters.forEach(currentFilterKey => {
                // For each applied filter group look up their aggregations and place it inside the main aggregations object (example 2)
                const currentAggregationsResult = aggregationsList.find(
                    a => !a.filters.includes(currentFilterKey)
                );
                if (
                    currentAggregationsResult &&
                    currentAggregationsResult.aggregations &&
                    currentAggregationsResult.aggregations.length > 0
                ) {
                    const {
                        aggregations: currentAggregations
                    } = currentAggregationsResult;
                    const currentAggregationsIdx = currentAggregations.findIndex(
                        ({ attribute_code }) =>
                            currentFilterKey === attribute_code
                    );

                    if (currentAggregationsIdx < 0) {
                        // Did not find applied filter group in available filter group list - can't force, so we skip it
                        // This is an edge case - might need reindex.
                        return;
                    }

                    // If the applied filter group is not in the main aggregations list, it means that combination was out of stock
                    // In that case take next available key from main aggregations object and push applied filter group aggregation
                    const mainAggregationsIdx = Math.max(
                        aggregations.findIndex(
                            ({ attribute_code }) =>
                                currentFilterKey === attribute_code
                        ),
                        aggregations.length
                    );
                    aggregations[mainAggregationsIdx] =
                        currentAggregations[currentAggregationsIdx];
                }
            });

            return aggregations;
        }
        return null;
    }, [aggregationsQueryData]);

    // Use a separate state to hold aggregation data to avoid empty data flashing while new data is loaded.
    // This means while we load new data, show old instead of shimmers.
    const [aggregations, setAggregations] = useState([]);
    useEffect(() => {
        if (hasError) {
            setAggregations([]);
        } else if (combinedAggregations) {
            setAggregations(combinedAggregations);
        }
    }, [combinedAggregations, hasError]);

    // Set up filter API using fetched aggregation data
    const filtersApi = useFilters(aggregations, introspectionData);

    // Update pagination API with total page amount from query response
    const totalPagesFromData = useMemo(
        () => productData?.page_info?.total_pages || null,
        [productData?.page_info?.total_pages]
    );
    useEffect(() => {
        setTotalPages(totalPagesFromData);
        return () => {
            setTotalPages(null);
        };
    }, [setTotalPages, totalPagesFromData]);

    // If we get an error after loading we should try to reset to page 1.
    // If we continue to have errors after that, render an error message.
    useEffect(() => {
        if (hasError && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [currentPage, hasError, setCurrentPage]);

    // Keep track of the search terms so we can tell when they change.
    const previousSearch = useRef(location.search);

    // Reset the current page back to one (1) when the search string, filters
    // or sort criteria change.
    useEffect(() => {
        // We don't want to compare page value.
        const prevSearch = new URLSearchParams(previousSearch.current);
        const nextSearch = new URLSearchParams(location.search);
        prevSearch.delete('page');
        nextSearch.delete('page');

        if (
            prevSearch.toString() !== nextSearch.toString() ||
            previousSort.current.sortAttribute.toString() !==
                currentSort.sortAttribute.toString() ||
            previousSort.current.sortDirection.toString() !==
                currentSort.sortDirection.toString()
        ) {
            // The search term changed.
            setCurrentPage(1, true);
            // And update the ref.
            previousSearch.current = location.search;
            previousSort.current = currentSort;
        }
    }, [currentSort, previousSearch, location.search, setCurrentPage]);

    // Utilize Apollo cached data. Only consider loading if one of the data types are missing.
    // If we are auto applying stock filters, also show loading to prevent "no items available" message.
    const isLoading = useMemo(() => {
        return (
            ((!introspectionCalled || introspectionLoading) &&
                !introspectionData) ||
            ((!aggregationsQueryCalled || aggregationsQueryLoading) &&
                !aggregationsQueryData) ||
            (noStockFlag !== NO_STOCK_RESOLVED &&
                noStockFlag !== NO_STOCK_CACHE_PENDING) ||
            ((productsQueryLoading || !productsQueryCalled) &&
                !productsQueryData)
        );
    }, [
        aggregationsQueryCalled,
        aggregationsQueryData,
        aggregationsQueryLoading,
        noStockFlag,
        introspectionCalled,
        introspectionData,
        introspectionLoading,
        productsQueryCalled,
        productsQueryData,
        productsQueryLoading
    ]);

    // Utilize Apollo cached data. Only consider loading if one of the data types are missing.
    // If we are auto applying stock filters, also show loading to prevent "no items available" message.
    const isAggregationsLoading = useMemo(() => {
        return (
            ((!introspectionCalled || introspectionLoading) &&
                !introspectionData) ||
            ((!aggregationsQueryCalled || aggregationsQueryLoading) &&
                !aggregations.length)
        );
    }, [
        aggregations,
        aggregationsQueryCalled,
        aggregationsQueryLoading,
        introspectionCalled,
        introspectionData,
        introspectionLoading
    ]);

    const items =
        isLoading || !productData
            ? Array.from({ length: pageSize || DEFAULT_PAGE_SIZE }).fill(null)
            : productData.items;

    // Add special order filter if no products in stock
    useEffect(() => {
        if (
            noStockFlag !== NO_STOCK_PENDING ||
            isAggregationsLoading ||
            !aggregationsQueryData?.aggregationsList
        ) {
            return;
        }

        const filters = getFiltersFromSearch(location.search);
        if (!filters.has('stock_info')) {
            const stockAggregation = aggregationsQueryData.aggregationsList
                .find(a => !a.filters.includes('stock_info'))
                .aggregations.find(
                    aggregation => aggregation.attribute_code === 'stock_info'
                );

            const specialOrderOption = stockAggregation?.options?.find(
                option => option.value === 'special-order-items'
            );
            if (specialOrderOption) {
                const specialOrderOptionSearch = `stock_info[filter]=${
                    specialOrderOption.label
                },${specialOrderOption.value}`;
                history.replace({
                    pathname: location.pathname,
                    search: location.search
                        ? location.search + '&' + specialOrderOptionSearch
                        : '?' + specialOrderOptionSearch
                });
                setNoStockFlag(NO_STOCK_LOADING);
                return;
            }
        }

        setNoStockFlag(NO_STOCK_RESOLVED);
    }, [
        aggregationsQueryData?.aggregationsList,
        history,
        isAggregationsLoading,
        location.pathname,
        location.search,
        noStockFlag
    ]);

    useEffect(() => {
        if (noStockFlag === NO_STOCK_CACHE_PENDING && productsQueryLoading) {
            setNoStockFlag(
                productsQueryData?.products?.total_count > 0
                    ? NO_STOCK_RESOLVED
                    : NO_STOCK_INITIAL
            );
        }
    }, [
        noStockFlag,
        productsQueryData?.products?.total_count,
        productsQueryLoading
    ]);

    // Reset no stock flag on URL change
    useEffect(() => {
        if (location.pathname) {
            setNoStockFlag(NO_STOCK_CACHE_PENDING);
        }
    }, [location.pathname]);

    useProductImpressions({
        products: productsQueryData?.products?.items,
        type: queryVariable.search ? 'search' : 'plp'
    });

    useScrollTopOnChange(currentPage);

    return {
        contextState: filtersApi,
        isLoading,
        items,
        totalCount: productData?.total_count || 0,
        pageControl,
        sortMethods,
        sortProps,
        isAggregationsLoading,
        hasError,
        isFilterApplied,
        origin: queryVariable.search ? 'search' : 'plp',
        searchTerm: queryVariable.search ?? ''
    };
};
