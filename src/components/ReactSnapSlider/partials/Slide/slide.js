import { node, number } from 'prop-types';
import React, { Children, cloneElement, forwardRef } from 'react';

import classes from './slide.module.css';

const SnapSliderSlide = forwardRef((props, ref) => {
    const { children, slideIndex, maxSlideWidth } = props;

    let modifiedChildren;

    if (!maxSlideWidth) {
        modifiedChildren = children;
    } else {
        modifiedChildren = Children.map(children, child =>
            cloneElement(child, {
                ...child.props,
                style: {
                    ...(child.props.style || {}),
                    maxWidth: maxSlideWidth
                }
            })
        );
    }

    return (
        <div ref={ref} className={classes.root} data-index-number={slideIndex}>
            {modifiedChildren}
        </div>
    );
});

SnapSliderSlide.propTypes = {
    children: node,
    slideIndex: number.isRequired,
    maxSlideWidth: number
};

SnapSliderSlide.displayName = 'SnapSliderSlide';

export default SnapSliderSlide;
