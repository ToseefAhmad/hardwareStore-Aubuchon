import { node, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './title.module.css';

const SectionTitle = props => {
    const { children, classes: propClasses } = props;

    const classes = useStyle(defaultClasses, propClasses);

    return <h3 className={classes.root}>{children}</h3>;
};

SectionTitle.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default SectionTitle;
