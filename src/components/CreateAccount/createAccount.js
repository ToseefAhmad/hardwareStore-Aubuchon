import React from 'react';

import { CreateAccountContextProvider } from './context';
import ScreensFactory from './ScreensFactory';

const CreateAccount = () => {
    return (
        <CreateAccountContextProvider>
            <ScreensFactory />
        </CreateAccountContextProvider>
    );
};

export default CreateAccount;
