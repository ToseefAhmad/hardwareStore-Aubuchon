import React from 'react';

import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';

import classes from './signOutButton.module.css';
import { useSignOutButton } from './useSignOutButton';

const SignOutButton = () => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    const { handleSignOut } = useSignOutButton();

    return (
        <button
            className={isMobile ? classes.button : classes.link}
            onClick={handleSignOut}
            type="button"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
