import { Form } from 'informed';
import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useToasts } from '@magento/peregrine';
import GoogleReCaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import resetPasswordOperations from '@magento/venia-ui/lib/components/MyAccount/ResetPassword/resetPassword.gql';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import { useResetPassword } from '@app/components/MyAccount/ResetPassword/useResetPassword';
import Password from '@app/components/Password';
import TextInput from '@app/components/TextInput';

import classes from './resetPassword.module.css';

const ResetPassword = () => {
    const { formatMessage } = useIntl();
    const talonProps = useResetPassword({ ...resetPasswordOperations });
    const {
        hasCompleted,
        loading,
        token,
        handleSubmit,
        recaptchaWidgetProps
    } = talonProps;

    const tokenMissing = (
        <div className={classes.invalidToken}>
            <FormattedMessage
                id="resetPassword.invalidTokenMessage"
                defaultMessage="Uh oh, something went wrong. Check the link or try again."
            />
        </div>
    );

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (hasCompleted) {
            addToast({
                type: 'info',
                message: formatMessage({
                    id: 'resetPassword.savedPasswordText',
                    defaultMessage: 'Your new password has been saved.'
                }),
                timeout: 5000
            });
        }
    }, [addToast, formatMessage, hasCompleted]);
    const recoverPassword = hasCompleted ? (
        <div className={classes.successMessage}>
            <FormattedMessage
                id="resetPassword.successMessage"
                defaultMessage="Your new password has been saved. Please use this password to sign into your Account."
            />
        </div>
    ) : (
        <Form onSubmit={handleSubmit}>
            <Field label="E-mail address" classes={{ root: classes.field }}>
                <TextInput
                    field="email"
                    validate={isRequired}
                    placeholder="Enter your e-mail address"
                />
            </Field>
            <Password
                label={formatMessage({
                    id: 'resetPassword.newPasswordText',
                    defaultMessage: 'New Password'
                })}
                fieldName="newPassword"
                isToggleButtonHidden={false}
            />
            <GoogleReCaptcha {...recaptchaWidgetProps} />
            <div className={classes.buttonContainer}>
                <Button type="submit" priority="high" disabled={loading}>
                    <FormattedMessage
                        id="resetPassword.savePassword"
                        defaultMessage="Save Password"
                    />
                </Button>
            </div>
        </Form>
    );

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'resetPassword.title',
                    defaultMessage: 'Reset Password'
                })}
            </StoreTitle>
            <h1 aria-live="polite" className={classes.header}>
                <FormattedMessage
                    id="resetPassword.header"
                    defaultMessage="Reset Password"
                />
            </h1>
            <div className={classes.contentContainer}>
                {token ? recoverPassword : tokenMissing}
            </div>
        </div>
    );
};

export default ResetPassword;
