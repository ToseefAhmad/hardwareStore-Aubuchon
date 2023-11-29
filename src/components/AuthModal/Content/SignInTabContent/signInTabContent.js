import { func } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LinkButton from '@app/components/LinkButton';
import SignIn from '@app/components/SignIn';

import classes from './signInTabContent.module.css';
import { useSignInTabContent } from './useSignInTabContent';

const SignInTabContent = props => {
    const { onLinkBtnClick } = props;

    const { initialValues, warningText } = useSignInTabContent();

    return (
        <>
            <SignIn initialValues={initialValues} warningText={warningText} />
            <LinkButton
                classes={{
                    rootSecondary: classes.linkBtn
                }}
                onPress={onLinkBtnClick}
            >
                <FormattedMessage
                    id="authModal.forgotPasswordText"
                    defaultMessage="Forgot your password?"
                />
            </LinkButton>
        </>
    );
};

SignInTabContent.propTypes = {
    onLinkBtnClick: func.isRequired
};

export default SignInTabContent;
