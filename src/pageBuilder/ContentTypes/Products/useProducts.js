import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { useProductImpressions } from '@app/hooks/useProductImpressions';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

import { GET_PRODUCTS_BY_URL_KEY } from './products.gql';

export const useProducts = pathNames => {
    const { storeConfig: storeConfigData } = useStoreConfig({
        fields: ['product_url_suffix']
    });

    const productUrlSuffix = useMemo(() => {
        if (storeConfigData) {
            return storeConfigData.product_url_suffix;
        }
    }, [storeConfigData]);

    const urlKeys = useMemo(() => {
        return pathNames.map(pathName => {
            const slug = pathName.split('/').pop();
            return productUrlSuffix ? slug.replace(productUrlSuffix, '') : slug;
        });
    }, [pathNames, productUrlSuffix]);

    const { data } = useQuery(GET_PRODUCTS_BY_URL_KEY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: { url_keys: urlKeys, pageSize: urlKeys.length }
    });

    const items = useMemo(() => data?.products?.items, [data]);

    useProductImpressions({ products: items, type: 'pageBuilder' });

    return {
        items,
        data,
        storeConfig: storeConfigData
    };
};
