import classnames from 'classnames';
import { bool, node, number, shape, string } from 'prop-types';
import React, { forwardRef } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './carousel.module.css';

const SnapSliderCarousel = forwardRef((props, ref) => {
    const {
        classes: propClasses,
        children,
        slidesGap,
        disabled,
        isShownSideShadows,
        draggable,
        isLocalStoresSlider,
        ...rest
    } = props;

    const classes = useStyle(defaultClasses, propClasses);

    return (
        <div
            {...rest}
            ref={ref}
            className={classnames(classes.root, {
                [classes.disabled]: disabled,
                [classes.extraPaddingRight]: isShownSideShadows,
                [classes.draggable]: draggable,
                [classes.localStore]: isLocalStoresSlider
            })}
            style={{ gap: slidesGap }}
        >
            {children}
        </div>
    );
});

SnapSliderCarousel.propTypes = {
    classes: shape({
        root: string
    }),
    children: node,
    slidesGap: number,
    disabled: bool,
    isShownSideShadows: bool,
    draggable: bool,
    isLocalStoresSlider: bool
};

SnapSliderCarousel.defaultProps = {
    slidesGap: 20,
    isShownSideShadows: false
};

SnapSliderCarousel.displayName = 'SnapSliderCarousel';

export default SnapSliderCarousel;
