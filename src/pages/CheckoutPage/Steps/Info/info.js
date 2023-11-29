import { APP_ROUTER_PATHS } from '@app-constants';
import { Form, Relevant } from 'informed';
import React from 'react';

import GoogleRecaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import combineValidators from '@magento/venia-ui/lib/util/combineValidators';

import Section from '../../partials/Section';
import Sidebar from '../../partials/Sidebar';

import Field from '@app/components/Field';
import Icon from '@app/components/Icon';
import { Info as InfoIcon, Edit as EditIcon } from '@app/components/Icons';
import Link from '@app/components/Link';
import Message from '@app/components/Message';
import Password from '@app/components/Password';
import TextInput from '@app/components/TextInput';
import {
    isEmail,
    isRequired
} from '@app/overrides/venia-ui/util/formValidators';
import { phoneFormatter, phoneParser } from '@app/utils/formUtils';

import { INFO_FORM_FIELDS } from './constants';
import HiddenFields from './HiddenFields';
import classes from './info.module.css';
import { useInfo } from './useInfo';

const InfoStep = () => {
    const {
        submitButtonText,
        getFormApi,
        customerInfo,
        recaptchaWidgetProps,
        errorMessageProps,
        isLoading,
        handleSubmit,
        handleReset
    } = useInfo();

    const resetButton = (
        <button
            className={classes.resetButton}
            type="button"
            onClick={handleReset}
        >
            <Icon classes={{ icon: classes.editIcon }} src={EditIcon} />
        </button>
    );

    const forgotPassword = (
        <Link className={classes.link} to={APP_ROUTER_PATHS.forgotPassword}>
            Forgot Password?
        </Link>
    );

    const credentialsInfoMessage = (
        <p className={classes.credentialsInfoMessage}>
            <Icon
                classes={{
                    icon: classes.credentialsInfoMessageIcon
                }}
                src={InfoIcon}
            />
            We found an account with this e-mail.{' '}
            <span>Enter the password to proceed.</span> {forgotPassword}
        </p>
    );

    return (
        <>
            <Form
                className={classes.root}
                getApi={getFormApi}
                initialValues={customerInfo}
                onSubmit={handleSubmit}
            >
                <section className={classes.content}>
                    {errorMessageProps && (
                        <div className={classes.desktopErrorContainer}>
                            <Message {...errorMessageProps} type="error" />
                        </div>
                    )}
                    <Section title="Who is placing this order?">
                        <HiddenFields />
                        <fieldset className={classes.fieldsetCredentials}>
                            <Field label="E-mail Address">
                                <TextInput
                                    field={INFO_FORM_FIELDS.email}
                                    autoComplete="email"
                                    placeholder="Enter e-mail address"
                                    validate={combineValidators([
                                        isRequired,
                                        isEmail
                                    ])}
                                    classes={{
                                        iconPadding:
                                            classes.textFieldIconPadding,
                                        icon: classes.textFieldIcon
                                    }}
                                    icon={customerInfo.email && resetButton}
                                    disabled={customerInfo.email || isLoading}
                                />
                                {customerInfo.isShownPasswordField && (
                                    <div
                                        className={
                                            classes.credentialsInfoMessageMobileContainer
                                        }
                                    >
                                        {credentialsInfoMessage}
                                    </div>
                                )}
                            </Field>
                            <Relevant
                                when={({ values }) =>
                                    values.isShownPasswordField
                                }
                                relevanceWhen={['isShownPasswordField']}
                            >
                                <Password
                                    fieldName={INFO_FORM_FIELDS.password}
                                    autoComplete="current-password"
                                    label="Password"
                                    placeholder="Enter the password"
                                    validate={isRequired}
                                    disabled={isLoading}
                                />
                            </Relevant>
                        </fieldset>
                        <Relevant
                            when={({ values }) => values.isShownPasswordField}
                            relevanceWhen={['isShownPasswordField']}
                        >
                            <GoogleRecaptcha
                                {...recaptchaWidgetProps}
                                classes={{ root: classes.recaptcha }}
                            />
                        </Relevant>
                        {customerInfo.isShownPasswordField && (
                            <div
                                className={
                                    classes.credentialsInfoMessageContainer
                                }
                            >
                                {credentialsInfoMessage}
                            </div>
                        )}
                        <Relevant
                            when={({ values }) => values.isShownInfoFields}
                            relevanceWhen={['isShownInfoFields']}
                        >
                            <fieldset className={classes.fieldsetInfo}>
                                <Field label="First Name">
                                    <TextInput
                                        field={INFO_FORM_FIELDS.firstname}
                                        autoComplete="given-name"
                                        placeholder="Enter first name"
                                        validate={isRequired}
                                        disabled={isLoading}
                                    />
                                </Field>
                                <Field label="Last Name">
                                    <TextInput
                                        field={INFO_FORM_FIELDS.lastname}
                                        autoComplete="family-name"
                                        placeholder="Enter last name"
                                        validate={isRequired}
                                        disabled={isLoading}
                                    />
                                </Field>
                                <Field label="Phone Number">
                                    <TextInput
                                        field={INFO_FORM_FIELDS.phone}
                                        autoComplete="tel"
                                        placeholder="Enter phone number"
                                        formatter={phoneFormatter}
                                        parser={phoneParser}
                                        validate={isRequired}
                                        disabled={isLoading}
                                    />
                                </Field>
                                <Field label="Company" optional>
                                    <TextInput
                                        field={INFO_FORM_FIELDS.company}
                                        autoComplete="organization"
                                        placeholder="Enter company name"
                                        disabled={isLoading}
                                    />
                                </Field>
                            </fieldset>
                        </Relevant>
                        {errorMessageProps && (
                            <div className={classes.errorContainer}>
                                <Message {...errorMessageProps} type="error" />
                            </div>
                        )}
                    </Section>
                </section>
                <Sidebar
                    submitButtonText={submitButtonText}
                    isLoading={isLoading}
                />
            </Form>
        </>
    );
};

export default InfoStep;
