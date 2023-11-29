import {
    ORDER_ITEM_STATUS_CODES,
    COMPLETED_ORDER_ITEM_STATUS_CODES
} from '@app-constants';
import { useMemo } from 'react';

const nonCancelledItemStatuses = [
    ...COMPLETED_ORDER_ITEM_STATUS_CODES,
    ORDER_ITEM_STATUS_CODES.ready_for_pickup
];

export const useCancelledItemAmount = ({ items = [] }) => {
    const canceledItemsPriceAndDiscountValues = useMemo(
        () =>
            (items || []).reduce(
                (value, item) => {
                    const {
                        qty_picked,
                        price_incl_tax,
                        quantity_ordered,
                        item_status,
                        discounts
                    } = item;

                    const qtyPicked = nonCancelledItemStatuses.includes(
                        item_status
                    )
                        ? qty_picked || 0
                        : quantity_ordered;

                    const qtyCancelled =
                        item_status === ORDER_ITEM_STATUS_CODES.cancelled
                            ? quantity_ordered
                            : quantity_ordered - qtyPicked;

                    const cancelledPrice = price_incl_tax.value * qtyCancelled;

                    const cancelledDiscount =
                        (discounts.reduce(
                            (total, discount) => total + discount.amount.value,
                            0
                        ) /
                            quantity_ordered) *
                        qtyCancelled;

                    return {
                        price: value.price + cancelledPrice,
                        discount: value.discount + cancelledDiscount
                    };
                },
                { price: 0, discount: 0 }
            ),
        [items]
    );

    return {
        canceledItemsPriceAndDiscountValues
    };
};
