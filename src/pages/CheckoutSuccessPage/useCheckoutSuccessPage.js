import { useEffect, useMemo, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';
import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

import { APP_ROUTER_PATHS } from '@app/constants';
import { usePickupStoreContext } from '@app/context/PickupStore';
import { useTailwindContext } from '@app/context/tailwind';

const storage = new BrowserPersistence();
let timeoutHandler = null;

export const useCheckoutSuccessPage = () => {
    const [
        {
            url_key,
            brand,
            schedule,
            latitude,
            longitude,
            images,
            address,
            phone,
            email,
            id,
            city,
            region_code,
            zoom_level,
            specialDays,
            images: [imageSrc],
            isLoading,
            getPickupStoreError
        }
    ] = usePickupStoreContext();
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const history = useHistory();

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const dataIsLoaded = useMemo(
        () => !!id && !isLoading && !getPickupStoreError,
        [id, isLoading, getPickupStoreError]
    );
    const storeData = useMemo(() => {
        let value = {};

        if (dataIsLoaded) {
            value = {
                url_key,
                brand,
                schedule,
                latitude,
                longitude,
                images,
                address,
                phone,
                email,
                id,
                city,
                region_code,
                specialDays,
                imageSrc,
                zoom_level
            };
        }

        return value;
    }, [
        dataIsLoaded,
        url_key,
        brand,
        schedule,
        latitude,
        longitude,
        images,
        address,
        phone,
        email,
        id,
        city,
        region_code,
        specialDays,
        imageSrc,
        zoom_level
    ]);
    const orderDataRef = useRef(storage.getItem('checkout_success_data'));

    useEffect(() => {
        timeoutHandler = setTimeout(() => {
            storage.removeItem('checkout_success_data');
        }, 1000);
        return () => {
            if (timeoutHandler) {
                clearTimeout(timeoutHandler);
            }
        };
    }, []);

    useEffect(() => {
        if (
            !orderDataRef.current ||
            (orderDataRef.current && isObjectEmpty(orderDataRef.current))
        ) {
            history.push(APP_ROUTER_PATHS.home);
        }
    }, [history]);

    return {
        storeData,
        dataIsLoaded,
        isMobile,
        orderData: orderDataRef.current
    };
};
