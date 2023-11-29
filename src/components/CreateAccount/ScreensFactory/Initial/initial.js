import React from 'react';
import { FormattedMessage } from 'react-intl';

import InitialScreenForm from './Form';
import classes from './initial.module.css';
import { useInitialScreen } from './useInitialScreen';

const InitialScreen = () => {
    const { isLoading, handleSubmit } = useInitialScreen();

    return (
        <>
            <p className={classes.paragraph}>
                <FormattedMessage
                    id="initialScreen.description"
                    defaultMessage="First - let’s check if you’ve previously signed up in-store. If you have, we can link your accounts"
                />
            </p>
            <InitialScreenForm isLoading={isLoading} onSubmit={handleSubmit} />
        </>
    );
};

export default InitialScreen;
