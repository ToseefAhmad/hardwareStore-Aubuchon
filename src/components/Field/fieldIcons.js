import { node, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './fieldIcons.module.css';

const FieldIcons = props => {
    const { icon, children, secondIcon } = props;
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <span className={classes.root}>
            {children}
            <span className={classes.icon}>{icon}</span>
            {secondIcon && (
                <span className={classes.secondIcon}>{secondIcon}</span>
            )}
        </span>
    );
};

FieldIcons.propTypes = {
    classes: shape({
        root: string,
        icon: string
    }),
    icon: node,
    secondIcon: node,
    children: node.isRequired
};

export default FieldIcons;
