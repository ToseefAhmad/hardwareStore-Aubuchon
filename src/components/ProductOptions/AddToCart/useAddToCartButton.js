import { useMutation, useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import { useToasts } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import {
    UPDATE_QUANTITY_MUTATION,
    MINI_CART_QUERY
} from '@app/components/MiniCart/miniCart.gql';
import { ADD_ITEM } from '@app/components/ProductCard/AddToCart/addToCart.gql';
import { useOptionsContext } from '@app/components/ProductOptions/optionsContext';
import {
    adjustErrorMessageForToast,
    errorEventTypesToMap
} from '@app/components/ToastContainer';
import { useAddToCartSession } from '@app/hooks/useLogRocket';
import { getCartItemProductVariant } from '@app/utils/configurableProduct';

export const useAddToCartButton = ({ variant, selectedColor }) => {
    const [{ drawer }, { toggleDrawer }] = useAppContext();
    const [quantity, setQuantity] = useState();
    const [isQuantityVisible, setIsQuantityVisible] = useState(false);
    const [
        addToCart,
        { error: addToCartError, loading: addToCartIsLoading }
    ] = useMutation(ADD_ITEM);

    const [, { addToast }] = useToasts();
    const { color, product } = useOptionsContext();

    const [
        { cartId, createCart },
        {
            actions: { addLastCartItem }
        }
    ] = useCartContext();

    const { initAddToCartSession: initLogRocket } = useAddToCartSession();

    const { data: miniCartData } = useQuery(MINI_CART_QUERY, {
        variables: { cartId },
        skip: !cartId
    });

    // We need cart item for getting uid for update quantity operation
    const cartItem = useMemo(() => {
        if (miniCartData?.cart?.items) {
            return (
                miniCartData.cart.items.find(cartItem => {
                    const cartItemVariant = getCartItemProductVariant({
                        color,
                        configurable_options: cartItem.configurable_options,
                        customizable_options: cartItem.customizable_options,
                        product: cartItem.product
                    });

                    const cartOptionLabel = cartItem?.customizable_options?.[0]
                        .values?.length
                        ? cartItem?.customizable_options?.[0]?.values[0]
                              .value &&
                          parse(
                              cartItem.customizable_options[0].values[0].value
                          )
                        : null;

                    return (
                        cartItemVariant?.product?.uid ===
                            variant?.product?.uid &&
                        selectedColor?.label === cartOptionLabel
                    );
                }) || {}
            );
        }

        return {};
    }, [
        miniCartData?.cart?.items,
        variant?.product?.uid,
        selectedColor?.label,
        color
    ]);

    const timeout = useRef();
    const timer = useCallback(() => {
        timeout.current && clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            setIsQuantityVisible(false);
        }, 3000);
    }, []);

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

    const colorOption = useMemo(() => {
        let colorOption = null;
        if (product?.options.length) {
            colorOption = product?.options.find(
                option => option.title === 'Color'
            );
        }
        return colorOption;
    }, [product?.options]);

    const attributeIdToValuesMap = useMemo(() => {
        const map = new Map();
        const options = product.configurable_options || [];
        for (const { attribute_code, values } of options) {
            map.set(attribute_code, values);
        }
        return map;
    }, [product.configurable_options]);
    const selectedOptionsArray = useMemo(() => {
        const selectedOptions = [];

        variant.attributes.forEach(value => {
            const values = attributeIdToValuesMap.get(value.code);

            const selectedValue = values.find(
                item => item.value_index === value.value_index
            );

            if (selectedValue) {
                selectedOptions.push(selectedValue.uid);
            }
        });
        return selectedOptions;
    }, [attributeIdToValuesMap, variant]);

    const handleAddToCart = useCallback(async () => {
        try {
            initLogRocket();
        } catch (e) {
            console.error(e);
        }

        const enteredOptions =
            selectedColor.label && colorOption
                ? {
                      entered_options: [
                          {
                              uid: colorOption.uid,
                              value: selectedColor.label
                          }
                      ]
                  }
                : {
                      entered_options: []
                  };

        try {
            showQuantityInput();
            const currentCartId = cartId || (await createCart());
            const { data } = await addToCart({
                variables: {
                    cartId: currentCartId,
                    cartItem: {
                        quantity: 1,
                        ...enteredOptions,
                        sku: product?.sku,
                        selected_options: selectedOptionsArray
                    }
                }
            });
            if (drawer !== 'precart') {
                let lastAddedProduct = data.addProductsToCart.cart.items.at(-1);
                if (lastAddedProduct.is_paint_fee) {
                    lastAddedProduct = data.addProductsToCart.cart.items.at(-2);
                }
                addLastCartItem.receive(lastAddedProduct);
                toggleDrawer('precart');
            }
        } catch (error) {
            // Mutation errors are handled in toasts
        }
    }, [
        selectedColor.label,
        colorOption,
        initLogRocket,
        addToCart,
        cartId,
        product?.sku,
        selectedOptionsArray,
        createCart,
        showQuantityInput,
        drawer,
        toggleDrawer,
        addLastCartItem
    ]);

    const [updateQuantity, { error: updateQuantityError }] = useMutation(
        UPDATE_QUANTITY_MUTATION
    );

    const handleUpdateItemQuantity = useCallback(
        async (quantity, id, status) => {
            try {
                const {
                    data: { updateCartItems }
                } = await updateQuantity({
                    variables: {
                        cartId,
                        itemId: id,
                        quantity
                    }
                });
                if (quantity !== 0 && drawer !== 'precart') {
                    const lastAddedProduct = updateCartItems.cart.items.find(
                        product => product.uid === id
                    );
                    addLastCartItem.receive(lastAddedProduct);
                    if (status === 'increment') {
                        toggleDrawer('precart');
                    }
                }
            } catch {
                // Mutation errors are handled in toasts
            }
        },
        [cartId, updateQuantity, addLastCartItem, drawer, toggleDrawer]
    );

    const [updateItemQuantityQueue, setUpdateItemQuantityQueue] = useState();
    const updateItemQuantity = useCallback(
        (quantity, status) => {
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

    const derivedErrorMessage = useMemo(
        () => deriveErrorMessage([addToCartError, updateQuantityError]),
        [addToCartError, updateQuantityError]
    );

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
        handleAddToCart,
        isQuantityVisible,
        updateItemQuantity,
        addToCartIsLoading,
        showQuantityInput,
        quantity,
        timer
    };
};
