import React from 'react';

import classes from './errorMessage.module.css';

const ErrorScreen = () => (
    <p className={classes.root}>
        Something went wrong. Google reviews cannot be displayed. Please refresh
        and try again.
    </p>
);

export default ErrorScreen;
