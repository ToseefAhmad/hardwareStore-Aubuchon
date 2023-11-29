import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useCookies } from 'react-cookie';

import BaseCarousel from './BaseCarousel';
import Bestsellers from './Bestsellers';
import CustomerProducts from './CustomerProducts';
import {
    GET_BESTSELLERS,
    GET_CURBSIDE_FAVORITES,
    GET_CUSTOMER_RECENT_PURCHASES,
    GET_CUSTOMER_RECOMMENDATIONS
} from './productCarousel.gql';
import RecentlyViewedProducts from './RecentlyViewedProducts';

export const useProductCarousel = productCarouselType => {
    const [cookies] = useCookies(['aubuchon_cid']);
    const productCarouselConfiguration = useMemo(
        () => ({
            curbside_favorites: {
                query: GET_CURBSIDE_FAVORITES,
                name: 'curbsideFavorites',
                component: BaseCarousel
            },
            customer_recent_purchases: {
                query: GET_CUSTOMER_RECENT_PURCHASES,
                name: 'customerRecentPurchases',
                variables: {
                    loyaltyId: cookies.aubuchon_cid
                },
                skip: !cookies.aubuchon_cid,
                component: CustomerProducts
            },
            customer_recommendations: {
                query: GET_CUSTOMER_RECOMMENDATIONS,
                name: 'customerRecommendations',
                variables: {
                    loyaltyId: cookies.aubuchon_cid
                },
                skip: !cookies.aubuchon_cid,
                component: CustomerProducts
            },
            bestsellers: {
                query: GET_BESTSELLERS,
                name: 'bestsellers',
                component: Bestsellers
            },
            recently_viewed_products: {
                query: GET_BESTSELLERS,
                name: 'recentlyViewedProducts',
                skip: true,
                component: RecentlyViewedProducts
            }
        }),
        [cookies]
    );

    const carouselType = productCarouselConfiguration[productCarouselType];
    const { data, loading } = useQuery(carouselType.query, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: carouselType.variables,
        skip: 'skip' in carouselType ? carouselType.skip : false
    });

    const items = useMemo(() => {
        return data ? data[carouselType.name] : [];
    }, [data, carouselType.name]);

    return {
        items,
        isLoading: !data && loading,
        CarouselComponent: carouselType.component
    };
};
