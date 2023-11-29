import { useCallback, useMemo } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { usePickupStoreContext } from '@app/context/PickupStore';

export const useSpecialOrderContent = () => {
    const [{ city }] = usePickupStoreContext();
    const [
        { modal },
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const { handleAddToCart, product } = useMemo(() => modal?.props || {}, [
        modal?.props
    ]);

    const {
        pickup_store_inventory: pickupStoreInventory,
        simple_categories: categories
    } = useMemo(() => product || {}, [product]);

    const handleSubmit = useCallback(async () => {
        await handleAddToCart();
        toggleModal();
    }, [handleAddToCart, toggleModal]);

    const checkNearbyStoresHandler = useCallback(() => {
        toggleModal({
            identifier: `${MODAL_NAMES.checkNearbyStores}`,
            props: {
                sku: product?.sku
            }
        });
    }, [product?.sku, toggleModal]);

    return {
        toggleModal,
        handleSubmit,
        city,
        pickupStoreInventory,
        categories,
        checkNearbyStoresHandler
    };
};
