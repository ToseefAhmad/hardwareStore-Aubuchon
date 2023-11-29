import dayjs from 'dayjs';
import groupBy from 'lodash/groupBy';
import { useMemo } from 'react';

import { usePickupStoreContext } from '@app/context/PickupStore';
import { useStoreConfig } from '@app/hooks/useStoreConfig';
import { useCheckoutPageContext } from '@app/pages/CheckoutPage/context';

export const formatDate = date => dayjs(date).format('ddd, MMMM D');

export const useOrderItems = () => {
    const [{ currentStepData: orderItemsData }] = useCheckoutPageContext();
    const [currentStore] = usePickupStoreContext();

    const { storeConfig: storeConfigData } = useStoreConfig({
        fields: ['product_url_suffix']
    });

    const storeUrlSuffix = useMemo(() => storeConfigData?.product_url_suffix, [
        storeConfigData
    ]);

    /**
     * Order items
     */
    const orderItems = useMemo(() => {
        let value = [];

        if (orderItemsData) {
            value = orderItemsData.cart.items;
        }

        return value;
    }, [orderItemsData]);

    const { city, region_code } = currentStore || {};

    /**
     * Grouped order items
     */
    const groupedOrderItems = useMemo(() => {
        const groups = groupBy(orderItems, item => {
            const {
                is_paint_fee,
                linked_parent,
                product: {
                    pickup_store_inventory: {
                        qty,
                        boss_available,
                        bopis_available
                    }
                }
            } = item;

            let result;

            if (qty > 0) {
                let date = dayjs();

                if (bopis_available === 'Tomorrow') {
                    date = date.add(1, 'day');
                } else if (bopis_available.includes('days')) {
                    date = date.add(+bopis_available.match(/\d+/)[0], 'days');
                }

                result = date;
            } else if (is_paint_fee) {
                // Check if the paint fee product has parent
                const linkedParent = orderItems.find(
                    orderItem => orderItem.uid === linked_parent
                );
                if (linkedParent) {
                    const {
                        product: {
                            pickup_store_inventory: {
                                qty: parentQty,
                                boss_available: parent_boss_available,
                                bopis_available: parent_bopis_available
                            }
                        }
                    } = linkedParent;
                    // We have valid parent cart item, so rerun the same checks for it
                    if (parentQty > 0) {
                        let date = dayjs();

                        if (parent_bopis_available === 'Tomorrow') {
                            date = date.add(1, 'day');
                        } else if (parent_bopis_available.includes('days')) {
                            date = date.add(
                                +parent_bopis_available.match(/\d+/)[0],
                                'days'
                            );
                        }
                        result = date;
                    } else {
                        result = dayjs(parent_boss_available);
                    }
                } else {
                    // Fallback to show as today
                    result = dayjs();
                }
            } else {
                result = dayjs(boss_available);
            }

            return result.format('MM/DD/YYYY');
        });

        return Object.keys(groups)
            .sort((a, b) => {
                const dateA = dayjs(a);
                const dateB = dayjs(b);
                let result;

                if (dateA.isSame(dateB)) {
                    result = 0;
                } else {
                    result = dateA.isBefore(dateB) ? -1 : 1;
                }

                return result;
            })
            .reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: groups[key]
                }),
                {}
            );
    }, [orderItems]);

    return {
        city,
        region_code,
        groupedOrderItems,
        formatDate,
        storeUrlSuffix
    };
};
