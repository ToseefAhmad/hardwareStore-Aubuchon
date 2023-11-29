import { Form } from 'informed';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useWindowSize } from '@magento/peregrine';
import GoogleRecaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import combineValidators from '@magento/venia-ui/lib/util/combineValidators';

import Button from '@app/components/Button';
import Checkbox from '@app/components/Checkbox';
import Field from '@app/components/Field';
import Link from '@app/components/Link';
import Password from '@app/components/Password';
import TextInput from '@app/components/TextInput';
import { APP_ROUTER_PATHS } from '@app/constants';
import { useTailwindContext } from '@app/context/tailwind';
import {
    isRequired,
    isEmail,
    isPhone
} from '@app/overrides/venia-ui/util/formValidators';
import { phoneFormatter, phoneParser } from '@app/utils/formUtils';
import { smoothScroll } from '@app/utils/smooth-scroll';

import classes from './regForm.module.css';
import { useRegForm } from './useRegForm';

const REQUIRED_FIELDS = [
    'email',
    'telephone',
    'password',
    'firstname',
    'lastname',
    'is_agree_with_policy'
];

const RegFormScreen = () => {
    const { formatMessage } = useIntl();
    const {
        initialValues,
        recaptchaWidgetProps,
        isLoading,
        isRecaptchaLoading: isDisabled,
        handleSubmit,
        isEmailFilled,
        isPhoneFilled
    } = useRegForm();
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;
    const mainSection = useRef();
    const [isAllFieldsFilledIn, setIsAllFieldsFilledIn] = useState(false);

    const submitFailureHandle = useCallback(errors => {
        const errorsKey = Object.keys(errors);
        const arraysIntersection = REQUIRED_FIELDS.filter(x =>
            errorsKey.includes(x)
        );
        const field = document.querySelector(
            `input[name=${arraysIntersection[0]}]`
        );
        const fieldContainer = field?.closest('[class^="regForm-field"]');

        smoothScroll({
            container: mainSection.current,
            to: {
                y:
                    fieldContainer?.offsetTop -
                        mainSection.current?.offsetTop || 0
            },
            duration: 0
        });
    }, []);

    /* Fix for issue with height on iphone for reg modal */
    useEffect(() => {
        if (!isMobile) return;

        const modalContainer = document.querySelector(
            '[class^="simpleModal-modalContainer"]'
        );

        if (modalContainer) {
            modalContainer.style.height = '100%';
        }

        return () => {
            if (modalContainer) {
                modalContainer.style.height = '';
            }
        };
    }, [isMobile]);

    const checkIfAllFieldsFilledIn = useCallback(formValues => {
        setIsAllFieldsFilledIn(
            !!(
                formValues?.password &&
                formValues?.firstname &&
                formValues?.lastname &&
                formValues?.is_agree_with_policy
            )
        );
    }, []);

    const hiddenFields = (
        <div className={classes.hiddenFields}>
            <Field
                classes={{
                    root: classes.field
                }}
                label={formatMessage({
                    id: 'regForm.emailAddress',
                    defaultMessage: 'E-mail address'
                })}
            >
                <TextInput
                    field="email"
                    autoComplete="email"
                    validate={combineValidators([isRequired, isEmail])}
                    placeholder={formatMessage({
                        id: 'regForm.enterEmailAddress',
                        defaultMessage: 'Enter your e-mail address'
                    })}
                    disabled={isEmailFilled}
                />
            </Field>
            <Field
                classes={{
                    root: classes.field
                }}
                label={formatMessage({
                    id: 'regForm.phoneNumber',
                    defaultMessage: 'Phone number'
                })}
            >
                <TextInput
                    field="telephone"
                    autoComplete="tel"
                    validate={combineValidators([isRequired, isPhone])}
                    formatter={phoneFormatter}
                    parser={phoneParser}
                    placeholder={formatMessage({
                        id: 'regForm.enterYourPhoneNumber',
                        defaultMessage: 'Enter your phone number'
                    })}
                    disabled={isPhoneFilled}
                />
            </Field>
        </div>
    );

    return (
        <Form
            className={classes.root}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onSubmitFailure={errors => submitFailureHandle(errors)}
            onValueChange={checkIfAllFieldsFilledIn}
        >
            <div className={classes.mainSection} ref={mainSection}>
                <fieldset className={classes.section}>
                    {/* Hidden fields could be kept, because we can get billing address from loyalty API*/}
                    {hiddenFields}
                    <Password
                        fieldName="password"
                        autoComplete="new-password"
                        label={formatMessage({
                            id: 'regForm.password',
                            defaultMessage: 'Password'
                        })}
                        placeholder={formatMessage({
                            id: 'regForm.password',
                            defaultMessage: 'Enter your password'
                        })}
                        fieldClasses={{
                            root: classes.field
                        }}
                        isToggleButtonHidden={false}
                        disabled={isDisabled}
                    />
                    <div className={classes.nameFieldWrapper}>
                        <Field
                            classes={{
                                root: classes.field
                            }}
                            label={formatMessage({
                                id: 'regForm.firstName',
                                defaultMessage: 'First name'
                            })}
                        >
                            <TextInput
                                field="firstname"
                                autoComplete="given-name"
                                validate={isRequired}
                                placeholder={formatMessage({
                                    id: 'regForm.enterFirstName',
                                    defaultMessage: 'Enter your first name'
                                })}
                                disabled={isDisabled}
                            />
                        </Field>
                        <Field
                            classes={{
                                root: classes.field
                            }}
                            label={formatMessage({
                                id: 'regForm.lastName',
                                defaultMessage: 'Last name'
                            })}
                        >
                            <TextInput
                                field="lastname"
                                autoComplete="family-name"
                                validate={isRequired}
                                placeholder={formatMessage({
                                    id: 'regForm.enterLastName',
                                    defaultMessage: 'Enter your last name'
                                })}
                                disabled={isDisabled}
                            />
                        </Field>
                    </div>
                    <Checkbox
                        field="is_agree_with_policy"
                        validate={isRequired}
                        disabled={isDisabled}
                        classes={{
                            root: classes.checkboxRoot
                        }}
                        isMessageOnNewLine={true}
                    >
                        <span className={classes.checkboxLabel}>
                            <FormattedMessage
                                id="regForm.privacyPolicyCheckboxText"
                                defaultMessage="I agree to"
                            />{' '}
                            <strong className={classes.checkboxLabelStrong}>
                                <Link
                                    to={APP_ROUTER_PATHS.termsAndConditions}
                                    priority="secondary"
                                    target="_blank"
                                >
                                    <FormattedMessage
                                        id="regForm.privacyPolicyCheckboxMembershipTerms"
                                        defaultMessage="Terms"
                                    />
                                </Link>
                                <FormattedMessage
                                    id="regForm.privacyPolicyCheckboxAndSymbol"
                                    defaultMessage=" & "
                                />
                                <Link
                                    to={APP_ROUTER_PATHS.privacyPolicy}
                                    priority="secondary"
                                    target="_blank"
                                >
                                    <FormattedMessage
                                        id="regForm.privacyPolicyCheckboxPrivacyPolicy"
                                        defaultMessage="Privacy Policy"
                                    />
                                </Link>
                            </strong>
                        </span>
                    </Checkbox>

                    <GoogleRecaptcha
                        {...recaptchaWidgetProps}
                        classes={{ root: classes.googleReCaptcha }}
                    />
                    <div className={classes.submitButtonContainer}>
                        <Button
                            type="submit"
                            priority="high"
                            isLoading={isLoading}
                            disabled={!isAllFieldsFilledIn}
                        >
                            <FormattedMessage
                                id="createAccountPageRegFormScreen.submitButtonText"
                                defaultMessage="Create an Account"
                            />
                        </Button>
                    </div>
                </fieldset>
            </div>
        </Form>
    );
};

export default RegFormScreen;
