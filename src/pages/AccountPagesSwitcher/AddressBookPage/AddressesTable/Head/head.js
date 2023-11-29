import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './head.module.css';

const HEADINGS = [
    { id: 'addressesTable.firstnameTitle', defaultMessage: 'First name' },
    { id: 'addressesTable.lastnameTitle', defaultMessage: 'Last name' },
    {
        id: 'addressesTable.streetAddressTitle',
        defaultMessage: 'Street Address'
    },
    { id: 'addressesTable.cityTitle', defaultMessage: 'City' },
    { id: 'addressesTable.countryTitle', defaultMessage: 'Country' },
    { id: 'addressesTable.stateTitle', defaultMessage: 'State' },
    { id: 'addressesTable.postalCodeTitle', defaultMessage: 'Postal code' },
    { id: 'addressesTable.phoneTitle', defaultMessage: 'Phone' }
];

const AddressesTableHead = () => (
    <li className={classes.root}>
        {HEADINGS.map(({ id, defaultMessage }) => (
            <span key={id}>
                <FormattedMessage id={id} defaultMessage={defaultMessage} />
            </span>
        ))}
    </li>
);
export default AddressesTableHead;
