import { node, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './body.module.css';

const CardBody = props => {
    const { children, classes: propClasses } = props;

    const classes = useStyle(defaultClasses, propClasses);

    return <section className={classes.root}>{children}</section>;
};

CardBody.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default CardBody;
