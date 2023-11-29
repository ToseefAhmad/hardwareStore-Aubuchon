import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

import ForgotPassword from '@app/components/ForgotPassword';

import classes from './forgotPasswordPage.module.css';
import { useForgotPasswordPage } from './useForgotPasswordPage';

const ForgotPasswordPage = () => {
    const { formatMessage } = useIntl();
    const { forgotPasswordProps } = useForgotPasswordPage();

    return (
        <>
            <StoreTitle>
                {formatMessage({
                    id: 'forgotPasswordPage.title',
                    defaultMessage: 'Forgot Your Password?'
                })}
            </StoreTitle>
            <section className={classes.root}>
                <h1 className={classes.title}>
                    <FormattedMessage
                        id="forgotPasswordPage.header"
                        defaultMessage="Forgot Your Password?"
                    />
                </h1>
                <section className={classes.formWrapper}>
                    <ForgotPassword {...forgotPasswordProps} />
                </section>
            </section>
        </>
    );
};

export default ForgotPasswordPage;
