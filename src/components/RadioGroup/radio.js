import { Radio as InformedRadio } from 'informed';
import { node, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './radio.module.css';

// eslint-disable-next-line no-warning-comments
/* TODO: change lint config to use `label-has-associated-control` */
/* eslint-disable jsx-a11y/label-has-for */

const RadioOption = props => {
    const { classes: propClasses, children, id, label, value, ...rest } = props;
    const classes = useStyle(defaultClasses, propClasses);

    return (
        <label className={classes.root} htmlFor={id}>
            <InformedRadio
                {...rest}
                className={classes.input}
                id={id}
                value={value}
            />
            {children || <span>{label || (value != null ? value : '')}</span>}
            <div className={classes.background} />
        </label>
    );
};

RadioOption.propTypes = {
    classes: shape({
        root: string,
        input: string
    }),
    children: node,
    id: string.isRequired,
    label: node,
    value: node.isRequired
};

export default RadioOption;

/* eslint-enable jsx-a11y/label-has-for */
