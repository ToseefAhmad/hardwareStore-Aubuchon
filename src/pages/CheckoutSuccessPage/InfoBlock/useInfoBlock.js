import { usePickupStoreContext } from '@app/context/PickupStore';
import { useUserContext } from '@app/context/user';

export const useInfoBlock = () => {
    const [{ isSignedIn }] = useUserContext();
    const [currentStore] = usePickupStoreContext();

    return {
        isSignedIn,
        currentStore
    };
};
