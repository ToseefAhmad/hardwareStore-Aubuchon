import { useMemo } from 'react';

import { usePickupStoreContext } from '@app/context/PickupStore';

export const useCallPickupStore = () => {
    const [
        { id, city, region_code, phone, isLoading, getPickupStoreError }
    ] = usePickupStoreContext();

    const dataIsLoaded = useMemo(
        () => !!id && !isLoading && !getPickupStoreError,
        [id, isLoading, getPickupStoreError]
    );

    return {
        dataIsLoaded,
        phone,
        city,
        region_code
    };
};
