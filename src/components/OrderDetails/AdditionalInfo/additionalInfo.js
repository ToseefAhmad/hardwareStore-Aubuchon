import { bool } from 'prop-types';
import React from 'react';

import { IOrderInfo } from '../types';
import classes from './additionalInfo.module.css';
import { useAdditionalInfo } from './useAdditionalInfo';

const AdditionalInfo = props => {
    const { orderInfo, completed } = props;

    const { additionalInfo } = useAdditionalInfo({ orderInfo, completed });

    return (
        <section className={classes.root}>
            {additionalInfo.map(({ label, value }) => (
                <dl key={label} className={classes.dl}>
                    <dt className={classes.dt}>{label}</dt>
                    <dd className={classes.dd}>{value}</dd>
                </dl>
            ))}
        </section>
    );
};

AdditionalInfo.propTypes = {
    orderInfo: IOrderInfo.isRequired,
    completed: bool.isRequired
};

export default AdditionalInfo;
