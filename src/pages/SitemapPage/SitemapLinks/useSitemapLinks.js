import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CategoryTree/categoryTree.gql';

export const useSitemapLinks = () => {
    const { getCategoryUrlSuffixQuery } = DEFAULT_OPERATIONS;

    const { data: categoryUrlData } = useQuery(getCategoryUrlSuffixQuery);

    const categoryUrlSuffix = useMemo(() => {
        if (categoryUrlData) {
            const suffix = categoryUrlData?.storeConfig?.category_url_suffix;

            if (suffix) {
                return suffix;
            }

            return '';
        }
    }, [categoryUrlData]);

    return {
        categoryUrlSuffix
    };
};
