import React from 'react';

import Checkbox from '@app/components/Checkbox';

import classes from './hiddenFields.module.css';

const HiddenFields = () => (
    <fieldset className={classes.root}>
        <Checkbox field="isShownPasswordField" disabled />
        <Checkbox field="isShownInfoFields" disabled />
    </fieldset>
);

export default HiddenFields;
