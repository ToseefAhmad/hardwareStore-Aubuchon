import { useLazyQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

import { useWindowSize } from '@magento/peregrine';

import operations from '@app/components/MiniCart/ProductList/item.gql';
import { useTailwindContext } from '@app/context/tailwind';
import { getCartItemProductVariant } from '@app/utils/configurableProduct';

export const useItem = ({
    quantity,
    product,
    configurable_options,
    customizable_options,
    is_paint_fee,
    prices
}) => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const [getPaintColors, { data: paintColorsData }] = useLazyQuery(
        operations.getProductPaintColorsQuery
    );

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

    const regularPrice = useMemo(() => {
        let pricePerItem =
            product.price_range.maximum_price.regular_price.value;
        if (is_paint_fee) pricePerItem = prices.price.value;
        if (variant)
            pricePerItem =
                variant.product.price_range.maximum_price.regular_price.value;

        return pricePerItem;
    }, [product, is_paint_fee, prices, variant]);

    const regularTotalPrice = useMemo(() => regularPrice * quantity, [
        regularPrice,
        quantity
    ]);

    const totalPriceWithDiscount = useMemo(() => {
        return prices.price.value * quantity - prices.total_item_discount.value;
    }, [prices, quantity]);

    const priceWithDiscount = useMemo(() => totalPriceWithDiscount / quantity, [
        totalPriceWithDiscount,
        quantity
    ]);

    const isDiscount = useMemo(() => {
        return regularTotalPrice !== totalPriceWithDiscount;
    }, [regularTotalPrice, totalPriceWithDiscount]);

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    return {
        regularPrice,
        regularTotalPrice,
        priceWithDiscount,
        totalPriceWithDiscount,
        isDiscount,
        isMobile
    };
};
