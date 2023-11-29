import { useCallback } from 'react';

import { usePickupStoreContext } from '@app/context/PickupStore';

export const useCurrentStoreBlock = ({ setIsCurrentPickupBlockExpanded }) => {
    const [{ phone, email, schedule, url_key }] = usePickupStoreContext();

    const toggleIsShownMore = useCallback(() => {
        setIsCurrentPickupBlockExpanded(prevState => !prevState);
    }, [setIsCurrentPickupBlockExpanded]);

    return {
        phone,
        email,
        schedule,
        url_key,
        toggleIsShownMore
    };
};
