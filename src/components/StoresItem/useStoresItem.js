import { useMemo } from 'react';

import { useBrandContext } from '@app/context/Brand';
import { getStoreOpenCloseData } from '@app/utils/stores';

export const useStoresItem = ({ data }) => {
    const {
        city,
        region_code,
        schedule,
        specialDays,
        distance,
        brand,
        id,
        url_key
    } = data;
    const [, { getBrandFromList }] = useBrandContext();

    const milesValue = distance;

    const storeName = useMemo(() => `${city}, ${region_code}`, [
        city,
        region_code
    ]);

    const { isOpen, storeWorkInfo } = useMemo(
        () => getStoreOpenCloseData({ schedule, specialDays }),
        [schedule, specialDays]
    );

    const { logo, name } = useMemo(() => getBrandFromList(brand?.uid), [
        brand?.uid,
        getBrandFromList
    ]);

    return {
        milesValue,
        storeName,
        isOpen,
        logo,
        name,
        isLoading: !storeName || !name,
        storeWorkInfo,
        id,
        url_key
    };
};
