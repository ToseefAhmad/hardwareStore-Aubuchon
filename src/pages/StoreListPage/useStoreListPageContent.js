import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';

import { useWindowSize } from '@magento/peregrine';

import { useStoreSwitcher } from '@app/hooks/useStoreSwitcher';

import StoreListContentOperations from './storeListPageContent.gql';

/**
 *
 * @typedef {Object} Store
 *
 * @property {number} id Current pickup store ID
 * @property {string} latitude Current pickup store latitude
 * @property {string} longitude Current pickup store longitude
 * @property {string} address Current pickup store street
 * @property {string} city Current pickup store city
 * @property {string} region_code Current pickup store region ID
 *
 * @returns {{storeListData: Array<Store>}}
 */
export const useStoreListPageContent = () => {
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const {
        queries: { getStoreListQuery }
    } = StoreListContentOperations;
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 1024;

    const { data: storeListData, error: storeListError, loading } = useQuery(
        getStoreListQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const storeList = useMemo(() => {
        if (!storeListData) {
            return [];
        }

        return storeListData.pickupStoreList.map(storeData => ({
            ...storeData
        }));
    }, [storeListData]);

    const { handleStoreSwitch } = useStoreSwitcher();
    const handleStoreSelect = store => {
        setIsButtonLoading(true);
        handleStoreSwitch(store.id, store.brand?.uid);
    };

    return {
        storeList,
        storeListError,
        handleStoreSelect,
        isMobile,
        loading: !storeListData && loading,
        isButtonLoading
    };
};
