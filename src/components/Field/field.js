import { bool, node, shape, string } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './field.module.css';

const Field = props => {
    const { children, id, label, optional, required } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const optionalSymbol = optional ? (
        <span className={classes.optional}>
            <FormattedMessage
                id={'field.optionalLabel'}
                defaultMessage={'(optional)'}
            />
        </span>
    ) : null;

    return (
        <div className={classes.root}>
            <label className={classes.label} htmlFor={id}>
                {label} {optionalSymbol}
                {required && <span className={classes.required}>*</span>}
            </label>
            {children}
        </div>
    );
};

Field.propTypes = {
    children: node,
    classes: shape({
        root: string,
        label: string
    }),
    id: string,
    label: node,
    optional: bool,
    required: bool
};

export default Field;
