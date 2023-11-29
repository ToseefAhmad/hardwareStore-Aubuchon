import { func } from 'prop-types';
import React from 'react';

import WarningContent from '@app/components/WarningContent/Content';

import classes from './warningScreen.module.css';

const WarningScreen = props => {
    const { onSubmit, onCancel } = props;

    return (
        <div className={classes.root}>
            <WarningContent onCancel={onCancel} handleAddToCart={onSubmit} />
        </div>
    );
};

WarningScreen.propTypes = {
    onSubmit: func.isRequired,
    onCancel: func.isRequired
};

export default WarningScreen;
