import { useMemo, useState } from 'react';

import { usePickupStoreContext } from '@app/context/PickupStore';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

const MAX_ITEMS_PER_CATEGORY = 20;

export const TOP_PICKS_KEY = 'top-picks';

export const useBestsellers = ({ data }) => {
    const [
        {
            isLoading: storeIsLoading,
            city: storeCity,
            region_code: storeRegionCode
        }
    ] = usePickupStoreContext();

    const storeLocation = useMemo(() => {
        if (storeIsLoading) {
            return null;
        }

        return `${storeCity}, ${storeRegionCode}`;
    }, [storeCity, storeIsLoading, storeRegionCode]);

    const { storeConfig } = useStoreConfig({
        fields: ['bestsellers_product_categories_level']
    });

    const productCategoriesLevel = useMemo(() => {
        return (
            storeConfig && +storeConfig['bestsellers_product_categories_level']
        );
    }, [storeConfig]);

    const products = useMemo(() => data?.products || [], [data?.products]);

    const [
        selectedBestsellerCategoryKey,
        setSelectedBestsellerCategoryKey
    ] = useState(TOP_PICKS_KEY);

    const bestsellerCategories = useMemo(() => {
        const categories =
            data?.categories?.find(
                category => category.level === productCategoriesLevel
            )?.items || [];
        const bestsellerCategories = [
            {
                id: TOP_PICKS_KEY,
                title: 'Top Picks',
                products: products.slice(0, MAX_ITEMS_PER_CATEGORY)
            }
        ];
        categories.forEach(category => {
            const categoryProducts = products
                .filter(product => category.productSkus?.includes(product.sku))
                .slice(0, MAX_ITEMS_PER_CATEGORY);
            bestsellerCategories.push({
                id: category.menuItem.uid,
                title: category.menuItem.name,
                products: categoryProducts
            });
        });

        return bestsellerCategories;
    }, [data?.categories, productCategoriesLevel, products]);

    const selectedBestsellerCategory = useMemo(
        () =>
            bestsellerCategories.find(
                bestsellerCategory =>
                    bestsellerCategory.id === selectedBestsellerCategoryKey
            ),
        [bestsellerCategories, selectedBestsellerCategoryKey]
    );

    return {
        storeLocation,
        bestsellerCategories,
        selectedBestsellerCategory,
        selectedBestsellerCategoryKey,
        setSelectedBestsellerCategoryKey
    };
};
