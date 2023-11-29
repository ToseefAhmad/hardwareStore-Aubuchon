import {
    APP_AUTH_MODAL_SIGN_IN_TAB_KEY,
    APP_AUTH_MODAL_SIGN_UP_TAB_KEY
} from '@app-constants';
import { oneOf } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useTailwindContext } from '@app/context/tailwind';

import classes from './content.shimmer.module.css';

const MOBILE_MAIN_BLOCK_HEIGHT = {
    [APP_AUTH_MODAL_SIGN_IN_TAB_KEY]: '340px',
    [APP_AUTH_MODAL_SIGN_UP_TAB_KEY]: '360px'
};

const MAIN_BLOCK_HEIGHT = {
    [APP_AUTH_MODAL_SIGN_IN_TAB_KEY]: '405px',
    [APP_AUTH_MODAL_SIGN_UP_TAB_KEY]: '436px'
};

const AuthModalContentShimmer = props => {
    const { initialTabKey } = props;

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    return (
        <>
            <header className={classes.header}>
                <Shimmer width="100%" height="34px" />
            </header>
            <div className={classes.main}>
                <Shimmer
                    width="100%"
                    height={
                        isMobile
                            ? MOBILE_MAIN_BLOCK_HEIGHT[initialTabKey]
                            : MAIN_BLOCK_HEIGHT[initialTabKey]
                    }
                />
            </div>
        </>
    );
};

AuthModalContentShimmer.propTypes = {
    initialTabKey: oneOf([
        APP_AUTH_MODAL_SIGN_IN_TAB_KEY,
        APP_AUTH_MODAL_SIGN_UP_TAB_KEY
    ]).isRequired
};

export default AuthModalContentShimmer;
