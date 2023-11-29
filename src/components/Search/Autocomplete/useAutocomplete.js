import { useLazyQuery } from '@apollo/client';
import { useEffect, useCallback, useRef, useState, useMemo } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import { useProductImpressions } from '@app/hooks/useProductImpressions';
import { useStoreConfig } from '@app/hooks/useStoreConfig';
import klevuApi from '@app/utils/Klevu';

import operations from './autocomplete.gql';

export const useAutocomplete = props => {
    const { valid, visible, setHasResult } = props;
    const { getProductsByUrlKeyQuery } = operations;

    const [searchResult, setSearchResult] = useState();
    const [klevuDefaultResults, setKlevuDefaultResults] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatchTimer = useRef(null);
    const [, { dispatch }] = useEventingContext();

    const { storeConfig: storeConfigData } = useStoreConfig({
        fields: ['product_url_suffix']
    });

    const [
        getProductsByUrlKey,
        { data: getProductsByUrlKeyData }
    ] = useLazyQuery(getProductsByUrlKeyQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const dispatchEvent = useCallback(
        term => {
            clearTimeout(dispatchTimer.current);

            dispatchTimer.current = setTimeout(() => {
                dispatch({
                    type: 'KLEVU_SEARCH_TERM',
                    payload: term
                });
            }, 1000);
        },
        [dispatch]
    );

    const getDefaultData = useCallback(async () => {
        try {
            const response = await klevuApi.getDefaultSearchData();
            setKlevuDefaultResults(response.data);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const runSearch = useCallback(
        async ({ value, valid }) => {
            let delayedLoaderId;

            if (valid) {
                try {
                    delayedLoaderId = setTimeout(
                        () => setIsLoading(true),
                        1000
                    );
                    const response = await klevuApi.getSearchData(value);
                    setSearchResult(response);
                    dispatchEvent(value);
                } catch (e) {
                    console.error(e);
                } finally {
                    clearTimeout(delayedLoaderId);
                    setIsLoading(false);
                }
            }
        },
        [dispatchEvent]
    );

    // Get the search term from the field.
    const { value } = useFieldState('search_query');

    useEffect(() => {
        return () => {
            clearTimeout(dispatchTimer.current);
        };
    }, []);

    // run the query once on mount, and again whenever props change
    useEffect(() => {
        if (visible) {
            runSearch({ value, valid });
        }
    }, [runSearch, valid, value, visible]);

    // Empty the search result if no valid search value
    useEffect(() => {
        if (!valid) {
            setSearchResult(null);
        }
    }, [valid]);

    useEffect(() => {
        getDefaultData();
    }, [getDefaultData]);

    const productUrlSuffix = useMemo(() => {
        if (storeConfigData) {
            return storeConfigData.product_url_suffix;
        }
    }, [storeConfigData]);

    useEffect(() => {
        const urlKeys =
            klevuDefaultResults &&
            klevuDefaultResults.klevu_popularProductsOfSite.map(({ url }) => {
                const slug = url
                    .split('/')
                    .pop()
                    .replace('.html', '');
                return productUrlSuffix
                    ? slug.replace(productUrlSuffix, '')
                    : slug;
            });

        if (urlKeys)
            getProductsByUrlKey({
                variables: { url_keys: urlKeys }
            });
    }, [klevuDefaultResults, productUrlSuffix, getProductsByUrlKey]);

    // Handle results.
    const autocomplete = searchResult?.autoComplete;
    const categories = searchResult?.categories;
    const products = searchResult?.result.length ? searchResult.result : null;
    const defaultProducts = getProductsByUrlKeyData?.products.items;
    const popularSearchTerms = klevuDefaultResults?.klevu_webstorePopularTerms;

    useEffect(() => {
        setHasResult(!!products || !!defaultProducts);
    }, [products, defaultProducts, setHasResult]);

    useProductImpressions({ products, type: 'search' });

    return {
        autocomplete,
        categories,
        defaultProducts,
        products,
        popularSearchTerms,
        value,
        isLoading
    };
};
