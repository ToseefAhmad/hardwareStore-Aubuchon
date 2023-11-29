import { number, shape } from 'prop-types';
import React from 'react';

import { IOrderInfo } from '../types';
import OrderSummarySection from './OrderSummarySection';
import PaymentMethodSection from './PaymentMethodSection';
import classes from './summarySections.module.css';

const SummarySections = props => {
    const { orderInfo, canceledItemsPriceAndDiscountValues } = props;

    return (
        <section className={classes.root}>
            <PaymentMethodSection orderInfo={orderInfo} />
            <OrderSummarySection
                orderInfo={orderInfo}
                canceledItemsPriceAndDiscountValues={
                    canceledItemsPriceAndDiscountValues
                }
            />
        </section>
    );
};

SummarySections.propTypes = {
    orderInfo: IOrderInfo.isRequired,
    canceledItemsPriceAndDiscountValues: shape({
        price: number.isRequired,
        discount: number.isRequired
    }).isRequired
};

export default SummarySections;
