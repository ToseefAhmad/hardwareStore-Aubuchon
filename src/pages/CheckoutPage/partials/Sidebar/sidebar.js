import { APP_ROUTER_PATHS } from '@app-constants';
import { bool, func, object, shape, string } from 'prop-types';
import React from 'react';

import GoogleRecaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';

import { CHECKOUT_STEPS_KEYS } from '../../constants';
import { useCheckoutPageContext } from '../../context';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { InfoFilled } from '@app/components/Icons';
import Link from '@app/components/Link';

import OrderTotal from '../OrderTotal';
import classes from './sidebar.module.css';

const getFormattedErrorMessage = error =>
    error ? error.message.split('.')[0] : '';

const Sidebar = ({
    submitButtonText,
    isLoading,
    isSuccess,
    successButtonRef,
    error,
    recaptchaWidgetProps,
    recaptchaLoading
}) => {
    const [{ currentStep }] = useCheckoutPageContext();

    return (
        <aside className={classes.root} aria-label="Summary">
            <OrderTotal />
            <div ref={successButtonRef}>
                <Button
                    type="submit"
                    priority="high"
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                >
                    {submitButtonText}
                </Button>
            </div>
            {error && (
                <p className={classes.error}>
                    <Icon src={InfoFilled} />
                    <span>{getFormattedErrorMessage(error)}</span>
                </p>
            )}
            {currentStep === CHECKOUT_STEPS_KEYS.payment && (
                <>
                    {recaptchaWidgetProps !== undefined &&
                        !recaptchaLoading && (
                            <GoogleRecaptcha {...recaptchaWidgetProps} />
                        )}
                    <Link
                        className={classes.termsLink}
                        to={APP_ROUTER_PATHS.termsAndConditions}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        By placing your order, you agree to the{' '}
                        <b>Terms & Conditions</b>
                    </Link>
                </>
            )}
        </aside>
    );
};

Sidebar.propTypes = {
    submitButtonText: string.isRequired,
    isLoading: bool,
    isSuccess: bool,
    successButtonRef: shape({
        current: object
    }),
    error: shape({
        message: string
    }),
    recaptchaWidgetProps: shape({
        containerElement: func,
        shouldRender: bool
    }),
    recaptchaLoading: bool
};

export default Sidebar;
