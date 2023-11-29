import { useQuery, useLazyQuery } from '@apollo/client';
import { useMemo, useEffect } from 'react';

import { useStoreConfig } from '@app/hooks/useStoreConfig';

import SitemapPageOperations from './sitemapPage.gql';

export const useSiteMapPage = () => {
    const {
        queries: { getSitemapCategoryItems, getStoreListQuery }
    } = SitemapPageOperations;

    const [
        loadSitemapCategoryItems,
        {
            loading: loadingCategoryItems,
            error: errorCategoryItems,
            data: sitemapCategoryItems,
            called: calledCategoryItems
        }
    ] = useLazyQuery(getSitemapCategoryItems, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const {
        loading: loadingStoreList,
        error: storeListErrors,
        data: storeListData
    } = useQuery(getStoreListQuery);

    const { storeConfig } = useStoreConfig({
        fields: ['root_category_uid']
    });

    useEffect(() => {
        if (!calledCategoryItems && storeConfig) {
            loadSitemapCategoryItems({
                variables: { id: storeConfig.root_category_uid }
            });
        }
    }, [calledCategoryItems, storeConfig, loadSitemapCategoryItems]);

    const pageData = useMemo(() => {
        const value = {};

        if (sitemapCategoryItems) {
            value.sitemapRootItems =
                sitemapCategoryItems.getNavigationMenu.children;
        }

        if (storeListData) {
            const storesByState = {};
            const sortedStoreList = storeListData.pickupStoreList
                .slice()
                .sort((a, b) => a.region_name.localeCompare(b.region_name));

            sortedStoreList.forEach(store => {
                storesByState[store.region_name] = storesByState[
                    store.region_name
                ]
                    ? [...storesByState[store.region_name], store]
                    : [store];
            });
            value.storeListData = Object.entries(storesByState);
        }

        return value;
    }, [sitemapCategoryItems, storeListData]);

    return {
        loadingCategoryItems,
        loadingStoreList,
        error: errorCategoryItems || storeListErrors,
        pageData
    };
};
