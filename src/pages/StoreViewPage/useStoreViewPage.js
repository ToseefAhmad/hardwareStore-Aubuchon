import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useBrandContext } from '@app/context/Brand';
import { usePickupStoreContext } from '@app/context/PickupStore';

import StoreViewPageOperations from './storeViewPage.gql';

const STORE_PAGE_META_DESCRIPTION =
    'Offering convenient service, quality products, and a 100% satisfaction guarantee in store and online at HardwareStore.com.';

export const useStoreViewPage = () => {
    const { urlKey } = useParams();
    const [currentStore] = usePickupStoreContext();
    const [, { getBrandFromList }] = useBrandContext();

    const {
        queries: { getStoreByUrlKeyQuery }
    } = StoreViewPageOperations;

    const { data, loading } = useQuery(getStoreByUrlKeyQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            urlKey
        }
    });

    const storeName = useMemo(() => {
        if (data?.pickupStore) {
            const { name } = getBrandFromList(data.pickupStore.brand?.uid);
            return `${name} Store in ${data.pickupStore.city}, ${
                data.pickupStore.region_code
            }`;
        }
        return null;
    }, [data, getBrandFromList]);

    const showMakeMyStoreButton = useMemo(() => {
        return currentStore?.id && currentStore?.id !== data?.pickupStore?.id;
    }, [currentStore?.id, data?.pickupStore?.id]);

    const meta_title = useMemo(() => {
        if (data?.pickupStore) {
            const { name } = data?.pickupStore?.brand;
            const { city, region_code } = data?.pickupStore;
            const zip = data?.pickupStore?.zipcode?.split('-')[0];

            return `${name} store in ${city}, ${region_code} ${zip}`;
        } else {
            return null;
        }
    }, [data]);

    return {
        storeName,
        storeData: data?.pickupStore,
        isLoading: loading && !data,
        showMakeMyStoreButton,
        meta_title,
        meta_description: STORE_PAGE_META_DESCRIPTION
    };
};
