import { node, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './title.module.css';

const CardTitle = props => {
    const { children, classes: propClasses } = props;

    const classes = useStyle(defaultClasses, propClasses);

    return <h4 className={classes.root}>{children}</h4>;
};

CardTitle.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default CardTitle;
