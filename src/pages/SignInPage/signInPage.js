import { APP_ROUTER_PATHS } from '@app-constants';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import Link from '@app/components/Link';
import SignIn from '@app/components/SignIn';

import classes from './signInPage.module.css';
import { useSignInPage } from './useSignInPage';

const SignInPage = () => {
    const { formatMessage } = useIntl();
    const { initialValues, isLoading } = useSignInPage();

    // Showing loader to avoid signin form to be shown before page reload
    // (in case logout is done from My Account page,
    // page is redirected to /sing-in and reload happens)
    // On signout, cartId is cleared and being set back after reload
    if (isLoading) {
        return fullPageLoadingIndicator;
    }

    return (
        <>
            <StoreTitle>
                {formatMessage({
                    id: 'signInPage.pageTitle',
                    defaultMessage: 'Sign In'
                })}
            </StoreTitle>
            <section className={classes.root}>
                <h1 className={classes.title}>
                    <FormattedMessage
                        id="signInPage.title"
                        defaultMessage="Sign In"
                    />
                </h1>
                <section className={classes.formWrapper}>
                    <SignIn initialValues={initialValues} />
                    <footer className={classes.links}>
                        <Link
                            className={classes.link}
                            to={APP_ROUTER_PATHS.createAccount}
                        >
                            <FormattedMessage
                                id="signInPage.createAnAccountText"
                                defaultMessage="Don't have an account?"
                            />
                        </Link>
                        <Link
                            className={classes.link}
                            to={APP_ROUTER_PATHS.forgotPassword}
                        >
                            <FormattedMessage
                                id="signInPage.forgotPasswordText"
                                defaultMessage="Forgot Password?"
                            />
                        </Link>
                    </footer>
                </section>
            </section>
        </>
    );
};

export default SignInPage;
