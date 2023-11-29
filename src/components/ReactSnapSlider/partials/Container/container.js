import classnames from 'classnames';
import { bool, node } from 'prop-types';
import React from 'react';

import classes from './container.module.css';

const SnapSliderContainer = props => {
    const { children, isShownLeftSideShadow, isShownRightSideShadow } = props;

    return (
        <section
            className={classnames(classes.root, {
                [classes.showLeftShadow]: isShownLeftSideShadow,
                [classes.showRightShadow]: isShownRightSideShadow
            })}
        >
            {children}
        </section>
    );
};
SnapSliderContainer.propTypes = {
    children: node,
    isShownLeftSideShadow: bool,
    isShownRightSideShadow: bool
};

SnapSliderContainer.defaultProps = {
    isShownLeftSideShadow: false,
    isShownRightSideShadow: false
};

export default SnapSliderContainer;
