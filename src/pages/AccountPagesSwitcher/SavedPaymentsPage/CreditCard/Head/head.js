import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './head.module.css';

const HEADINGS = [
    { id: 'creditCard.typeTitle', defaultMessage: 'Credit Card Type' },
    { id: 'creditCard.numberTitle', defaultMessage: 'Card number' },
    { id: 'creditCard.expirationDataTitle', defaultMessage: 'Expiration date' }
];

const SavedPaymentsTableHead = () => (
    <li className={classes.root}>
        {HEADINGS.map(({ id, defaultMessage }) => (
            <span key={id}>
                <FormattedMessage id={id} defaultMessage={defaultMessage} />
            </span>
        ))}
        <span key="creditCard.deleteTitle" />
    </li>
);

export default SavedPaymentsTableHead;
