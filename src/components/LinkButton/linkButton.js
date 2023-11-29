import classnames from 'classnames';
import { oneOf, shape, string, node, func } from 'prop-types';
import React, { useRef } from 'react';
import { useButton } from 'react-aria';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './linkButton.module.css';

/**
 * A component for link buttons.
 *
 * @typedef LinkButton
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a single link button.
 */
const LinkButton = props => {
    const {
        children,
        classes: propClasses,
        priority,
        onPress,
        ...restProps
    } = props;
    const classes = useStyle(defaultClasses, propClasses);

    const buttonRef = useRef();

    const { buttonProps } = useButton(
        {
            onPress,
            ...restProps
        },
        buttonRef
    );

    return (
        <button
            ref={buttonRef}
            className={classnames({
                [classes.rootPrimary]: priority === 'primary',
                [classes.rootSecondary]: priority === 'secondary'
            })}
            {...buttonProps}
            {...restProps}
        >
            {children}
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
 * @property {string} classes.rootPrimary classes for root primary container
 * @property {string} classes.rootSecondary classes for root secondary container
 * @property {string} type the type of the Button
 */
LinkButton.propTypes = {
    classes: shape({
        rootPrimary: string,
        rootSecondary: string
    }),
    priority: oneOf(['primary', 'secondary']),
    onPress: func,
    children: node.isRequired
};

LinkButton.defaultProps = {
    type: 'button',
    priority: 'secondary'
};

export default LinkButton;
