import { useMemo } from 'react';

import { useBrandContext } from '@app/context/Brand';
import { usePickupStoreContext } from '@app/context/PickupStore';

export const useGoogleReviewsCarousel = () => {
    const [, { getBrandFromList }] = useBrandContext();
    const [
        { isLoading, id: pickupStoreId, brand, city, region_code }
    ] = usePickupStoreContext();

    const storeName = useMemo(
        () => (isLoading ? '' : `${city}, ${region_code}`),
        [city, isLoading, region_code]
    );

    const brandName = useMemo(() => {
        if (isLoading) {
            return '';
        }
        const { name } = getBrandFromList(brand?.uid);
        return name || '';
    }, [brand?.uid, getBrandFromList, isLoading]);

    return {
        isLoading,
        pickupStoreId,
        brandName,
        storeName
    };
};
