import { useMemo } from 'react';

import { useBrandContext } from '@app/context/Brand';
import { usePickupStoreContext } from '@app/context/PickupStore';
import { getStoreOpenCloseData } from '@app/utils/stores';

export const useCurrentStoreInfo = () => {
    const [
        {
            brand,
            city,
            address,
            region_code,
            images: [imageSrc],
            schedule,
            specialDays
        }
    ] = usePickupStoreContext();
    const [, { getBrandFromList }] = useBrandContext();

    const { isOpen, storeWorkInfo } = useMemo(
        () => getStoreOpenCloseData({ schedule, specialDays }),
        [schedule, specialDays]
    );

    const { logo: brandLogo, name: brandName } = useMemo(() => {
        return getBrandFromList(brand?.uid);
    }, [getBrandFromList, brand]);

    const storeName = `${city}, ${region_code}`;

    return {
        imageSrc,
        isOpen,
        storeName,
        address,
        brandLogo,
        brandName,
        isLoading: !storeName || !brandName,
        storeWorkInfo
    };
};
