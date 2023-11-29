import { useFieldState } from 'informed';
import { bool } from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import combineValidators from '@magento/venia-ui/lib/util/combineValidators';

import Field from '@app/components/Field';
import RadioGroup from '@app/components/RadioGroup';
import TextInput from '@app/components/TextInput';
import {
    isEmail,
    isPhone,
    isRequired
} from '@app/overrides/venia-ui/util/formValidators';
import { phoneFormatter, phoneParser } from '@app/utils/formUtils';

import classes from './pickupPerson.module.css';
import { usePickupPerson } from './usePickupPerson';

const FIELD_NAME = 'pickupPerson';

const PickupPerson = props => {
    const { disabled } = props;
    const fieldState = useFieldState(FIELD_NAME);
    const { formatMessage } = useIntl();
    const { handleEvent } = usePickupPerson({ fieldName: FIELD_NAME });

    return (
        <div className={classes.root}>
            <RadioGroup
                field={FIELD_NAME}
                disabled={disabled}
                validate={value => isRequired(value)}
                items={[
                    {
                        label: 'I’ll pick this order up myself',
                        value: '0'
                    },
                    {
                        label: 'Someone else will pick up this order',
                        value: '1'
                    }
                ]}
                classes={{
                    radioContainerActive: classes.radioMobileActive
                }}
                onBlur={() => {
                    handleEvent();
                }}
            />
            {fieldState?.value === '1' && (
                <fieldset className={classes.pickupPerson}>
                    <Field
                        label={formatMessage({
                            id: 'pickupStep.emailAddress',
                            defaultMessage: 'E-mail Address'
                        })}
                        classes={{
                            root: classes.fieldRoot
                        }}
                    >
                        <TextInput
                            autoComplete="off"
                            field="pickupEmail"
                            placeholder={formatMessage({
                                id: 'pickupStep.enterEmailAddress',
                                defaultMessage: 'Enter e-mail address'
                            })}
                            validate={combineValidators([isRequired, isEmail])}
                        />
                    </Field>
                    <Field
                        label={formatMessage({
                            id: 'pickupStep.phoneNumber',
                            defaultMessage: 'Phone Number'
                        })}
                        classes={{
                            root: classes.fieldRoot
                        }}
                    >
                        <TextInput
                            autoComplete="off"
                            field="pickupPhone"
                            placeholder={formatMessage({
                                id: 'pickupStep.enterPhoneNumber',
                                defaultMessage: 'Enter phone number'
                            })}
                            validate={combineValidators([isRequired, isPhone])}
                            formatter={phoneFormatter}
                            parser={phoneParser}
                        />
                    </Field>
                    <Field
                        label={formatMessage({
                            id: 'pickupStep.firstName',
                            defaultMessage: 'First Name'
                        })}
                        classes={{
                            root: classes.fieldRoot
                        }}
                    >
                        <TextInput
                            autoComplete="off"
                            field="pickupFirstname"
                            placeholder={formatMessage({
                                id: 'pickupStep.enterFirstName',
                                defaultMessage: 'Enter first name'
                            })}
                            validate={combineValidators([isRequired])}
                        />
                    </Field>
                    <Field
                        label={formatMessage({
                            id: 'pickupStep.lastName',
                            defaultMessage: 'Last Name'
                        })}
                        classes={{
                            root: classes.fieldRoot
                        }}
                    >
                        <TextInput
                            autoComplete="off"
                            field="pickupLastname"
                            placeholder={formatMessage({
                                id: 'pickupStep.enterLastName',
                                defaultMessage: 'Enter last name'
                            })}
                            validate={combineValidators([isRequired])}
                        />
                    </Field>
                </fieldset>
            )}
        </div>
    );
};

PickupPerson.propTypes = {
    disabled: bool
};

PickupPerson.defaultProps = {
    disabled: false
};

export default PickupPerson;
