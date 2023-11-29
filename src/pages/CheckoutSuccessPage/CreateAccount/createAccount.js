import { Form } from 'informed';
import { arrayOf, shape, string, number } from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import combine from '@magento/venia-ui/lib/util/combineValidators';

import Button from '@app/components/Button';
import GoogleReCaptcha from '@app/components/GoogleReCaptcha';
import Icon from '@app/components/Icon';
import { ProfileLarge, InfoFilled } from '@app/components/Icons';
import Password from '@app/components/Password';
import {
    hasLengthAtLeast,
    isRequired,
    validatePassword
} from '@app/overrides/venia-ui/util/formValidators';

import classes from './createAccount.module.css';
import Modal from './Modal';
import { useCreateAccount } from './useCreateAccount';

const CreateAccount = ({ cartData }) => {
    const {
        state: { isLoading, formError },
        handleSubmit,
        handleSignUp,
        handleCancel,
        userList,
        password,
        recaptchaWidgetProps,
        signUpData
    } = useCreateAccount({ cartData });
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root}>
            <div className={classes.icon}>
                <ProfileLarge />
            </div>
            <div className={classes.content}>
                <p className={classes.title}>Create account</p>
                <p className={classes.text}>
                    Get special deals & rewards by making account. Enter
                    password below to make account.
                </p>
                <Form className={classes.form} onSubmit={handleSubmit}>
                    <Password
                        fieldName="createAccountPassword"
                        validate={combine([
                            isRequired,
                            validatePassword,
                            [hasLengthAtLeast, 8]
                        ])}
                        required
                        placeholder={formatMessage({
                            id: 'global.enterPassword',
                            defaultMessage: 'Enter password'
                        })}
                        disabled={isLoading}
                        fieldClasses={{
                            label: classes.label
                        }}
                        classes={{
                            rootError: classes.rootError,
                            eyeButton: classes.eyeButton
                        }}
                        isToggleButtonHidden={false}
                    />
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Create Account
                    </Button>
                    <GoogleReCaptcha {...recaptchaWidgetProps} />
                    {formError && (
                        <div className={classes.formError}>
                            <Icon
                                classes={{ icon: classes.formErrorIcon }}
                                src={InfoFilled}
                            />
                            <p className={classes.formErrorText}>{formError}</p>
                        </div>
                    )}
                </Form>
            </div>
            <Modal
                handleSignUp={handleSignUp}
                handleCancel={handleCancel}
                userList={userList}
                password={password}
                signUpData={signUpData}
            />
        </div>
    );
};

CreateAccount.propTypes = {
    cartData: shape({
        id: string,
        email: string,
        billing_address: shape({
            telephone: string,
            firstname: string,
            lastname: string,
            street: arrayOf(string),
            city: string,
            postcode: string,
            country: shape({
                label: string
            }),
            region: shape({
                region_id: number
            })
        })
    })
};

export default CreateAccount;
