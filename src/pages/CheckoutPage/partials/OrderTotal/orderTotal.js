import classnames from 'classnames';
import React, { useMemo } from 'react';

import { CHECKOUT_STEPS_KEYS } from '../../constants';

import Icon from '@app/components/Icon';
import { Cart } from '@app/components/Icons';

import classes from './orderTotal.module.css';
import { useOrderTotal } from './useOrderTotal';

const OrderTotal = () => {
    const { activeTabKey, prices, isLineItemsAvailable } = useOrderTotal();

    const orderTotals = useMemo(() => {
        return Object.keys(prices)?.map(code => {
            const isPromoCode = prices[code].is_promo_code === true;
            const isTaxesShown = code === 'tax' && activeTabKey !== 3;

            return (
                prices[code].value && (
                    <dl
                        key={code}
                        className={
                            code === 'subtotal' || isTaxesShown
                                ? classes.totalItem
                                : classes.item
                        }
                    >
                        <dt>
                            {isPromoCode && 'Promo Code: '}{' '}
                            <span
                                className={
                                    isPromoCode || code === 'youSave'
                                        ? classes.greenLabel
                                        : null
                                }
                            >
                                {prices[code].label}
                            </span>
                        </dt>
                        <dd
                            className={
                                prices[code].shouldBeGreen
                                    ? classes.greenLabel
                                    : null
                            }
                        >
                            {prices[code].value}
                        </dd>
                    </dl>
                )
            );
        });
    }, [activeTabKey, prices]);

    return (
        <section
            className={classnames(classes.root, {
                [classes.hiddenOnMobile]:
                    activeTabKey !== CHECKOUT_STEPS_KEYS.payment
            })}
        >
            <header className={classes.header}>
                <dl className={classes.headerTotalItem}>
                    <dt className={classes.headerTotalItemTitle}>
                        <Icon
                            classes={{ icon: classes.headerTotalItemIcon }}
                            src={Cart}
                        />
                        {prices.subtotal.label}: (excluding tax)
                    </dt>
                    <dd>{prices.subtotal.value}</dd>
                </dl>
            </header>
            <div
                className={classnames(classes.content, {
                    [classes.lineItems]: isLineItemsAvailable
                })}
            >
                {orderTotals}
            </div>
        </section>
    );
};

export default OrderTotal;
