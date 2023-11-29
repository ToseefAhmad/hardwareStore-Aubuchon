import PropTypes, { oneOf, shape, string, bool } from 'prop-types';
import React, { useRef } from 'react';
import { useButton } from 'react-aria';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';

import { ChevronLeft, ChevronRight } from '@app/components/Icons';

import defaultClasses from './arrowButton.module.css';

/**
 * A component for arrow button.
 *
 * @typedef ArrowButton
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a single arrow button.
 */
const ArrowButton = ({
    classes: propClasses,
    priority,
    direction,
    disabled,
    onPress,
    ...restProps
}) => {
    const buttonRef = useRef();

    const { buttonProps } = useButton(
        {
            isDisabled: disabled,
            onPress,
            ...restProps
        },
        buttonRef
    );

    const classes = useStyle(defaultClasses, propClasses);
    const rootClassName =
        classes[`root_${priority}${disabled ? 'Disabled' : ''}Priority`];

    return (
        <button
            ref={buttonRef}
            className={rootClassName}
            {...buttonProps}
            {...restProps}
        >
            <Icon src={direction === 'right' ? ChevronRight : ChevronLeft} />
        </button>
    );
};

/**
 * Props for {@link ArrowButton}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * Button component.
 * @property {string} classes.content classes for the button content
 * @property {string} classes.root classes for root container
 * @property {string} classes.root_highPriority classes for Button if
 * high priority.
 * @property {string} classes.root_lowPriority classes for Button if
 * low priority.
 * @property {string} classes.root_normalPriority classes for Button if
 * normal priority.
 * @property {string} priority the priority/importance of the Button
 * @property {bool} disabled is the button disabled
 * @property {function} onPress on click action
 */
ArrowButton.propTypes = {
    classes: shape({
        content: string,
        root: string,
        root_highPriority: string,
        root_normalPriority: string
    }),
    priority: oneOf(['high', 'normal']).isRequired,
    direction: oneOf(['right', 'left']).isRequired,
    disabled: bool,
    onPress: PropTypes.func
};

ArrowButton.defaultProps = {
    priority: 'normal',
    disabled: false
};

export default ArrowButton;
