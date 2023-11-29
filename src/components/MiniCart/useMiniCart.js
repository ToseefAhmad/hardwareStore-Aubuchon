import { useQuery, useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import { usePickupStoreContext } from '@app/context/PickupStore';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

import DEFAULT_OPERATIONS from './miniCart.gql';

/**
 *
 * @param {DocumentNode} props.operations.getStoreConfigQuery - Query to fetch store config
 * @param {DocumentNode} props.operations.miniCartQuery - Query to fetch mini cart data
 * @param {DocumentNode} props.operations.removeItemMutation - Mutation to remove an item from cart
 * @param {DocumentNode} props.operations.updateItemQuantityMutation - Mutation to remove an item from cart
 */

export const useMiniCart = props => {
    const { miniCartContentRef } = props;
    const {
        removeItemMutation,
        updateItemQuantityMutation,
        miniCartQuery
    } = DEFAULT_OPERATIONS;

    const [, { dispatch }] = useEventingContext();
    const [{ cartId }] = useCartContext();
    const [{ drawer }, { closeDrawer }] = useAppContext();
    const [
        {
            id: pickupStoreId,
            city: pickupStoreCity,
            region_code: pickupStoreRegionCode,
            allow_pickup: pickupStoreAllowPickup,
            isLoading: isPickupStoreLoading,
            getPickupStoreError
        }
    ] = usePickupStoreContext();

    const prevOpen = useRef(false);
    const history = useHistory();
    const [isMobileDetailed, setIsMobileDetailed] = useState(false);
    const [isPromoCodeInputVisible, setIsPromoCodeInputVisible] = useState(
        false
    );
    const [isCartUpdating, setIsCartUpdating] = useState(false);

    const isOpen = drawer === 'minicart';

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

    const discountsData = useMemo(() => {
        return miniCartData?.cart?.prices?.discounts;
    }, [miniCartData]);

    const isPickupStoreDataIsLoaded = useMemo(
        () => !!pickupStoreId && !isPickupStoreLoading && !getPickupStoreError,
        [pickupStoreId, isPickupStoreLoading, getPickupStoreError]
    );

    const configurableThumbnailSource = useMemo(() => {
        return storeConfig?.configurable_thumbnail_source;
    }, [storeConfig]);

    const storeUrlSuffix = useMemo(() => {
        return storeConfig?.product_url_suffix;
    }, [storeConfig]);

    const totalQuantity = useMemo(() => {
        if (!miniCartLoading) {
            return miniCartData?.cart?.total_quantity;
        }
    }, [miniCartData, miniCartLoading]);

    const subTotal = useMemo(() => {
        if (!miniCartLoading) {
            return miniCartData?.cart?.prices?.subtotal_excluding_tax;
        }
    }, [miniCartData, miniCartLoading]);

    const grandTotal = useMemo(() => {
        if (!miniCartLoading) {
            return miniCartData?.cart?.prices?.grand_total;
        }
    }, [miniCartData, miniCartLoading]);

    const catalogDiscount = useMemo(() => {
        let value = 0;

        miniCartData?.cart?.items?.forEach(item => {
            const {
                quantity,
                product: {
                    price_range: {
                        maximum_price: {
                            discount: { amount_off }
                        }
                    }
                }
            } = item;
            value += quantity * amount_off;
        });

        return value;
    }, [miniCartData?.cart?.items]);

    const subTotalWithoutSale = useMemo(() => {
        const adjustedAmount = subTotal?.value + catalogDiscount;
        return {
            value: adjustedAmount,
            currency: subTotal?.currency
        };
    }, [catalogDiscount, subTotal]);

    const youSave = useMemo(() => {
        return {
            value: catalogDiscount,
            currency: subTotal?.currency
        };
    }, [catalogDiscount, subTotal?.currency]);

    const productList = useMemo(() => {
        if (!miniCartLoading) {
            return miniCartData?.cart?.items;
        }
    }, [miniCartData, miniCartLoading]);

    const isIncludeNotAvailableProducts = useMemo(() => {
        if (!productList?.length) return false;

        return productList.some(
            ({ product: { pickup_store_inventory }, is_paint_fee }) =>
                !is_paint_fee && !pickup_store_inventory.qty
        );
    }, [productList]);

    const hasOutOfStockItem = useMemo(() => {
        if (!productList?.length) return false;

        return productList.some(
            ({ is_paint_fee, product: { stock_status } }) =>
                stock_status === 'OUT_OF_STOCK' && !is_paint_fee
        );
    }, [productList]);

    const bossAvailableDate = useMemo(() => {
        const DEFAULT_VALUE = null;

        if (!productList?.length) return DEFAULT_VALUE;

        const bossAvailableDates = productList.map(
            ({ product: { pickup_store_inventory } }) =>
                pickup_store_inventory.boss_available
        );
        const includeDateValue = bossAvailableDates.some(item => item);

        if (!includeDateValue) return DEFAULT_VALUE;

        const convertedBossAvailableDates = bossAvailableDates
            .filter(item => item)
            .map(item => dayjs(item));

        return dayjs.min(convertedBossAvailableDates).format('DD MMMM');
    }, [productList]);

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
                await updateItemQuantity({
                    variables: {
                        cartId,
                        itemId: id,
                        quantity
                    }
                });
            } catch {
                // Error is logged by apollo link - no need to double log.
            }
        },
        [cartId, updateItemQuantity]
    );

    const handleProceedToCheckout = useCallback(() => {
        closeDrawer();
        history.push('/checkout');
    }, [history, closeDrawer]);

    const derivedErrorMessage = useMemo(
        () => deriveErrorMessage([removeItemError, updateItemQuantityError]),
        [removeItemError, updateItemQuantityError]
    );

    const toggleMobileDetailed = useCallback(() => {
        setIsMobileDetailed(prevState => !prevState);
    }, [setIsMobileDetailed]);

    const togglePromoCodeInputVisible = useCallback(() => {
        setIsPromoCodeInputVisible(prevState => !prevState);
    }, [setIsPromoCodeInputVisible]);

    // console.log(discountsData,'discountsData')

    const sortedDiscounts = discountsData?.slice().sort((a, b) => {
        const isAPromoCode = Object.values(a)[0].is_promo_code;
        const isBPromoCode = Object.values(b)[0].is_promo_code;

        if (isAPromoCode && !isBPromoCode) {
            return 1;
        } else if (!isAPromoCode && isBPromoCode) {
            return -1;
        } else {
            return 0;
        }
    });

    // On component unmount - close drawer
    useEffect(() => {
        return closeDrawer;
    }, [closeDrawer]);

    // Scrolls up after promo code section is opened (for mobile)
    useEffect(() => {
        isPromoCodeInputVisible &&
            miniCartContentRef.current.scrollBy({
                top: 80,
                left: 0,
                behavior: 'smooth'
            });
    }, [isPromoCodeInputVisible, miniCartContentRef]);

    useEffect(() => {
        if (miniCartData?.cart) {
            if (isOpen && !prevOpen.current) {
                dispatch({
                    type: 'VIEW_CART',
                    payload: miniCartData.cart
                });
            }

            prevOpen.current = isOpen;
        }
    }, [dispatch, isOpen, miniCartData]);

    return {
        handleCloseMiniCart,
        isOpen,
        errorMessage: derivedErrorMessage,
        handleProceedToCheckout,
        handleRemoveItem,
        handleUpdateItemQuantity,
        loading:
            miniCartLoading ||
            (removeItemCalled && removeItemLoading) ||
            updateItemQuantityLoading ||
            (updateItemQuantityCalled && updateItemQuantityLoading) ||
            isCartUpdating,
        productList,
        isIncludeNotAvailableProducts,
        hasOutOfStockItem,
        bossAvailableDate,
        subTotal,
        grandTotal,
        youSave,
        totalQuantity,
        configurableThumbnailSource,
        storeUrlSuffix,
        isMobileDetailed,
        toggleMobileDetailed,
        isPromoCodeInputVisible,
        togglePromoCodeInputVisible,
        setIsCartUpdating,
        storeConfig,
        sortedDiscounts,
        isPickupStoreDataIsLoaded,
        subTotalWithoutSale,
        pickupStoreData: {
            city: pickupStoreCity,
            regionCode: pickupStoreRegionCode,
            allowPickup: pickupStoreAllowPickup
        },
        miniCartData
    };
};
