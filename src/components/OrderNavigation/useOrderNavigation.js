import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { priceFormatter } from '@app/utils/priceFormatter';

/**
 * OrderNavigation component talon
 *
 * @param {OrderInfo} orderInfo
 * @param {number} canceledItemsPriceValue
 */
export const useOrderNavigation = ({
    orderInfo,
    canceledItemsPriceAndDiscountValues
}) => {
    const { locale } = useIntl();

    /**
     * Order number value
     */
    const orderNumber = orderInfo.number;

    /**
     * Formatted order date value
     */
    const date = useMemo(
        () => dayjs(orderInfo.order_date).format('MMMM D, YYYY'),
        [orderInfo]
    );

    /**
     * Formatted order total price value
     */
    const total = useMemo(
        () =>
            priceFormatter({
                locale,
                currency: orderInfo.total.grand_total.currency,
                value:
                    orderInfo.total.grand_total.value -
                    canceledItemsPriceAndDiscountValues.price +
                    canceledItemsPriceAndDiscountValues.discount
            }),
        [locale, orderInfo, canceledItemsPriceAndDiscountValues]
    );

    return {
        date,
        orderNumber,
        total
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
 * @typedef OrderInfoTotal
 *
 * @property {Money} grand_total
 */

/**
 *  @typedef OrderInfo
 *
 *  @property {string} order_date
 *  @property {string} number
 *  @property {OrderInfoTotal} total
 */
