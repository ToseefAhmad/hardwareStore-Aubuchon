import React from 'react';

import classes from './successMessage.module.css';

const SuccessMessage = () => {
    return (
        <div className={classes.root}>
            <p className={classes.message}>
                Your review has been submitted successfully!
            </p>
        </div>
    );
};

export default SuccessMessage;
