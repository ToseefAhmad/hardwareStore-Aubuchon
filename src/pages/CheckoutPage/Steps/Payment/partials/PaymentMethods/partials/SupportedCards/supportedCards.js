import React from 'react';

import classes from './supportedCards.module.css';

const SupportedCards = () => (
    <figure role="group" className={classes.imageList}>
        <figure role="group">
            <img alt="visa" src="/assets/payment-methods/visa.svg" />
        </figure>
        <figure role="group">
            <img
                alt="mastercard"
                src="/assets/payment-methods/mastercard.svg"
            />
        </figure>
        <figure role="group">
            <img alt="visa" src="/assets/payment-methods/discover.svg" />
        </figure>
        <figure role="group">
            <img
                alt="american express"
                src="/assets/payment-methods/american-express.svg"
            />
        </figure>
    </figure>
);

export default SupportedCards;
