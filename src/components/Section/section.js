import { shape, node, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './section.module.css';
import SectionTitle from './Title';

const Section = props => {
    const { children, classes: propClasses } = props;

    const classes = useStyle(defaultClasses, propClasses);

    return <section className={classes.root}>{children}</section>;
};

Section.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

Section.Title = SectionTitle;

export default Section;
