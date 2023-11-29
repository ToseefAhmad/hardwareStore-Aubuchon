import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { priceFormatter } from '@app/utils/priceFormatter';

export const useOrderSummarySection = ({
    orderInfo,
    canceledItemsPriceAndDiscountValues
}) => {
    const { locale } = useIntl();

    /**
     * Order formatted prices
     */
    const prices = useMemo(() => {
        const {
            total: { discounts, subtotal, total_tax, reward_amount }
        } = orderInfo;

        const discountsSummary = discounts.reduce(
            (accumulator, { amount: { value } }) => accumulator + value,
            0
        );

        return [
            {
                label: 'Subtotal:',
                value: priceFormatter({
                    locale,
                    currency: subtotal.currency,
                    value:
                        subtotal.value -
                        canceledItemsPriceAndDiscountValues.price
                }),
                display: true
            },
            {
                label: 'Discount:',
                value: priceFormatter({
                    locale,
                    currency: subtotal.currency,
                    value:
                        discountsSummary -
                        canceledItemsPriceAndDiscountValues.discount
                }),
                display:
                    discountsSummary -
                        canceledItemsPriceAndDiscountValues.discount >
                    0
            },
            {
                label: 'Reward Discount:',
                value: priceFormatter({
                    locale,
                    currency: subtotal.currency,
                    value: reward_amount.value
                }),
                display: reward_amount.value > 0
            },
            {
                label: 'You save:',
                value: priceFormatter({
                    locale,
                    currency: subtotal.currency,
                    value:
                        reward_amount.value +
                        (discountsSummary -
                            canceledItemsPriceAndDiscountValues.discount)
                }),
                display:
                    reward_amount.value +
                        (discountsSummary -
                            canceledItemsPriceAndDiscountValues.discount) >
                    0
            },
            {
                label: 'Tax:',
                value: priceFormatter({
                    locale,
                    currency: total_tax.currency,
                    value: total_tax.value
                }),
                display: true
            }
        ];
    }, [orderInfo, locale, canceledItemsPriceAndDiscountValues]);

    return {
        prices
    };
};
