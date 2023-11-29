import { useCallback, useMemo } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

export const useSuggestedProduct = ({
    id,
    name,
    sku,
    onNavigate,
    url,
    url_key,
    small_image,
    imageUrl,
    searchTerm
}) => {
    const [, { dispatch }] = useEventingContext();

    const uri = useMemo(() => {
        const validUrlKey = url_key
            ? url_key.charAt(0) === '/'
                ? url_key
                : '/' + url_key
            : undefined;
        const validUrl = url ? '/' + url.split('/').pop() : undefined;

        return validUrlKey || validUrl || '';
    }, [url, url_key]);

    const productFullUrl = useMemo(() => {
        return location.protocol + '//' + location.host + uri;
    }, [uri]);

    const image = useMemo(() => {
        return small_image || imageUrl.replace('needtochange/', '');
    }, [imageUrl, small_image]);

    const handleClick = useCallback(() => {
        dispatch({
            type: 'PRODUCT_CLICK',
            payload: {
                name,
                sku,
                origin: 'search'
            }
        });
        dispatch({
            type: 'KLEVU_PRODUCT_CLICK',
            payload: {
                id,
                name,
                sku,
                searchTerm,
                origin: 'search',
                url: productFullUrl
            }
        });

        if (typeof onNavigate === 'function') {
            onNavigate();
        }
    }, [dispatch, id, name, sku, searchTerm, productFullUrl, onNavigate]);

    return {
        handleClick,
        uri,
        image
    };
};
