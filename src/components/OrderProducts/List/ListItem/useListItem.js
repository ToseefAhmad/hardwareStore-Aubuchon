import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
    COMPLETED_ORDER_ITEM_STATUS_CODES,
    ORDER_ITEM_STATUS_CODES
} from '@app/constants';
import { priceFormatter } from '@app/utils/priceFormatter';

const hasItemProgressed = item =>
    [
        ORDER_ITEM_STATUS_CODES.ready_for_pickup,
        ...COMPLETED_ORDER_ITEM_STATUS_CODES
    ].includes(item?.item_status);

/**
 * OrderProductsListItem component talon
 *
 * @param {OrderProductItem} itemData
 * @param {boolean} productUrlSuffix
 * @param {function} openExpanded
 */
export const useListItem = ({ itemData, productUrlSuffix, openExpanded }) => {
    const { locale } = useIntl();

    const itemHasProgressed = useMemo(() => hasItemProgressed(itemData), [
        itemData
    ]);

    const isItemCancelled = useMemo(() => {
        const isCanceled =
            itemData.item_status === ORDER_ITEM_STATUS_CODES.cancelled ||
            (itemData.qty_picked === 0 && itemHasProgressed);
        if (isCanceled) {
            openExpanded();
        }
        return isCanceled;
    }, [itemData, itemHasProgressed, openExpanded]);

    const isQtyReduced = useMemo(() => {
        const isQtyReduced =
            itemHasProgressed &&
            !isItemCancelled &&
            itemData.qty_picked !== null &&
            itemData.qty_picked < itemData.quantity_ordered;

        if (isQtyReduced) {
            openExpanded();
        }

        return isQtyReduced;
    }, [isItemCancelled, itemHasProgressed, itemData, openExpanded]);

    /**
     * Order product formatted prices
     */
    const prices = useMemo(() => {
        const {
            price_incl_tax,
            row_total_incl_tax,
            original_price,
            quantity_ordered,
            discounts,
            product_sale_price
        } = itemData;

        const discountPerItem = discounts
            .map(discount => discount?.amount?.value || 0)
            .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
            );

        const subTotal = original_price.value * quantity_ordered;
        const catalogSale =
            original_price.value === product_sale_price.value
                ? 0
                : subTotal - product_sale_price.value * quantity_ordered;

        const allDiscountsSum =
            discountPerItem + catalogSale > subTotal
                ? subTotal
                : discountPerItem + catalogSale;

        return {
            salePrice: priceFormatter({
                locale,
                currency: original_price.currency,
                value: original_price.value
            }),
            subTotal: priceFormatter({
                locale,
                currency: original_price.currency,
                value: subTotal
            }),
            savings: priceFormatter({
                locale,
                currency: price_incl_tax.currency,
                value: allDiscountsSum
            }),
            total: priceFormatter({
                locale,
                currency: row_total_incl_tax.currency,
                value: isItemCancelled ? 0 : subTotal - allDiscountsSum
            })
        };
    }, [isItemCancelled, itemData, locale]);

    /**
     * Product thumbnail url
     */
    const thumbnailUrl = itemData.product_thumbnail.url;

    /**
     * Generated product link
     */
    const productLink = `/${itemData.product_url_key}${productUrlSuffix || ''}`;

    return {
        itemHasProgressed,
        isItemCancelled,
        isQtyReduced,
        prices,
        thumbnailUrl,
        productLink
    };
};

/**
 * JSDoc type definitions
 */

/**
 * @typedef Money
 *
 * @property {string} currency
 * @property {number} value
 */

/**
 * @typedef Discount
 *
 * @property {Money} amount
 */

/**
 *  @typedef OrderProductItem
 *
 *  @property {string} product_url_key
 *  @property {Object} product_thumbnail
 *  @property {string} product_thumbnail.url
 *  @property {Money} tax_amount
 *  @property {Money} price_incl_tax
 *  @property {Money} row_total_incl_tax
 *  @property {Money} original_price
 *  @property {Money} product_sale_price
 *  @property {Discount[]} discounts
 */
