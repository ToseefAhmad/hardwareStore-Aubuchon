import {
    ORDER_STATUS_CODES,
    ORDER_ITEM_STATUS_CODES,
    COMPLETED_ORDER_ITEM_STATUS_CODES,
    ORDER_GROUP_STATUS_INFO
} from '@app-constants';
import { useMemo } from 'react';

import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';

import { useCancelledItemAmount } from './useCancelledItemAmount';

/**
 * Returns status for order items group
 */
export const getItemGroupTitle = (items, orderInfo) => {
    if (!isObjectEmpty(orderInfo)) {
        if (orderInfo.status_code === ORDER_STATUS_CODES.canceled) {
            return ORDER_GROUP_STATUS_INFO.canceled;
        }
    }

    if (items) {
        const itemStatuses = items.map(item => item.item_status);

        if (itemStatuses.includes(ORDER_ITEM_STATUS_CODES.ready_for_pickup))
            return ORDER_GROUP_STATUS_INFO.ready_for_pickup;

        if (
            COMPLETED_ORDER_ITEM_STATUS_CODES.find(item =>
                itemStatuses.includes(item)
            )
        )
            return ORDER_GROUP_STATUS_INFO.complete;
    }

    return ORDER_GROUP_STATUS_INFO.default;
};

/**
 * OrderViewPage component talon
 */
export const useOrderDetails = ({ orderData, storeConfig }) => {
    /**
     * Order information
     */
    const orderInfo = useMemo(() => {
        let value = {};

        if (orderData && storeConfig) {
            const { product_url_suffix } = storeConfig;

            value = {
                ...orderData,
                product_url_suffix
            };
        }

        return value;
    }, [orderData, storeConfig]);

    /**
     * Divide order items into groups by delivery_date
     */
    const itemGroups = useMemo(() => {
        const groupsMap = new Map();
        orderInfo.items &&
            orderInfo.items.forEach(item => {
                const deliveryDate = item.delivery_date || 'in-stock';
                if (groupsMap.has(deliveryDate)) {
                    const items = groupsMap.get(deliveryDate);
                    groupsMap.set(deliveryDate, [...items, item]);
                    return;
                }
                groupsMap.set(deliveryDate, [item]);
            });

        const groups = [];
        groupsMap.forEach((value, key) => {
            const status = getItemGroupTitle(value, orderInfo);
            groups.push({ key, items: value, status });
        });

        return groups;
    }, [orderInfo]);

    const { canceledItemsPriceAndDiscountValues } = useCancelledItemAmount({
        items: orderInfo?.items
    });

    return {
        canceledItemsPriceAndDiscountValues,
        itemGroups,
        orderInfo
    };
};
