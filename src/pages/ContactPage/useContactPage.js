import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';

import { CONFIG } from './config';
import operations from './contactPage.gql';

export const useContactPage = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const {
        queries: { getStoreListQuery }
    } = operations;

    const { data: storeListData, loading: storeListLoading } = useQuery(
        getStoreListQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const cmsConfig = CONFIG;

    const storeList = useMemo(() => {
        if (!storeListData) {
            return [];
        }

        return storeListData.pickupStoreList.map(storeData => ({
            ...storeData
        }));
    }, [storeListData]);

    return {
        storeList,
        storeListLoading,
        isMobile,
        cmsConfig
    };
};
