import { number, shape } from 'prop-types';
import React from 'react';

import { IOrderInfo } from '../../types';

import Section from '@app/components/Section';

import classes from '../summarySections.module.css';
import { useOrderSummarySection } from './useOrderSummarySection';

const OrderSummarySection = props => {
    const { orderInfo, canceledItemsPriceAndDiscountValues } = props;

    const { prices } = useOrderSummarySection({
        orderInfo,
        canceledItemsPriceAndDiscountValues
    });

    return (
        <Section>
            <Section.Title>Order Summary</Section.Title>
            <div className={classes.sectionContent}>
                {prices.map(
                    ({ label, value, display }) =>
                        display && (
                            <dl key={label} className={classes.dl}>
                                <dt className={classes.dt}>{label}</dt>
                                <dd className={classes.dd}>
                                    {['Discount:', 'Reward Discount:'].includes(
                                        label
                                    ) && '-'}
                                    {value}
                                </dd>
                            </dl>
                        )
                )}
            </div>
        </Section>
    );
};

OrderSummarySection.propTypes = {
    orderInfo: IOrderInfo.isRequired,
    canceledItemsPriceAndDiscountValues: shape({
        price: number.isRequired,
        discount: number.isRequired
    }).isRequired
};

export default OrderSummarySection;
