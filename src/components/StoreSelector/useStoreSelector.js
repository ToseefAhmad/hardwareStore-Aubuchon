import { useQuery } from '@apollo/client';
import { useCallback, useMemo, useState } from 'react';

import { useStoreSwitcher } from '@app/hooks/useStoreSwitcher';

import StoreListOperations from './storeSelector.gql';

export const useStoreSelector = () => {
    const { handleStoreSwitch } = useStoreSwitcher();
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const handleStoreSelect = store => {
        const storeUrl = '/stores/' + store.url_key;
        setIsButtonLoading(true);
        handleStoreSwitch(store.id, store.brand?.uid, storeUrl);
    };

    const [
        isCurrentPickupBlockExpanded,
        setIsCurrentPickupBlockExpanded
    ] = useState(false);
    const onStoreListScroll = useCallback(() => {
        if (isCurrentPickupBlockExpanded) {
            setIsCurrentPickupBlockExpanded(false);
        }
    }, [isCurrentPickupBlockExpanded, setIsCurrentPickupBlockExpanded]);

    const {
        queries: { getStoreListQuery }
    } = StoreListOperations;

    const { data: storeListData, error: storeListError } = useQuery(
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

    return {
        storeList,
        storeListError,
        handleStoreSelect,
        isCurrentPickupBlockExpanded,
        setIsCurrentPickupBlockExpanded,
        onStoreListScroll,
        isButtonLoading
    };
};
