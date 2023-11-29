import { Form } from 'informed';
import { bool, func } from 'prop-types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import combineValidators from '@magento/venia-ui/lib/util/combineValidators';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import TextInput from '@app/components/TextInput';
import {
    isPhone,
    isEmail,
    isRequired
} from '@app/overrides/venia-ui/util/formValidators';
import { phoneFormatter, phoneParser } from '@app/utils/formUtils';

import classes from './form.module.css';

const InitialScreenForm = props => {
    const { isLoading, onSubmit } = props;

    const { formatMessage } = useIntl();

    return (
        <Form className={classes.root} onSubmit={onSubmit}>
            <fieldset>
                <Field
                    classes={{
                        root: classes.field
                    }}
                    label={formatMessage({
                        id: 'initialScreenForm.phoneNumber',
                        defaultMessage: 'Phone number'
                    })}
                >
                    <TextInput
                        field="phone"
                        validate={combineValidators([isRequired, isPhone])}
                        formatter={phoneFormatter}
                        parser={phoneParser}
                        placeholder={formatMessage({
                            id: 'initialScreenForm.enterYourPhoneNumber',
                            defaultMessage: 'Enter your phone number'
                        })}
                        disabled={isLoading}
                    />
                </Field>
                <Field
                    classes={{
                        root: classes.field
                    }}
                    label={formatMessage({
                        id: 'initialScreenForm.emailAddress',
                        defaultMessage: 'E-mail address'
                    })}
                >
                    <TextInput
                        field="email"
                        validate={combineValidators([isRequired, isEmail])}
                        placeholder={formatMessage({
                            id: 'initialScreenForm.enterEmailAddress',
                            defaultMessage: 'Enter your e-mail address'
                        })}
                        disabled={isLoading}
                    />
                </Field>
            </fieldset>
            <Button
                classes={{
                    primary: classes.submitBtn
                }}
                type="submit"
                priority="high"
                isLoading={isLoading}
            >
                <FormattedMessage
                    id="initialScreenForm.submitButtonText"
                    defaultMessage="Continue"
                />
            </Button>
        </Form>
    );
};

InitialScreenForm.propTypes = {
    isLoading: bool,
    onSubmit: func.isRequired
};

export default InitialScreenForm;
