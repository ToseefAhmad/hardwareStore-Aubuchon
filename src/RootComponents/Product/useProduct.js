import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { getSearchParam } from '@magento/peregrine/lib/hooks/useSearchParam';
import mapProduct from '@magento/venia-ui/lib/util/mapProduct';

import { useBrandContext } from '@app/context/Brand';
import { useRecentlyViewedContext } from '@app/context/recentlyViewedProducts';
import { useTailwindContext } from '@app/context/tailwind';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

import ProductOperations from './product.gql';

export const useProduct = props => {
    const {
        queries: { getProductDetailQuery }
    } = ProductOperations;

    const location = useLocation();
    const [
        ,
        {
            actions: { setPageLoading }
        }
    ] = useAppContext();

    const [, { addRecentlyViewedProduct }] = useRecentlyViewedContext();
    const [, { dispatch }] = useEventingContext();
    const [{ brand }] = useBrandContext();
    const prevImpression = useRef('');
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const isDesktop = windowSize.innerWidth >= tailwind.screens.xl;

    const { storeConfig } = useStoreConfig({
        fields: [
            'product_url_suffix',
            'turnto_site_key',
            'turnto_reviews_enabled',
            'turnto_reviews_teasere_enabled',
            'turnto_review_url',
            'turnto_qa_enabled',
            'turnto_qa_teasere_enabled',
            'turnto_comments_enabled'
        ]
    });

    const slug = location.pathname.split('/').pop();
    const productUrlSuffix = storeConfig?.product_url_suffix;
    const urlKey = productUrlSuffix ? slug.replace(productUrlSuffix, '') : slug;

    const isUserFromGoogle = !!getSearchParam('gclid', location);

    const { error, loading, data } = useQuery(getProductDetailQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !storeConfig,
        variables: {
            urlKey
        },
        onCompleted: data => {
            const {
                products: {
                    items: [product]
                }
            } = data;
            product && addRecentlyViewedProduct(product.sku);
        }
    });

    const isBackgroundLoading = !!data && loading;

    const product = useMemo(() => {
        /**
         * Initially, product is using data from props, which are retrieved by ResolveUrl operation
         * This data is incomplete, and its only purpose is to show content while we request inventory and price info
         *
         * Once full query data is retrieved, we replace initial data with the complete.
         */
        const currentProduct = data
            ? data.products.items.find(item => item.uid === props.uid)
            : { ...props };

        // const currentProduct = props.sku
        //     ? { ...props }
        //     : null;

        return currentProduct ? mapProduct(currentProduct) : null;
    }, [data, props]);

    // Update the page indicator if the GraphQL query is in flight.
    useEffect(() => {
        setPageLoading(isBackgroundLoading);
    }, [isBackgroundLoading, setPageLoading]);

    useEffect(() => {
        if (
            !!data &&
            product?.sku &&
            brand.name &&
            prevImpression.current !== product.sku
        ) {
            prevImpression.current = product.sku;
            dispatch({
                type: 'PDP_VIEW',
                payload: {
                    ...product,
                    affiliation: brand.name
                }
            });
        }
    }, [product, brand.name, dispatch, data]);

    const availabilityStatus = useMemo(() => {
        if (product?.stock_status === 'IN_STOCK') {
            return 'https://schema.org/InStock';
        } else {
            return 'https://schema.org/OutOfStock';
        }
    }, [product?.stock_status]);

    const productStructuredData = useMemo(() => {
        if (!data || !product) return;

        const price = product.price_range.maximum_price.final_price;
        const image = product.media_gallery.map(item => item.url);
        const reviewCount = product?.review_count;
        const structuredData = {
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            image,
            description: product.description,
            sku: product.sku,
            brand: {
                '@type': 'Brand',
                name: product.brand
            },
            mpn: product.manufacturer_part_number,
            gtin: product.upc,
            aggregateRating: {
                '@type': 'AggregateRating',
                reviewCount: reviewCount,
                ratingValue: product.review_rating
            },
            offers: {
                '@type': 'Offer',
                price: price.value,
                priceCurrency: price.currency,
                availability: availabilityStatus,
                url: `${globalThis.location.protocol}//${
                    globalThis.location.hostname
                }/${product.url_key}`
            }
        };

        const structuredDataWithoutAggregateRating = {
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            image,
            description: product.description,
            sku: product.sku,
            brand: {
                '@type': 'Brand',
                name: product.brand
            },
            mpn: product.manufacturer_part_number,
            gtin: product.upc,
            offers: {
                '@type': 'Offer',
                price: price.value,
                priceCurrency: price.currency,
                availability: availabilityStatus,
                url: `${globalThis.location.protocol}//${
                    globalThis.location.hostname
                }/${product.url_key}`
            }
        };

        return !reviewCount
            ? structuredDataWithoutAggregateRating
            : structuredData;
    }, [availabilityStatus, data, product]);

    return {
        error,
        loading: loading || (!error && !data),
        product,
        storeConfig,
        isMobile,
        isDesktop,
        isUserFromGoogle,
        productStructuredData
    };
};
