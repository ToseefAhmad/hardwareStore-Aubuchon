import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './errorScreen.module.css';

const ErrorScreen = () => (
    <p className={classes.root}>
        <FormattedMessage
            id="checkNearbyStoresPopup.errorTryAgain"
            defaultMessage="Something went wrong. Please refresh and try again."
        />
    </p>
);

export default ErrorScreen;
