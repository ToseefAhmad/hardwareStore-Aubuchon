import React from 'react';

import classes from './paymentMethods.module.css';

const PaymentMethods = () => {
    return (
        <figure role="group" className={classes.imageList}>
            <figure role="group">
                <img
                    alt="visa"
                    src="/assets/payment-methods/visa.svg"
                    loading="lazy"
                />
            </figure>
            <figure role="group">
                <img
                    alt="mastercard"
                    src="/assets/payment-methods/mastercard.svg"
                    loading="lazy"
                />
            </figure>
            <figure role="group">
                <img
                    alt="visa"
                    src="/assets/payment-methods/discover.svg"
                    loading="lazy"
                />
            </figure>
            <figure role="group">
                <img
                    alt="american express"
                    src="/assets/payment-methods/american-express.svg"
                    loading="lazy"
                />
            </figure>
        </figure>
    );
};

export default PaymentMethods;
