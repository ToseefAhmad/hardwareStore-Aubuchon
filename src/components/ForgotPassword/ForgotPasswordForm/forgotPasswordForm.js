import { Form } from 'informed';
import { array, bool, func, shape } from 'prop-types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import FormError from '@magento/venia-ui/lib/components/FormError';
import GoogleReCaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import TextInput from '@app/components/TextInput';
import { isRequired } from '@app/overrides/venia-ui/util/formValidators';

import classes from './forgotPasswordForm.module.css';

const ForgotPasswordForm = props => {
    const {
        errors,
        recaptchaWidgetProps,
        isDisabled,
        onCancel,
        onSubmit
    } = props;

    const { formatMessage } = useIntl();

    return (
        <Form onSubmit={onSubmit}>
            <FormError errors={errors} />
            <Field
                label={formatMessage({
                    id: 'forgotPasswordForm.emailAddressLabel',
                    defaultMessage: 'E-mail address'
                })}
            >
                <TextInput
                    field="email"
                    autoComplete="email"
                    validate={isRequired}
                    placeholder="Enter your e-mail address"
                    disabled={isDisabled}
                />
            </Field>
            <GoogleReCaptcha {...recaptchaWidgetProps} />
            <fieldset className={classes.buttons}>
                <Button type="submit" priority="high" disabled={isDisabled}>
                    <FormattedMessage
                        id="forgotPasswordForm.submitButtonText"
                        defaultMessage="Submit"
                    />
                </Button>
                <Button
                    type="button"
                    priority="low"
                    onClick={onCancel}
                    disabled={isDisabled}
                >
                    <FormattedMessage
                        id="forgotPasswordForm.cancelButtonText"
                        defaultMessage="Cancel"
                    />
                </Button>
            </fieldset>
        </Form>
    );
};

ForgotPasswordForm.propTypes = {
    errors: array,
    recaptchaWidgetProps: shape({
        containerElement: func,
        shouldRender: bool
    }).isRequired,
    isDisabled: bool,
    onCancel: func.isRequired,
    onSubmit: func.isRequired
};

export default ForgotPasswordForm;
