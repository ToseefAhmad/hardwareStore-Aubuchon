import { useCallback, useMemo } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { usePickupStoreContext } from '@app/context/PickupStore';
import { getStoreOpenCloseData } from '@app/utils/stores';

export const useStoreSwitcher = () => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const { elementRef, expanded, setExpanded, triggerRef } = useDropdown();
    const [
        {
            id,
            url_key,
            address,
            city,
            region_code,
            phone,
            images: [imageSrc],
            schedule,
            specialDays,
            isLoading,
            getPickupStoreError
        }
    ] = usePickupStoreContext();

    const dataIsLoaded = useMemo(
        () => !!id && !isLoading && !getPickupStoreError,
        [id, isLoading, getPickupStoreError]
    );

    const storeOpenCloseData = useMemo(
        () =>
            dataIsLoaded
                ? getStoreOpenCloseData({ schedule, specialDays })
                : {},
        [dataIsLoaded, schedule, specialDays]
    );

    const storeInfoData = useMemo(() => {
        let value = {};

        if (dataIsLoaded) {
            value = {
                url_key,
                address,
                city,
                region_code,
                phone,
                imageSrc
            };
        }

        return value;
    }, [dataIsLoaded, url_key, address, city, region_code, phone, imageSrc]);

    const toggleExpanded = useCallback(() => {
        setExpanded(prevState => !prevState);
    }, [setExpanded]);

    const handleToggleStoreSwitcherDialog = useCallback(() => {
        toggleModal({
            identifier: MODAL_NAMES.storeSwitcher
        });
    }, [toggleModal]);

    return {
        elementRef,
        triggerRef,
        expanded,
        toggleExpanded,
        dataIsLoaded,
        storeInfoData,
        storeOpenCloseData,
        toggleStoreSwitcherDialog: handleToggleStoreSwitcherDialog
    };
};
