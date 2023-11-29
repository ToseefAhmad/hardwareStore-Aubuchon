import classnames from 'classnames';
import PropTypes, { oneOf, shape, string, bool, node } from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useButton } from 'react-aria';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import {
    DualRing as DualRingIcon,
    Checkmark as CheckmarkIcon
} from '@app/components/Icons';

import defaultClasses from './button.module.css';
import { BUTTON_DELAYS } from './constants';

let timeoutHandlerShow = null;
let timeoutHandlerHide = null;

/**
 * A component for buttons.
 *
 * @typedef Button
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a single button.
 */
const Button = props => {
    const {
        children,
        classes: propClasses,
        priority,
        disabled,
        isShort,
        isNarrow,
        onPress,
        isLoading,
        isSuccess,
        ...restProps
    } = props;

    const buttonRef = useRef();
    const [checkmarkVisible, setCheckmarkVisible] = useState(false);

    const { buttonProps } = useButton(
        {
            isDisabled: disabled,
            onPress,
            ...restProps
        },
        buttonRef
    );

    const classes = useStyle(defaultClasses, propClasses);

    // By designs, we only have 2 button priorities. Transfer low => normal.
    // Add disabled priority for separate styling
    const actualPriority = useMemo(() => {
        if (disabled) {
            return 'disabled';
        }
        if (priority === 'high') {
            return 'primary';
        }
        return 'secondary';
    }, [disabled, priority]);

    const loader = (
        <Icon src={DualRingIcon} classes={{ root: classes.loader }} />
    );

    const checkmark = (
        <Icon
            src={CheckmarkIcon}
            classes={{
                root: classnames(classes.checkmark, {
                    [classes.show]: checkmarkVisible
                })
            }}
        />
    );

    useEffect(() => {
        if (isSuccess) {
            timeoutHandlerShow = setTimeout(() => {
                setCheckmarkVisible(true);
            }, BUTTON_DELAYS.showSuccessIcon);
            timeoutHandlerHide = setTimeout(() => {
                setCheckmarkVisible(false);
            }, BUTTON_DELAYS.hideSuccessIcon);
        }

        return () => {
            if (timeoutHandlerShow) {
                clearTimeout(timeoutHandlerShow);
            }
            if (timeoutHandlerHide) {
                clearTimeout(timeoutHandlerHide);
            }
        };
    }, [isSuccess]);

    return (
        <button
            ref={buttonRef}
            className={classnames(classes[actualPriority], {
                [classes.tall]: !isShort,
                [classes.short]: isShort,
                [classes.wide]: !isNarrow,
                [classes.narrow]: isNarrow
            })}
            {...buttonProps}
            {...restProps}
        >
            <span className={classes.content}>
                {isLoading ? loader : isSuccess ? checkmark : children}
            </span>
        </button>
    );
};

/**
 * Props for {@link Button}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * Button component.
 * @property {string} classes.content classes for the button content
 * @property {string} classes.root classes for root container
 * @property {string} classes.disabled classes for Button if disabled priority.
 * @property {string} classes.primary classes for Button if high priority.
 * @property {string} classes.secondary classes for Button if normal priority.
 * @property {string} classes.tall classes for Button if tall height.
 * @property {string} classes.short classes for Button if small height.
 * @property {string} classes.wide classes for Button if wide width.
 * @property {string} classes.narrow classes for Button if narrow width.
 * @property {string} priority the priority/importance of the Button
 * @property {string} type the type of the Button
 * @property {bool} disabled is the button disabled
 * @property {bool} isShort should button be rendered in short format
 * @property {bool} isNarrow should render with fixed width of container
 * @property {bool} isLoading should show loader
 * @property {function} onPress on click action handler
 */
Button.propTypes = {
    classes: shape({
        primary: string,
        secondary: string,
        disabled: string,
        tall: string,
        short: string,
        wide: string,
        narrow: string,
        content: string
    }),
    priority: oneOf(['high', 'low', 'normal']),
    type: oneOf(['button', 'reset', 'submit']),
    disabled: bool,
    isShort: bool,
    isNarrow: bool,
    isLoading: bool,
    isSuccess: bool,
    onPress: PropTypes.func,
    children: node.isRequired
};

Button.defaultProps = {
    priority: 'normal',
    type: 'button',
    disabled: false,
    isShort: false,
    isNarrow: false,
    isLoading: false,
    isSuccess: false
};

export default Button;
