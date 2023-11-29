import { bool, func, number, shape, string } from 'prop-types';
import React from 'react';

import { navButtons } from '@app/components/Pagination/constants';
import NavButton from '@app/components/Pagination/navButton';

import classes from './orderNavigation.module.css';
import { useOrderNavigation } from './useOrderNavigation';

const OrderNavigation = props => {
    const {
        orderInfo,
        canceledItemsPriceAndDiscountValues,
        handleBack,
        isShowBackButton
    } = props;

    const { date, orderNumber, total } = useOrderNavigation({
        orderInfo,
        canceledItemsPriceAndDiscountValues
    });

    return (
        <div className={classes.root}>
            {isShowBackButton && (
                <NavButton
                    name={navButtons.prevPage.name}
                    active={true}
                    onClick={handleBack}
                    buttonLabel={navButtons.prevPage.buttonLabel}
                    classes={{ root: classes.buttonRoot }}
                />
            )}
            <dl className={classes.item}>
                <dt>Purchase Date:</dt>
                <dd className={classes.value}>{date}</dd>
            </dl>
            <dl className={classes.item}>
                <dt>Order Number:</dt>
                <dd className={classes.value}>#{orderNumber}</dd>
            </dl>
            <dl className={classes.item}>
                <dt>Total:</dt>
                <dd className={classes.total}>{total}</dd>
            </dl>
        </div>
    );
};

OrderNavigation.propTypes = {
    orderInfo: shape({
        order_date: string,
        number: string,
        total: shape({
            currency: string,
            value: number
        })
    }).isRequired,
    handleBack: func,
    isShowBackButton: bool,
    canceledItemsPriceAndDiscountValues: shape({
        price: number.isRequired,
        discount: number.isRequired
    })
};

OrderNavigation.defaultProps = {
    handleBack: () => {},
    isShowBackButton: true,
    canceledItemsPriceAndDiscountValues: { price: 0, discount: 0 }
};

export default OrderNavigation;
