import { useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useMemo, useRef, useState } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { BrowserPersistence } from '@magento/peregrine/lib/util';

import { useStoreSwitcher } from '@app/hooks/useStoreSwitcher';

import CheckNearbyStoresDialogContentOperations from './content.gql';

const storage = new BrowserPersistence();

export const useContent = () => {
    const {
        queries: { getStoresListByProductQuery, getCartQtyQuery }
    } = CheckNearbyStoresDialogContentOperations;

    const [
        { modal },
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const { switchStore } = useStoreSwitcher();

    const sku = modal?.props?.sku;

    const itemData = useRef({});
    const [isShownWarningScreen, setIsShownWarningScreen] = useState(false);

    const apolloClient = useApolloClient();

    const [{ cartId }, { removeCart }] = useCartContext();

    const {
        data: storesListData,
        loading: storesListLoading,
        error: storesListError
    } = useQuery(getStoresListByProductQuery, {
        fetchPolicy: 'no-cache',
        variables: { sku },
        skip: !sku
    });

    const getCartQty = useAwaitQuery(getCartQtyQuery);

    const listData = useMemo(() => {
        let value = [];

        if (storesListData) {
            const { pickupStoreProductList } = storesListData;

            value = pickupStoreProductList;
        }

        return value;
    }, [storesListData]);

    const isEmptyList = useMemo(() => !listData.length, [listData.length]);

    const handleAddToCart = useCallback(async () => {
        try {
            storage.setItem('cartItems', [
                {
                    sku: itemData.current?.sku,
                    quantity: itemData.current?.qty
                }
            ]);
            await apolloClient.clearCacheData(apolloClient, 'cart');

            await removeCart();

            if (itemData?.current?.storeId) {
                await switchStore(
                    itemData.current?.storeId,
                    itemData.current?.brand.uid
                );
            }
        } catch (e) {
            console.error(e);
        }
    }, [apolloClient, removeCart, switchStore]);

    const handleSubmitMainScreen = useCallback(
        async ({ sku, storeId, qty, brand }) => {
            try {
                itemData.current = {
                    sku,
                    storeId,
                    qty,
                    brand
                };

                const {
                    data: {
                        cart: { total_quantity }
                    }
                } = await getCartQty({
                    fetchPolicy: 'network-only',
                    variables: { cartId }
                });

                if (total_quantity) {
                    setIsShownWarningScreen(true);

                    return;
                }

                await handleAddToCart();
            } catch (e) {
                console.error(e);
                itemData.current = {};
            }
        },
        [cartId, getCartQty, handleAddToCart]
    );

    const handleCancelWarningForm = useCallback(() => {
        itemData.current = {};
        setIsShownWarningScreen(false);
    }, []);

    return {
        listData,
        isEmptyList,
        isShownWarningScreen,
        storesListLoading,
        error: storesListError,
        handleSubmitMainScreen,
        handleAddToCart,
        handleCancelWarningForm,
        onClose: toggleModal,
        modalId: modal.identifier
    };
};
