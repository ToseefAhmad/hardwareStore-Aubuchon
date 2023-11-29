import { useMemo } from 'react';

import { useWindowSize } from '@magento/peregrine';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { usePickupStoreContext } from '@app/context/PickupStore';
import { useTailwindContext } from '@app/context/tailwind';

export const useAvailabilityFilter = ({ filterProps }) => {
    const [
        {
            id,
            city,
            region_code,
            images: [imageSrc],
            isLoading,
            getPickupStoreError
        }
    ] = usePickupStoreContext();

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const pickupStore = useMemo(() => {
        if (!isLoading && !getPickupStoreError) {
            return {
                id,
                storeName: `${city}, ${region_code}`,
                imageUrl: resourceUrl(imageSrc, {
                    type: 'image-wysiwyg',
                    fit: 'cover',
                    quality: 80,
                    width: 270,
                    height: 120
                })
            };
        }
    }, [city, getPickupStoreError, id, imageSrc, isLoading, region_code]);

    const inStockField = useMemo(
        () => filterProps?.items?.find(item => item.value === 'in-stock-items'),
        [filterProps?.items]
    );

    const outOfStockFields = useMemo(
        () =>
            filterProps?.items?.filter(item => item.value !== 'in-stock-items'),
        [filterProps?.items]
    );

    return {
        isMobile,
        pickupStore,
        inStockField,
        outOfStockFields
    };
};
