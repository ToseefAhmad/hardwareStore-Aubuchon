import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useToasts } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import {
    UPDATE_QUANTITY_MUTATION,
    MINI_CART_QUERY
} from '@app/components/MiniCart/miniCart.gql';
import { MODAL_NAMES } from '@app/components/SimpleModal';
import {
    adjustErrorMessageForToast,
    errorEventTypesToMap
} from '@app/components/ToastContainer';
import { TYPES } from '@app/components/WarningDialog';
import { usePickupStoreContext } from '@app/context/PickupStore';
import { useAddToCartSession } from '@app/hooks/useLogRocket';

import { ADD_ITEM } from './addToCart.gql';

/**
 * @param {String} props.item.uid - uid of item
 * @param {String} props.item.name - name of item
 * @param {String} props.item.stock_status - stock status of item
 * @param {String} props.item.__typename - product type
 * @param {String} props.item.url_key - item url key
 * @param {String} props.item.sku - item sku
 *
 * @returns {Object} cartItem
 * @returns {Function} handleAddToCart
 * @returns {Boolean} isDisabled
 * @returns {Boolean} isInStock
 * @returns {Boolean} isQuantityVisible
 * @returns {String} productType
 * @returns {Function} updateItemQuantity
 * @returns {Boolean} updateQuantityIsLoading
 *
 */
const UNSUPPORTED_PRODUCT_TYPES = [
    'VirtualProduct',
    'BundleProduct',
    'GroupedProduct',
    'DownloadableProduct'
];

const PRODUCT_TYPE_LOCATION_TYPES = {
    lastAdded: 'lastAdded',
    lastAddedRecommendation: 'lastAddedRecommendation'
};

