import { Form, Relevant } from 'informed';
import { shape, string, bool, func } from 'prop-types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import GoogleReCaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import combine from '@magento/venia-ui/lib/util/combineValidators';

import Button from '@app/components/Button';
import Checkbox from '@app/components/Checkbox';
import DateOfBirth from '@app/components/DateOfBirth';
import Field from '@app/components/Field';
import Password from '@app/components/Password';
import TextInput from '@app/components/TextInput';
import {
    isNotEqualToField,
    isEqualToField,
    isRequired,
    validatePassword
} from '@app/overrides/venia-ui/util/formValidators';
import { phoneFormatter, phoneParser } from '@app/utils/formUtils';

import classes from './editForm.module.css';

const EditForm = props => {
    const {
        initialValues,
        recaptchaWidgetProps,
        onSubmit,
        isDisabled,
        isLoading,
        getFormApi
    } = props;

    const { formatMessage } = useIntl();

    return (
        <Form
            preventEnter
            initialValues={initialValues}
            onSubmit={onSubmit}
            getApi={getFormApi}
        >
            <fieldset className={classes.fieldset}>
                <Field
                    label={formatMessage({
                        id: 'global.firstName',
                        defaultMessage: 'First Name'
                    })}
                    required
                >
                    <TextInput
                        field="firstname"
                        validate={isRequired}
                        placeholder={formatMessage({
                            id: 'global.enterFirstName',
                            defaultMessage: 'Enter First Name'
                        })}
                        disabled={isDisabled}
                    />
                </Field>
                <Field
                    label={formatMessage({
                        id: 'global.lastName',
                        defaultMessage: 'Last Name'
                    })}
                    required
                >
                    <TextInput
                        field="lastname"
                        validate={isRequired}
                        placeholder={formatMessage({
                            id: 'global.enterLastName',
                            defaultMessage: 'Enter Last Name'
                        })}
                        disabled={isDisabled}
                    />
                </Field>
                <Field
                    label={formatMessage({
                        id: 'global.telephone',
                        defaultMessage: 'Phone Number'
                    })}
                    required
                >
                    <TextInput
                        field="telephone"
                        validate={isRequired}
                        formatter={phoneFormatter}
                        parser={phoneParser}
                        placeholder={formatMessage({
                            id: 'global.enterTelephone',
                            defaultMessage: 'Enter Phone Number'
                        })}
                        disabled={isDisabled}
                    />
                </Field>
                <Field
                    label={formatMessage({
                        id: 'global.dateOfBirth',
                        defaultMessage: 'Date of birthday'
                    })}
                >
                    <DateOfBirth
                        field="date_of_birth"
                        initialValue={initialValues.date_of_birth}
                        disabled={isDisabled}
                    />
                </Field>
            </fieldset>
            <fieldset className={classes.checkboxes}>
                <Checkbox
                    field="isChangeEmail"
                    label={formatMessage({
                        id: 'global.changeEmail',
                        defaultMessage: 'Change E-mail'
                    })}
                    disabled={isDisabled}
                />
                <Checkbox
                    field="isChangePassword"
                    label={formatMessage({
                        id: 'global.changePassword',
                        defaultMessage: 'Change Password'
                    })}
                    disabled={isDisabled}
                />
            </fieldset>
            <Relevant
                when={({ values }) =>
                    !!values?.isChangeEmail || !!values?.isChangePassword
                }
                relevanceWhen={['isChangeEmail', 'isChangePassword']}
            >
                <fieldset className={classes.fieldset}>
                    <Relevant
                        when={({ values }) => !!values?.isChangeEmail}
                        relevanceWhen={['isChangeEmail']}
                    >
                        <Field
                            label={formatMessage({
                                id: 'global.emailAddress',
                                defaultMessage: 'E-mail Address'
                            })}
                            required
                        >
                            <TextInput
                                field="email"
                                validate={isRequired}
                                placeholder={formatMessage({
                                    id: 'global.enterEmailAddress',
                                    defaultMessage: 'Enter E-mail Address'
                                })}
                                disabled={isDisabled}
                            />
                        </Field>
                    </Relevant>
                    <Password
                        fieldName="password"
                        validate={combine([isRequired, validatePassword])}
                        required
                        label={formatMessage({
                            id: 'global.currentPassword',
                            defaultMessage: 'Current password'
                        })}
                        placeholder={formatMessage({
                            id: 'global.enterCurrentPassword',
                            defaultMessage: 'Enter Current Password'
                        })}
                        disabled={isDisabled}
                    />
                </fieldset>
            </Relevant>
            <Relevant
                when={({ values }) => !!values?.isChangePassword}
                relevanceWhen={['isChangePassword']}
            >
                <fieldset className={classes.fieldset}>
                    <Password
                        fieldName="newPassword"
                        validate={combine([
                            isRequired,
                            validatePassword,
                            [isNotEqualToField, 'password']
                        ])}
                        required
                        label={formatMessage({
                            id: 'global.newPassword',
                            defaultMessage: 'New Password'
                        })}
                        placeholder={formatMessage({
                            id: 'global.enterNewPassword',
                            defaultMessage: 'Enter New Password'
                        })}
                        disabled={isDisabled}
                    />
                    <Password
                        fieldName="confirmNewPassword"
                        validate={combine([
                            isRequired,
                            validatePassword,
                            [isEqualToField, 'newPassword']
                        ])}
                        required
                        label={formatMessage({
                            id: 'global.confirmNewPassword',
                            defaultMessage: 'Confirm New Password'
                        })}
                        placeholder={formatMessage({
                            id: 'global.confirmNewPassword',
                            defaultMessage: 'Confirm New Password'
                        })}
                        disabled={isDisabled}
                    />
                </fieldset>
            </Relevant>
            <fieldset className={classes.buttons}>
                <div className={classes.buttonWrap}>
                    <Button type="submit" priority="high" isLoading={isLoading}>
                        <FormattedMessage
                            id="global.save"
                            defaultMessage="Save"
                        />
                    </Button>
                </div>
            </fieldset>
            <GoogleReCaptcha {...recaptchaWidgetProps} />
        </Form>
    );
};

EditForm.propTypes = {
    initialValues: shape({
        firstname: string,
        lastname: string,
        email: string,
        date_of_birth: string,
        isChangeEmail: bool,
        isChangePassword: bool
    }),
    recaptchaWidgetProps: shape({
        containerElement: func,
        shouldRender: bool
    }),
    onSubmit: func.isRequired,
    isDisabled: bool,
    isLoading: bool,
    getFormApi: func
};

export default EditForm;
