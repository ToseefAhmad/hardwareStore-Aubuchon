import { useApolloClient, useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

import { MINI_CART_QUERY } from '@app/components/MiniCart/miniCart.gql';
import { MODAL_NAMES } from '@app/components/SimpleModal';
import { TYPES } from '@app/components/WarningDialog';
import { usePickupStoreContext } from '@app/context/PickupStore';
import AuthFormOperations from '@app/hooks/useAuthForm/authForm.gql';
import {
    savePickupStoreBrandUid,
    savePickupStoreId
} from '@app/utils/stores/handleStoreStorage';

const storage = new BrowserPersistence();

export const useStoreSwitcher = () => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const [{ id: currentPickupStoreId }] = usePickupStoreContext();
    const {
        queries: { getCartDetailsQuery },
        mutations: { createCartMutation }
    } = AuthFormOperations;

    const apolloClient = useApolloClient();
    const [
        { cartId },
        { createCart, removeCart, getCartDetails }
    ] = useCartContext();
    const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);
    const [fetchCartId] = useMutation(createCartMutation, {
        fetchPolicy: 'no-cache'
    });

    const readMiniCartDataFromCache = useCallback(() => {
        return apolloClient.readQuery({
            query: MINI_CART_QUERY,
            variables: {
                cartId
            }
        });
    }, [apolloClient, cartId]);

    const switchStore = useCallback(
        async (pickupStoreId, brandUid, storeUrl = '') => {
            if (pickupStoreId !== currentPickupStoreId) {
                await savePickupStoreId(pickupStoreId);
                await savePickupStoreBrandUid(brandUid || DEFAULT_BRAND_ID);
                await apolloClient.clearCacheData(apolloClient, 'cart');
                await removeCart();
                await apolloClient.clearStore();
                await apolloClient.persistor?.purge();
                await createCart({ fetchCartId });
                await getCartDetails({ fetchCartId, fetchCartDetails });
                const url = new URL(globalThis.location.href);
                const pathname = globalThis.location.pathname;
                // Setting this as we don't want to show closest store switcher after the store has been changed manually
                storage.setItem('closestStoreVerified', '1', 1210000000);

                if (
                    url.searchParams.has('ps') ||
                    url.searchParams.has('store')
                ) {
                    url.searchParams.delete('ps');
                    url.searchParams.delete('store');
                    globalThis.location.replace(url);
                } else {
                    if (!pathname.includes('store') || !storeUrl.length) {
                        globalThis.location && globalThis.location.reload();
                        return;
                    }

                    globalThis.location &&
                        globalThis.location.replace(storeUrl);
                }
            }
        },
        [
            apolloClient,
            createCart,
            currentPickupStoreId,
            fetchCartDetails,
            fetchCartId,
            getCartDetails,
            removeCart
        ]
    );

    const handleStoreSwitch = useCallback(
        async (pickupStoreId, brandUid, storeUrl) => {
            const { cart } = readMiniCartDataFromCache() || {};

            if (cart?.items?.length) {
                toggleModal({
                    identifier: MODAL_NAMES.warning,
                    props: {
                        pickupStoreId,
                        brandUid,
                        type: TYPES.warning
                    }
                });

                return;
            }

            await switchStore(pickupStoreId, brandUid, storeUrl);
        },
        [readMiniCartDataFromCache, switchStore, toggleModal]
    );

    return {
        handleStoreSwitch,
        switchStore
    };
};
