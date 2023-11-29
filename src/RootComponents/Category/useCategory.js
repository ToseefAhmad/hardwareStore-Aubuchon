import { useMemo } from 'react';

import { useStoreConfig } from '@app/hooks/useStoreConfig';

const BRANDS_CATEGORY = 'Brands';

export const useCategory = props => {
    const category = { ...props };

    const { storeConfig: categoryUrlData } = useStoreConfig({
        fields: ['category_url_suffix']
    });

    const categoryUrlSuffix = useMemo(() => {
        if (categoryUrlData) {
            return categoryUrlData.category_url_suffix || '';
        }
    }, [categoryUrlData]);

    const metaTitle = useMemo(() => {
        if (category.breadcrumbs?.length >= 1) {
            if (category.breadcrumbs.length === 1) {
                if (category.breadcrumbs[0].category_name === BRANDS_CATEGORY) {
                    return category.name;
                }
            }
            let title = '';
            category.breadcrumbs.forEach(
                c => (title += ` - ${c.category_name}`)
            );
            return `${category.name} ${title}`;
        }
        return category.meta_title || category.name;
    }, [category.breadcrumbs, category.meta_title, category.name]);

    const cmsBlockContent = useMemo(() => {
        if (
            category.display_mode !== 'PRODUCTS_AND_PAGE' ||
            !category.cms_block
        ) {
            return null;
        }

        return category?.cms_block?.content;
    }, [category.cms_block, category.display_mode]);

    const suggestedCategories = useMemo(
        () =>
            category.menu?.children?.map(item => ({
                url: `/${item.url_path}${categoryUrlSuffix}`,
                title: item.name
            })),
        [category.menu?.children, categoryUrlSuffix]
    );

    return {
        category,
        metaTitle,
        cmsBlockContent,
        suggestedCategories
    };
};
