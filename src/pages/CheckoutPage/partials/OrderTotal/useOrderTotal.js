import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { useCheckoutPageContext } from '../../context';

import { priceFormatter } from '@app/utils/priceFormatter';

const flattenData = data => {
    if (!data) return {};

    return {
        subtotal: data.cart.prices.subtotal_excluding_tax,
        grandTotal: data.cart.prices.grand_total,
        discounts: data.cart.prices.discounts,
        taxes: data.cart.prices.applied_taxes,
        items: data.cart.items,
        appliedBalance: data.cart.applied_store_credit.applied_balance,
        currentBalance: data.cart.applied_store_credit.current_balance || {
            value: 0
        }
    };
};

const DEFAULT_AMOUNT = {
    currency: 'USD',
    value: 0
};

/**
 * Reduces discounts array into a single amount.
 *
 * @param {Array} discounts
 */
const getTotalDiscount = (discounts = []) => {
    // discounts from data can be null
    if (!discounts || !discounts.length) {
        return DEFAULT_AMOUNT;
    } else {
        return {
            currency: discounts[0].amount.currency,
            value: discounts.reduce(
                (acc, discount) =>
                    acc +
                    (discount.label !== 'Employee Discount'
                        ? discount.amount.value
                        : null),
                0
            )
        };
    }
};

const getEmployeeDiscount = (discounts = []) => {
    // discounts from data can be null
    if (!discounts || !discounts.length) {
        return null;
    } else {
        return (
            discounts.find(discount => {
                return discount.label === 'Employee Discount';
            })?.amount.value || null
        );
    }
};

/**
 * Reduces applied tax amounts into a single amount.
 *
 * @param {Array} applied_taxes
 */
const getEstimatedTax = (applied_taxes = []) => {
    return {
        value: applied_taxes.reduce((acc, tax) => acc + tax.amount.value, 0)
    };
};

export const useOrderTotal = () => {
    const { locale } = useIntl();
    const [{ activeTabKey, currentStepData }] = useCheckoutPageContext();

    const {
        grandTotal: { currency, value: grandTotalValue },
        subtotal: { value: subTotalValue },
        discounts,
        taxes,
        items,
        appliedBalance: { value: appliedRewards },
        currentBalance: { value: availableRewards }
    } = flattenData(currentStepData);

    const { value: discountValue } = useMemo(
        () => getTotalDiscount(discounts),
        [discounts]
    );
    const { value: taxesValue } = useMemo(() => getEstimatedTax(taxes), [
        taxes
    ]);

    const catalogDiscount = useMemo(() => {
        let value = 0;

        items.forEach(item => {
            const {
                quantity,
                product: {
                    price_range: {
                        maximum_price: {
                            discount: { amount_off }
                        }
                    }
                }
            } = item;
            value += quantity * amount_off;
        });

        return value;
    }, [items]);

    const formatPrice = useCallback(
        (value, displayZeroValue) => {
            return value || displayZeroValue
                ? priceFormatter({
                      locale,
                      currency,
                      value
                  })
                : null;
        },
        [currency, locale]
    );

    /**
     * Order prices values
     */
    const prices = useMemo(() => {
        const employeeDiscount = getEmployeeDiscount(discounts);
        const totalDiscount =
            catalogDiscount + discountValue + appliedRewards + employeeDiscount;

        const promoCodes = discounts?.map((discount, index) => {
            return {
                [`promoCode${index + 1}`]: {
                    label: discount.label,
                    value: formatPrice(-discount.amount.value),
                    shouldBeGreen: true,
                    is_promo_code: discount.is_promo_code
                }
            };
        });

        promoCodes?.sort((a, b) => {
            const { is_promo_code: isAPromoCode } = Object.values(a)[0];
            const { is_promo_code: isBPromoCode } = Object.values(b)[0];

            return isAPromoCode && !isBPromoCode
                ? 1
                : !isAPromoCode && isBPromoCode
                ? -1
                : 0;
        });

        const promoCodesObject = discounts
            ? Object.assign({}, ...promoCodes)
            : {};

        return {
            subtotal: {
                label: 'Subtotal',
                value: formatPrice(subTotalValue + catalogDiscount)
            },
            pickup: {
                label: 'Store Pickup',
                value: 'FREE',
                shouldBeGreen: true
            },
            rewards: {
                label: 'Rewards',
                value: formatPrice(-availableRewards),
                shouldBeGreen: true
            },
            ...promoCodesObject,
            tax: {
                label: 'Tax',
                value: formatPrice(taxesValue)
            },
            total: {
                label: 'Order Total',
                value: formatPrice(grandTotalValue, true)
            },
            youSave: {
                label: 'You’re saving ',
                value: formatPrice(-totalDiscount),
                shouldBeGreen: true
            }
        };
    }, [
        appliedRewards,
        availableRewards,
        catalogDiscount,
        discountValue,
        discounts,
        formatPrice,
        grandTotalValue,
        subTotalValue,
        taxesValue
    ]);

    const isLineItemsAvailable =
        prices?.promoCode?.value ||
        prices.youSave.value ||
        prices.employeeDiscount?.value ||
        prices.rewards.value ||
        prices.subtotal.value ||
        prices.tax.value;

    return {
        activeTabKey,
        prices,
        isLineItemsAvailable
    };
};
