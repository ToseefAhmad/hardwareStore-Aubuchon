import classnames from 'classnames';
import { object, number, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './icon.module.css';

const Icon = props => {
    // destructure `propClasses` to exclude it from `restProps`
    const {
        attrs,
        classes: propClasses,
        size,
        src: Component,
        ...restProps
    } = props;
    const { width, ...restAttrs } = attrs || {};
    const classes = useStyle(defaultClasses, propClasses);

    return (
        <span className={classnames(classes.root, classes.icon)} {...restProps}>
            <Component size={size || width} {...restAttrs} />
        </span>
    );
};

Icon.propTypes = {
    attrs: shape({}),
    classes: shape({
        root: string,
        icon: string
    }),
    size: number,
    src: object.isRequired
};

export default Icon;
