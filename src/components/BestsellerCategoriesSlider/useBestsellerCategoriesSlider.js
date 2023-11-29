import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { useStoreConfig } from '@app/hooks/useStoreConfig';

import operations from './bestsellerCategoriesSlider.gql';

export const useBestsellerCategoriesSlider = () => {
    const { storeConfig } = useStoreConfig({
        fields: [
            'category_url_suffix',
            'bestsellers_recommended_categories_level'
        ]
    });

    const categoryUrlSuffix = useMemo(() => {
        return (storeConfig && storeConfig['category_url_suffix']) || '';
    }, [storeConfig]);

    const recommendedCategoriesLevel = useMemo(() => {
        return (
            storeConfig &&
            +storeConfig['bestsellers_recommended_categories_level']
        );
    }, [storeConfig]);

    const {
        queries: { getBestsellerCategoriesQuery }
    } = operations;
    const { data, loading } = useQuery(getBestsellerCategoriesQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const bestsellerCategories = useMemo(() => {
        const categories = data?.bestsellers?.categories?.find(
            category => category.level === recommendedCategoriesLevel
        );
        return (
            categories?.items?.map(({ menuItem }) => ({
                url: `/${menuItem.url_path}${categoryUrlSuffix}`,
                title: menuItem.name
            })) || []
        );
    }, [
        categoryUrlSuffix,
        data?.bestsellers?.categories,
        recommendedCategoriesLevel
    ]);

    return {
        bestsellerCategories,
        isLoading: !data && loading
    };
};
