import { bool, func, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './googleReCaptcha.module.css';

/**
 * A component to display a Google ReCaptcha V3 inline widget.
 *
 * @typedef GoogleReCaptcha
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a container to be used by the useGoogleReCaptcha hook.
 */
const GoogleReCaptcha = props => {
    const { containerElement = () => {}, shouldRender = false } = props;
    const classes = useStyle(defaultClasses, props.classes);

    // Do not display if position is not inline or if ReCaptcha render method is not available
    if (!(shouldRender && globalThis.grecaptcha?.render)) {
        return null;
    }

    return (
        <div>
            <div ref={containerElement} className={classes.root} />
            <p className={classes.text}>
                This site is protected by reCAPTCHA and the Google{' '}
                <a
                    className={classes.link}
                    href="https://policies.google.com/privacy"
                    target="blank"
                >
                    Privacy Policy
                </a>{' '}
                and{' '}
                <a
                    className={classes.link}
                    href="https://policies.google.com/terms"
                    target="blank"
                >
                    Terms of Service
                </a>{' '}
                apply.
            </p>
        </div>
    );
};

/**
 * Props for {@link GoogleReCaptcha}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * GoogleReCaptcha component.
 * @property {String} classes.root class for root container
 * @property {Function} containerElement Element callback ref
 * @property {Boolean} shouldRender Checks if component should be rendered
 */
GoogleReCaptcha.propTypes = {
    classes: shape({
        root: string,
        text: string
    }),
    containerElement: func.isRequired,
    shouldRender: bool.isRequired
};

export default GoogleReCaptcha;
