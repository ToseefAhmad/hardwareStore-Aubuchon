import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

import operations from './categoryTree.gql';

/**
 * Returns props necessary to render a CategoryTree component.
 *
 * @param {object} props
 * @param {number} props.categoryId - category id for this node
 * @return {{ childCategories: [] }}
 */
export const useCategoryBrands = ({ categoryId }) => {
    const { getNavigationMenuQuery } = operations;
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    // We use no-caсhe option, because brands category has too many children's for storing them
    const { data, loading } = useQuery(getNavigationMenuQuery, {
        fetchPolicy: 'no-cache',
        variables: { id: categoryId }
    });

    const { storeConfig } = useStoreConfig({
        fields: ['category_url_suffix']
    });

    const categoryUrlSuffix = useMemo(() => {
        if (storeConfig) {
            return storeConfig?.category_url_suffix;
        }
    }, [storeConfig]);

    const childCategories = useMemo(() => {
        return (data && data.getNavigationMenu.children) || [];
    }, [data]);

    return {
        childCategories,
        loading,
        categoryUrlSuffix,
        isMobile
    };
};
