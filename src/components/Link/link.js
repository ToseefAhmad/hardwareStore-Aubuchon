import classnames from 'classnames';
import PropTypes, { bool, oneOf, string } from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import classes from './link.module.css';
import useLink from './useLink';

/**
 * @kind functional component
 *
 * @property {bool} shouldPrefetch `true` activates prefetching the target page when the link becomes visible in the viewport.
 * @property {string} to From [react-router-dom Link](https://knowbody.github.io/react-router-docs/api/Link.html). The absolute path to the target page of the link. Uses the `to` prop from the `react-router-dom Link`.
 *
 * @example <caption>Basic usage</caption>
 * <Link shouldPrefetch={true} to="/about/">About Us</Link>
 */
const Link = props => {
    const {
        innerRef,
        isButtonLike,
        shouldPrefetch,
        priority,
        className,
        disabled,
        ...propsForBase
    } = props;
    const { ref } = useLink({
        ...props,
        innerRef,
        shouldPrefetch
    });

    return (
        <RouterLink
            {...propsForBase}
            innerRef={ref}
            className={classnames(className, {
                [classes.secondaryLink]:
                    !isButtonLike && priority === 'secondary',
                [classes.primaryBtn]: isButtonLike && priority === 'primary',
                [classes.secondaryBtn]:
                    isButtonLike && priority === 'secondary',
                [classes.disabled]: isButtonLike && disabled
            })}
        />
    );
};

/**
 * @property {bool} [shouldPrefetch=false] Determine if the link should be prefetched using `IntersectionObserver`.
 * @property {string} [priority='primary'] Link priority - changes styling
 * @property {bool} [isButtonLike=false] When the option is enabled, the appearance simulates the appearance of the button.
 * @property {bool} [disabled] When the option is enabled, the appearance simulates the appearance of the button disabled state.
 */
Link.propTypes = {
    shouldPrefetch: bool,
    priority: oneOf(['primary', 'secondary']),
    innerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    className: string,
    isButtonLike: bool,
    disabled: bool
};

Link.defaultProps = {
    isButtonLike: false,
    shouldPrefetch: false,
    priority: 'primary'
};

export default Link;
