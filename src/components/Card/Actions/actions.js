import { node, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './actions.module.css';

const CardActions = props => {
    const { children, classes: propClasses } = props;

    const classes = useStyle(defaultClasses, propClasses);

    return <footer className={classes.root}>{children}</footer>;
};

CardActions.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default CardActions;
