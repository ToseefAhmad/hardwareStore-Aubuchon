import classnames from 'classnames';
import { bool, oneOf, shape, string } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';

import ArrowButton from '@app/components/ArrowButton';
import { useTailwindContext } from '@app/context/tailwind';

import defaultClasses from './arrow.module.css';

const SnapSliderArrow = props => {
    const {
        classes: propsClasses,
        direction,
        visible,
        isInverted,
        ...rest
    } = props;

    const classes = useStyle(defaultClasses, propsClasses);

    const rootClassName = isInverted ? classes.root_isInverted : classes.root;
    const disabledClassName = isInverted
        ? classes.disabled_isInverted
        : classes.disabled;

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    return (
        visible &&
        !isMobile && (
            <ArrowButton
                {...rest}
                classes={{
                    root_normalPriority: classnames(rootClassName, {
                        [classes.right]: direction === 'right',
                        [classes.left]: direction === 'left'
                    }),
                    root_normalDisabledPriority: classnames(disabledClassName, {
                        [classes.right]: direction === 'right',
                        [classes.left]: direction === 'left'
                    })
                }}
                aria-label={`Scroll ${
                    direction === 'right' ? 'forward' : 'backward'
                }`}
                direction={direction}
            />
        )
    );
};

SnapSliderArrow.propTypes = {
    direction: oneOf(['right', 'left']).isRequired,
    visible: bool,
    isInverted: bool,
    classes: shape({
        root: string,
        disabled: string,
        root_isInverted: string,
        disabled_isInverted: string
    })
};

SnapSliderArrow.defaultProps = {
    isInverted: false
};

export default SnapSliderArrow;