export const useAddToCartButton = ({
    item,
    urlSuffix,
    cartItemUid,
    quantityIsVisible,
    productTypeLocation
}) => {
    const [
        { drawer },
        {
            actions: { toggleModal },
            toggleDrawer,
            closeDrawer
        }
    ] = useAppContext();

    const [{ allow_pickup }] = usePickupStoreContext();

    const [addToCartIsLoading, setAddToCartIsLoading] = useState(false);
    const [isQuantityVisible, setIsQuantityVisible] = useState(
        quantityIsVisible
    );

    const [quantity, setQuantity] = useState();

    const history = useHistory();
    const [
        { cartId, createCart },
        {
            actions: { addLastCartItem }
        }
    ] = useCartContext();
    const [, { dispatch }] = useEventingContext();
    const [addToCart, { error: addToCartError }] = useMutation(ADD_ITEM);

    const [, { addToast }] = useToasts();

    const { initAddToCartSession: initLogRocket } = useAddToCartSession();

    const isInStock = item.stock_status === 'IN_STOCK';
    const productType = item.__typename;
    const isUnsupportedProductType = UNSUPPORTED_PRODUCT_TYPES.includes(
        productType
    );
    const isDisabled =
        addToCartIsLoading || !isInStock || isUnsupportedProductType;

    const { data: miniCartData } = useQuery(MINI_CART_QUERY, {
        variables: { cartId },
        skip: !cartId
    });

    // We need cart item for getting uid for update quantity operation
    const cartItem = useMemo(() => {
        if (miniCartData) {
            return (
                miniCartData.cart?.items.find(cartItem => {
                    return cartItemUid
                        ? cartItem.uid === cartItemUid
                        : cartItem.product.uid === item.uid;
                }) || {}
            );
        }

        return {};
    }, [miniCartData, item.uid, cartItemUid]);

    const timeout = useRef();
    const timer = useCallback(() => {
        timeout.current && clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            if (!quantityIsVisible) {
                setIsQuantityVisible(false);
            }
        }, 3000);
    }, [quantityIsVisible]);

    useEffect(() => {
        return () => {
            clearTimeout(timeout.current);
        };
    }, []);

    const showQuantityInput = useCallback(() => {
        setQuantity(cartItem?.quantity);
        setIsQuantityVisible(true);
        timer();
    }, [cartItem?.quantity, timer]);

    const handleSimpleProductAddToCart = useCallback(async () => {
        showQuantityInput();
        setAddToCartIsLoading(true);

        try {
            const currentCartId = cartId || (await createCart());
            const { data: addToCartResult } = await addToCart({
                variables: {
                    cartId: currentCartId,
                    cartItem: {
                        quantity: 1,
                        entered_options: [
                            {
                                uid: item.uid,
                                value: item.name
                            }
                        ],
                        sku: item.sku
                    }
                }
            });

            dispatch({
                type: 'ADD_TO_CART',
                payload: {
                    ...addToCartResult.addProductsToCart.cart,
                    added: {
                        ...item,
                        quantity: 1
                    }
                }
            });

            // get last added item, store in redux and open precart
            if (drawer !== 'precart') {
                const lastAddedProduct = addToCartResult.addProductsToCart.cart.items.find(
                    product => item.uid === product.product.uid
                );
                addLastCartItem.receive(lastAddedProduct);
                toggleDrawer('precart');
            }

            setAddToCartIsLoading(false);
        } catch (error) {
            // Mutation errors are handled in toasts
        }
    }, [
        addToCart,
        cartId,
        createCart,
        dispatch,
        item,
        showQuantityInput,
        drawer,
        addLastCartItem,
        toggleDrawer
    ]);

    const handleAddToCart = useCallback(async () => {
        try {
            initLogRocket();
        } catch (e) {
            console.error(e);
        }

        try {
            if (productType === 'SimpleProduct') {
                if (
                    item?.pickup_store_inventory?.qty <= 0 &&
                    item?.pickup_store_inventory?.boss_available
                ) {
                    toggleModal({
                        identifier: MODAL_NAMES.warning,
                        props: {
                            handleAddToCart: handleSimpleProductAddToCart,
                            product: item,
                            type: TYPES.specialOrder
                        }
                    });

                    return;
                }

                handleSimpleProductAddToCart();
            } else if (productType === 'ConfigurableProduct') {
                let urlPrefix = '/';
                if (item.url_key.startsWith('/', 0)) {
                    urlPrefix = '';
                }
                history.push(`${urlPrefix}${item.url_key}${urlSuffix || ''}`);
            } else {
                console.warn('Unsupported product type unable to handle.');
            }
        } catch {
            // Mutation errors are handled in toasts
        }
    }, [
        initLogRocket,
        productType,
        item,
        handleSimpleProductAddToCart,
        toggleModal,
        history,
        urlSuffix
    ]);

    const [updateQuantity, { error: updateQuantityError }] = useMutation(
        UPDATE_QUANTITY_MUTATION
    );

    const handleUpdateItemQuantity = useCallback(
        async (quantity, id, status) => {
            try {
                if (quantity === 0) {
                    dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: {
                            currencyCode:
                                miniCartData?.cart?.prices?.grand_total
                                    ?.currency,
                            items: [cartItem]
                        }
                    });
                }
                const { data } = await updateQuantity({
                    variables: {
                        cartId,
                        itemId: id,
                        quantity
                    }
                });

                if (
                    productTypeLocation !==
                        PRODUCT_TYPE_LOCATION_TYPES.lastAddedRecommendation &&
                    drawer !== 'minicart'
                ) {
                    const lastAddedProduct = data.updateCartItems.cart.items.find(
                        product => id === product.uid
                    );
                    addLastCartItem.receive(lastAddedProduct);
                    if (status === 'increment') {
                        toggleDrawer('precart');
                    }
                }
                if (
                    productTypeLocation ===
                        PRODUCT_TYPE_LOCATION_TYPES.lastAdded &&
                    quantity === 0
                ) {
                    closeDrawer();
                }
            } catch (error) {
                // Mutation errors are handled in toasts
            }
        },
        [
            updateQuantity,
            cartId,
            dispatch,
            miniCartData?.cart?.prices?.grand_total?.currency,
            cartItem,
            addLastCartItem,
            toggleDrawer,
            closeDrawer,
            productTypeLocation,
            drawer
        ]
    );

    const [updateItemQuantityQueue, setUpdateItemQuantityQueue] = useState();
    const updateItemQuantity = useCallback(
        (quantity, status = 'decrement') => {
            if (cartItem.uid) {
                // Only trigger if we have this item in cart
                handleUpdateItemQuantity(
                    quantity,
                    cartItem.uid,
                    status
                ).catch();
                setUpdateItemQuantityQueue(undefined);
            } else {
                // Keep track of quantity to trigger it after initial add to cart is done
                setUpdateItemQuantityQueue(quantity);
            }
        },
        [handleUpdateItemQuantity, cartItem.uid]
    );

    useEffect(() => {
        if (updateItemQuantityQueue > 0 && !addToCartIsLoading) {
            // If qty increase happened while initial add to cart was processing, restart it
            updateItemQuantity(updateItemQuantityQueue);
        }
    }, [addToCartIsLoading, updateItemQuantity, updateItemQuantityQueue]);

    const derivedErrorMessage = useMemo(() => {
        return deriveErrorMessage([addToCartError, updateQuantityError]);
    }, [addToCartError, updateQuantityError]);

    useEffect(() => {
        if (derivedErrorMessage) {
            const message = adjustErrorMessageForToast({
                message: derivedErrorMessage,
                eventType: errorEventTypesToMap.ADD_OR_UPDATE_CART_ITEM
            });

            addToast({
                type: 'error',
                message
            });
        }
    }, [derivedErrorMessage, addToast]);

    return {
        cartItem,
        quantity,
        handleAddToCart,
        isDisabled,
        isInStock,
        isQuantityVisible,
        productType,
        updateItemQuantity,
        showQuantityInput,
        addToCartIsLoading,
        timer,
        allow_pickup
    };
};
