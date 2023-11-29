import { useQuery, useMutation } from '@apollo/client';
import { useCallback, useMemo, useEffect } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import { useStoreConfig } from '@app/hooks/useStoreConfig';

import operations from '../MiniCart/miniCart.gql';

export const usePreCart = () => {
    const {
        removeItemMutation,
        updateItemQuantityMutation,
        miniCartQuery
    } = operations;

    const [, { dispatch }] = useEventingContext();
    const [
        { cartId },
        {
            actions: { addLastCartItem }
        }
    ] = useCartContext();
    const [{ drawer }, { closeDrawer, toggleDrawer }] = useAppContext();
    const isOpen = drawer === 'precart';

    const { data: miniCartData, loading: miniCartLoading } = useQuery(
        miniCartQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            variables: { cartId },
            skip: !cartId
        }
    );

    const { storeConfig } = useStoreConfig({
        fields: ['product_url_suffix', 'configurable_thumbnail_source']
    });

    const configurableThumbnailSource = useMemo(() => {
        return storeConfig?.configurable_thumbnail_source;
    }, [storeConfig]);

    const storeUrlSuffix = useMemo(() => {
        return storeConfig?.product_url_suffix;
    }, [storeConfig]);

    const grandTotal = useMemo(() => {
        if (!miniCartLoading) {
            return miniCartData?.cart?.prices?.grand_total;
        }
    }, [miniCartData, miniCartLoading]);

    const productList = useMemo(() => {
        if (!miniCartLoading) {
            return miniCartData?.cart?.items;
        }
    }, [miniCartData, miniCartLoading]);

    const handleCloseMiniCart = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    const [
        removeItem,
        {
            loading: removeItemLoading,
            called: removeItemCalled,
            error: removeItemError
        }
    ] = useMutation(removeItemMutation);

    const handleRemoveItem = useCallback(
        async id => {
            const eventPayload = {
                currencyCode: miniCartData?.cart?.prices?.grand_total?.currency,
                items: miniCartData?.cart?.items?.filter(
                    item => item.uid === id
                )
            };

            try {
                await removeItem({
                    variables: {
                        cartId,
                        itemId: id
                    }
                });
                dispatch({
                    type: 'REMOVE_FROM_CART',
                    payload: eventPayload
                });
            } catch {
                // Error is logged by apollo link - no need to double log.
            }
        },
        [cartId, dispatch, miniCartData, removeItem]
    );

    const [
        updateItemQuantity,
        {
            loading: updateItemQuantityLoading,
            called: updateItemQuantityCalled,
            error: updateItemQuantityError
        }
    ] = useMutation(updateItemQuantityMutation);

    const handleUpdateItemQuantity = useCallback(
        async (quantity, id) => {
            try {
                const { data } = await updateItemQuantity({
                    variables: {
                        cartId,
                        itemId: id,
                        quantity
                    }
                });
                const lastAddedProduct = data.updateCartItems.cart.items.find(
                    product => id === product.uid
                );
                addLastCartItem.receive(lastAddedProduct);

                if (quantity === 0) {
                    handleCloseMiniCart();
                }
            } catch {
                // Error is logged by apollo link - no need to double log.
            }
        },
        [cartId, updateItemQuantity, handleCloseMiniCart, addLastCartItem]
    );

    const derivedErrorMessage = useMemo(
        () => deriveErrorMessage([removeItemError, updateItemQuantityError]),
        [removeItemError, updateItemQuantityError]
    );

    const handleNavigateToMiniCart = useCallback(() => {
        closeDrawer();
        toggleDrawer('minicart');
    }, [closeDrawer, toggleDrawer]);

    // On component unmount - close drawer
    useEffect(() => {
        return closeDrawer;
    }, [closeDrawer]);

    return {
        handleCloseMiniCart,
        isOpen,
        errorMessage: derivedErrorMessage,
        handleRemoveItem,
        handleUpdateItemQuantity,
        loading:
            miniCartLoading ||
            (removeItemCalled && removeItemLoading) ||
            updateItemQuantityLoading ||
            (updateItemQuantityCalled && updateItemQuantityLoading),
        productList,
        grandTotal,
        configurableThumbnailSource,
        storeUrlSuffix,
        storeConfig,
        handleNavigateToMiniCart
    };
};
