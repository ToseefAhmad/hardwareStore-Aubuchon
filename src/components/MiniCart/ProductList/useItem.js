import { useLazyQuery } from '@apollo/client';
import { useState, useEffect, useCallback, useMemo } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { getCartItemProductVariant } from '@app/utils/configurableProduct';

import operations from './item.gql';

export const useItem = props => {
    const {
        uid,
        loading,
        handleRemoveItem,
        handleUpdateItemQuantity,
        product,
        prices,
        quantity,
        configurable_options,
        customizable_options,
        is_paint_fee
    } = props;

    const [{ drawer }, { closeDrawer }] = useAppContext();

    const [
        getPaintColors,
        {
            data: paintColorsData,
            loading: paintColorsLoading,
            called: paintColorsCalled
        }
    ] = useLazyQuery(operations.getProductPaintColorsQuery);

    useEffect(() => {
        if (customizable_options) {
            getPaintColors();
        }
    }, [getPaintColors, customizable_options]);

    const variant = useMemo(() => {
        if (!paintColorsData?.paintColors) return;

        return getCartItemProductVariant({
            paintColors: paintColorsData.paintColors,
            configurable_options,
            customizable_options,
            product
        });
    }, [paintColorsData, product, configurable_options, customizable_options]);

    const { price_range: priceRange } = product;

    const [isLoading, setIsLoading] = useState(false);
    const [isQuantityInputExpanded, setIsQuantityInputExpanded] = useState(
        false
    );

    const removeItem = useCallback(() => {
        setIsLoading(true);
        handleRemoveItem(uid);
        if (drawer === 'precart') {
            closeDrawer();
        }
    }, [handleRemoveItem, uid, drawer, closeDrawer]);

    const updateItemQuantity = useCallback(
        quantity => {
            setIsLoading(true);
            handleUpdateItemQuantity(quantity, uid);
        },
        [handleUpdateItemQuantity, uid]
    );

    // quantity form collapses back after some time of being opened
    const expandQuantityInput = useCallback(() => {
        setIsQuantityInputExpanded(true);
        setTimeout(() => {
            setIsQuantityInputExpanded(false);
        }, 4000);
    }, [setIsQuantityInputExpanded]);

    useEffect(() => {
        !loading && setIsLoading(false);
    }, [loading]);

    const totalPrice = useMemo(() => {
        let pricePerItem = priceRange.maximum_price.regular_price.value;
        if (is_paint_fee) pricePerItem = prices.price.value;
        if (variant)
            pricePerItem =
                variant.product.price_range.maximum_price.regular_price.value;

        return pricePerItem * quantity;
    }, [priceRange, quantity, is_paint_fee, prices, variant]);

    const totalPriceWithDiscount = useMemo(() => {
        return prices.price.value * quantity - prices.total_item_discount.value;
    }, [prices, quantity]);

    const isDiscount = useMemo(() => {
        return totalPrice !== totalPriceWithDiscount;
    }, [totalPrice, totalPriceWithDiscount]);

    const isOutOfStock = useMemo(
        () => product.stock_status === 'OUT_OF_STOCK' && !is_paint_fee,
        [product.stock_status, is_paint_fee]
    );

    return {
        isLoading,
        arePaintColorsLoading: paintColorsCalled && paintColorsLoading,
        removeItem,
        updateItemQuantity,
        isQuantityInputExpanded,
        expandQuantityInput,
        totalPrice,
        totalPriceWithDiscount,
        isDiscount,
        configured_variant: variant?.product,
        maxQty:
            variant?.product?.pickup_store_inventory?.qty ??
            (product.pickup_store_inventory?.qty ||
                (product.pickup_store_inventory?.boss_eligible &&
                    product.pickup_store_inventory?.boss_qty)),
        isOutOfStock
    };
};
