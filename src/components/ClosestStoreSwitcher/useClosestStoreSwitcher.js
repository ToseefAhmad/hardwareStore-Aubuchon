import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useCookies } from 'react-cookie';

import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import {
    GEO_IP_COOKIES_COORDINATES_KEY,
    GEO_IP_COOKIES_MAX_AGE,
    GEO_IP_COOKIES_PATH,
    usePickupStoreContext
} from '@app/context/PickupStore';
import { useTailwindContext } from '@app/context/tailwind';
import { useIsOrderPage } from '@app/hooks/useIsOrderPage';
import { useStoreSwitcher } from '@app/hooks/useStoreSwitcher';

import operations from './closestStoreSwitcher.gql';

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000
};

const errorCallback = error => {
    console.error(error);
};
const storage = new BrowserPersistence();
const CLOSEST_STORE_VERIFIED_KEY = 'closestStoreVerified';

export const useClosestStoreSwitcher = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const { handleStoreSwitch } = useStoreSwitcher();
    const { isOrderPage } = useIsOrderPage();
    const [, setCookie] = useCookies([GEO_IP_COOKIES_COORDINATES_KEY]);
    const coordsRef = useRef();

    const [{ id: currentStoreId, city, region_code }] = usePickupStoreContext();
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const [getClosestStore, { data }] = useMutation(
        operations.getClosestStoreMutation
    );

    const successCallback = useCallback(
        geolocation => {
            const coords = {
                latitude: geolocation.coords.latitude,
                longitude: geolocation.coords.longitude
            };
            coordsRef.current = coords;
            getClosestStore({
                variables: coords
            });
        },
        [getClosestStore]
    );

    // Try to get geolocation from the mobile browser if we didn't offer to switch stores yet
    useEffect(() => {
        // Check if closestStoreVerified time is not expired
        const item = storage.getRawItem(CLOSEST_STORE_VERIFIED_KEY);
        if (item) {
            const { ttl, timeStored } = JSON.parse(item);
            const now = Date.now();

            if (now - timeStored > ttl) {
                storage.removeItem(CLOSEST_STORE_VERIFIED_KEY);
            }
        }

        if (
            !isMobile ||
            isOrderPage ||
            storage.getItem(CLOSEST_STORE_VERIFIED_KEY) === '1'
        )
            return;

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                successCallback,
                errorCallback,
                geolocationOptions
            );
        }
    }, [isMobile, isOrderPage, successCallback]);

    const closestStoreData = useMemo(
        () =>
            data
                ? {
                      storeId: data.closestStore.store_id,
                      storeName: data.closestStore.store_name,
                      brandId: data.closestStore.brand_id
                  }
                : null,
        [data]
    );

    const currentStoreName = useMemo(() => `${city}, ${region_code}`, [
        city,
        region_code
    ]);

    const handleSwitchToClosestStore = useCallback(() => {
        // Set coordinates of the manually chosen store for Magento
        setCookie(
            GEO_IP_COOKIES_COORDINATES_KEY,
            `${coordsRef.current.latitude},${coordsRef.current.longitude}`,
            {
                maxAge: GEO_IP_COOKIES_MAX_AGE,
                path: GEO_IP_COOKIES_PATH
            }
        );
        handleStoreSwitch(closestStoreData.storeId, closestStoreData.brandId);
    }, [closestStoreData, handleStoreSwitch, setCookie]);

    const handleCloseModal = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    useEffect(() => {
        if (!closestStoreData) return;

        // Show modal if stores are different from IP and browser geolocation
        if (closestStoreData.storeId !== currentStoreId) {
            toggleModal({
                identifier: MODAL_NAMES.closestStoreSwitcher
            });
            /*
             * Set flag if store switching has been offered in this session, to avoid
             * showing popup on each reload if user chooses not to switch to the closest store
             * */
            storage.setItem(CLOSEST_STORE_VERIFIED_KEY, '1', 1210000000);
        }
    }, [closestStoreData, currentStoreId, toggleModal]);

    return {
        closestStoreName: closestStoreData?.storeName,
        currentStoreName,
        handleSwitchToClosestStore,
        handleCloseModal
    };
};
