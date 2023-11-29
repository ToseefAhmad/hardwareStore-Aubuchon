import { func, shape, string } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './forgotPassword.module.css';
import ForgotPasswordForm from './ForgotPasswordForm';
import { useForgotPassword } from './useForgotPassword';

const ForgotPassword = props => {
    const { onCancel } = props;

    const {
        forgotPasswordEmail,
        recaptchaWidgetProps,
        errors,
        isCompleted,
        isDisabled,
        handleFormSubmit
    } = useForgotPassword();

    return (
        <>
            <header>
                <h2 className={classes.title}>
                    <FormattedMessage
                        id="forgotPassword.title"
                        defaultMessage="Recover Password"
                    />
                </h2>
                <p className={classes.description}>
                    {!isCompleted ? (
                        <FormattedMessage
                            id="forgotPassword.instructions"
                            defaultMessage="Please enter the email address associated with this account."
                        />
                    ) : (
                        <FormattedMessage
                            id="formSubmissionSuccessful.textMessage"
                            defaultMessage="If there is an account associated with {email} you will receive an email with a link to change your password."
                            values={{
                                email: forgotPasswordEmail
                            }}
                        />
                    )}
                </p>
            </header>
            {!isCompleted && (
                <ForgotPasswordForm
                    errors={errors}
                    recaptchaWidgetProps={recaptchaWidgetProps}
                    isDisabled={isDisabled}
                    onCancel={onCancel}
                    onSubmit={handleFormSubmit}
                />
            )}
        </>
    );
};

ForgotPassword.propTypes = {
    initialValues: shape({
        email: string
    }),
    onCancel: func
};

ForgotPassword.defaultProps = {
    onCancel: () => {}
};

export default ForgotPassword;
