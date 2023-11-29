import classnames from 'classnames';
import { node, string } from 'prop-types';
import React, { forwardRef } from 'react';

import classes from './section.module.css';

const Section = forwardRef((props, ref) => {
    const { children, title, propsClasses } = props;

    return (
        <section ref={ref} className={classnames(classes.root, propsClasses)}>
            {title && <h4>{title}</h4>}
            <div>{children}</div>
        </section>
    );
});

Section.defaultProps = {
    hideTitle: false
};

Section.propTypes = {
    children: node.isRequired,
    title: string,
    propsClasses: string
};

Section.displayName = 'Section';

export default Section;
