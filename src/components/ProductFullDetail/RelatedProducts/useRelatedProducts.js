import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { useStoreConfig } from '@app/hooks/useStoreConfig';

import RelatedProductsOperations from './relatedProducts.gql';

export const useRelatedProducts = ({ urlKey }) => {
    const {
        queries: { getRelatedProducts }
    } = RelatedProductsOperations;

    const { storeConfig } = useStoreConfig({
        fields: ['product_url_suffix']
    });

    const { data, loading, error } = useQuery(getRelatedProducts, {
        variables: {
            urlKey: urlKey
        },
        skip: !urlKey || !storeConfig,
        fetchPolicy: 'cache',
        nextFetchPolicy: 'cache-first'
    });

    const relatedProducts = useMemo(() => {
        return !data || !data.products || !data.products.items || !!error
            ? []
            : data.products.items[0]?.related_products;
    }, [data, error]);

    return {
        relatedProducts,
        isLoading: loading,
        storeConfig
    };
};
