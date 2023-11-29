import { APP_ROUTER_PATHS } from '@app-constants';
import React from 'react';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

import CreateAccount from '@app/components/CreateAccount';
import Link from '@app/components/Link';

import classes from './createAccountPage.module.css';
import { useCreateAccountPage } from './useCreateAccountPage';

const CreateAccountPage = () => {
    useCreateAccountPage();

    return (
        <>
            <StoreTitle>Create an Account</StoreTitle>
            <section className={classes.root}>
                <h1 className={classes.title}>Create an Account</h1>
                <section className={classes.formWrapper}>
                    <CreateAccount />
                    <Link to={APP_ROUTER_PATHS.signIn} className={classes.link}>
                        Do you already have an account?
                    </Link>
                </section>
            </section>
        </>
    );
};

export default CreateAccountPage;
