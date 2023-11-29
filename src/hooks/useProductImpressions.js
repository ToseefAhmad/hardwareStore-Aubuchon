import { useCallback, useEffect, useRef } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import { useBrandContext } from '@app/context/Brand';

export const useProductImpressions = ({ products = [], type = 'plp' }) => {
    const [, { dispatch }] = useEventingContext();
    const [{ brand }] = useBrandContext();
    const prevImpressions = useRef('');

    const getImpressionsCacheKey = useCallback(
        products => products.map(products => products.sku).join(','),
        []
    );

    useEffect(() => {
        if (products?.length && brand.name) {
            const cacheKey = getImpressionsCacheKey(products);

            if (cacheKey !== prevImpressions.current) {
                prevImpressions.current = cacheKey;
                dispatch({
                    type: 'PRODUCTS_IMPRESSION',
                    payload: {
                        items: products,
                        affiliation: brand.name,
                        origin: type
                    }
                });
            }
        }
    }, [brand.name, dispatch, getImpressionsCacheKey, products, type]);
};
