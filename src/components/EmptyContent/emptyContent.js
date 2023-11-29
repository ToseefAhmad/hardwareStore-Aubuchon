import { shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './emptyContent.module.css';

const EmptyContent = props => {
    const { title, content } = props;
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <h2 className={classes.title}>
            {`${title} `}
            <span className={classes.normal}>{`- ${content}`}</span>
        </h2>
    );
};

EmptyContent.propTypes = {
    classes: shape({
        title: string,
        normal: string
    }),
    title: string.isRequired,
    content: string.isRequired
};

EmptyContent.defaultProps = {
    title: 'Sorry',
    content: 'no items are available'
};

export default EmptyContent;
