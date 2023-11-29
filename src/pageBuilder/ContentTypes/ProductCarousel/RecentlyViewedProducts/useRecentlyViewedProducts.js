import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { useRecentlyViewedContext } from '@app/context/recentlyViewedProducts';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

import { GET_PRODUCTS_BY_SKU } from './recentlyViewedProducts.gql';

export const useRecentlyViewedProducts = () => {
    const [recentlyViewedProducts] = useRecentlyViewedContext();

    const { data } = useQuery(GET_PRODUCTS_BY_SKU, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            sku: recentlyViewedProducts,
            pageSize: recentlyViewedProducts.length
        },
        skip: !recentlyViewedProducts.length
    });

    const itemsList = useMemo(() => {
        const recentlyViewedProductArray = [];
        recentlyViewedProducts.forEach(sku => {
            data?.products?.items.forEach(product => {
                if (product.sku === sku) {
                    recentlyViewedProductArray.unshift(product);
                }
            });
        });
        return recentlyViewedProductArray;
    }, [data?.products?.items, recentlyViewedProducts]);

    const { storeConfig } = useStoreConfig({
        fields: ['product_url_suffix']
    });

    return {
        itemsList,
        storeConfig,
        recentlyViewedProducts
    };
};
