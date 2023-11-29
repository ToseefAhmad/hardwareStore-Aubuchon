import classnames from 'classnames';
import { Form } from 'informed';
import { shape, string } from 'prop-types';
import React, { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import GoogleRecaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import combineValidators from '@magento/venia-ui/lib/util/combineValidators';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import Password from '@app/components/Password';
import TextInput from '@app/components/TextInput';
import {
    isEmail,
    isRequired
} from '@app/overrides/venia-ui/util/formValidators';

import classes from './signIn.module.css';
import { useSignIn } from './useSignIn';

const SignIn = props => {
    const { initialValues, warningText } = props;

    const formInitialValuesRef = useRef(null);

    const { formatMessage } = useIntl();
    const {
        recaptchaWidgetProps,
        isLoading,
        isDisabled,
        isRecaptchaLoading,
        handleSubmit,
        signInPageInitialValues,
        signInPageWarningText
    } = useSignIn();

    const warningMessage =
        (warningText && <p className={classes.paragraph}>{warningText}</p>) ||
        (signInPageWarningText && (
            <p className={classes.paragraph}>{`${signInPageWarningText}`}</p>
        ));

    formInitialValuesRef.current =
        initialValues?.email?.length > 0
            ? initialValues
            : signInPageInitialValues?.email.length > 0
            ? signInPageInitialValues
            : null;

    return (
        <Form
            initialValues={formInitialValuesRef?.current}
            onSubmit={handleSubmit}
        >
            {warningMessage}
            <Field
                label={formatMessage({
                    id: 'signInForm.emailAddress',
                    defaultMessage: 'E-mail address'
                })}
                classes={{ root: classes.field }}
            >
                <TextInput
                    field="email"
                    autoComplete="email"
                    validate={combineValidators([isRequired, isEmail])}
                    placeholder={formatMessage({
                        id: 'signInForm.emailAddressPlaceholder',
                        defaultMessage: 'Enter your e-mail address'
                    })}
                    disabled={isDisabled}
                />
            </Field>
            <Password
                fieldName="password"
                autoComplete="current-password"
                label={formatMessage({
                    id: 'signInForm.password',
                    defaultMessage: 'Password'
                })}
                placeholder={formatMessage({
                    id: 'signInForm.passwordPlaceholder',
                    defaultMessage: 'Enter your password'
                })}
                disabled={isDisabled}
                isToggleButtonHidden={false}
                fieldClasses={{ root: classes.field }}
            />
            <GoogleRecaptcha {...recaptchaWidgetProps} />
            <fieldset className={classes.buttons}>
                <Button
                    type="submit"
                    priority="high"
                    classes={{
                        primary: classes.submitBtn,
                        disabled: classnames(classes.disabled, {
                            [classes.recaptchaLoading]: isRecaptchaLoading
                        })
                    }}
                    disabled={isDisabled || isRecaptchaLoading}
                    isLoading={isLoading}
                >
                    <FormattedMessage
                        id="sighInForm.submitText"
                        defaultMessage="Sign In"
                    />
                </Button>
            </fieldset>
        </Form>
    );
};

SignIn.propTypes = {
    initialValues: shape({
        email: string
    }),
    warningText: string
};

export default SignIn;
