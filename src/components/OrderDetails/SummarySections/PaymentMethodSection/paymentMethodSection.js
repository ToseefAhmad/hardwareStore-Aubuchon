import React from 'react';

import { IOrderInfo } from '../../types';

import Section from '@app/components/Section';

import classes from '../summarySections.module.css';
import {
    formatAdditionalDataFieldName,
    formatAdditionalDataFieldValue,
    usePaymentMethodSection
} from './usePaymentMethodSection';

const PaymentMethodSection = props => {
    const { orderInfo } = props;

    const { paymentMethodInfo } = usePaymentMethodSection({ orderInfo });

    return (
        <Section>
            <Section.Title>Payment Method</Section.Title>
            <div className={classes.sectionContent}>
                <dl className={classes.dl}>
                    <dt className={classes.dt}>{paymentMethodInfo.name}</dt>
                </dl>
                {paymentMethodInfo.additionalData.map(({ name, value }) => (
                    <dl key={name} className={classes.dl}>
                        <dt className={classes.dt}>
                            {formatAdditionalDataFieldName(name)}:
                        </dt>
                        <dd className={classes.dd}>
                            {formatAdditionalDataFieldValue(value, name)}
                        </dd>
                    </dl>
                ))}
            </div>
        </Section>
    );
};

PaymentMethodSection.propTypes = {
    orderInfo: IOrderInfo.isRequired
};

export default PaymentMethodSection;
