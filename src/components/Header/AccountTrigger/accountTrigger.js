import {
    APP_AUTH_MODAL_SIGN_IN_TAB_KEY,
    APP_AUTH_MODAL_SIGN_UP_TAB_KEY
} from '@app-constants';
import React from 'react';
import { Loader } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { CSSTransition } from 'react-transition-group';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import Icon from '@app/components/Icon';
import { useAccountTrigger } from '@app/talons/Header/useAccountTrigger';

import AccountMenu from '../AccountMenu';
import classes from './accountTrigger.module.css';
import dropdownTransitions from './dropdownTransitions.module.css';

const AccountTrigger = () => {
    const {
        isSignedIn,
        currentUser,
        expanded,
        elementRef,
        triggerRef,
        handleToggleModal,
        handleToggleDropdown
    } = useAccountTrigger();
    const [, { dispatch }] = useEventingContext();

    const content = !isSignedIn ? (
        <>
            <button
                className={classes.trigger}
                onClick={() => {
                    handleToggleModal(APP_AUTH_MODAL_SIGN_IN_TAB_KEY);
                    dispatch({
                        type: 'USER_SIGN_IN_CLICK',
                        payload: {}
                    });
                }}
            >
                <FormattedMessage id="global.signIn" defaultMessage="Sign In" />
            </button>
            <button
                className={classes.trigger}
                onClick={() => {
                    handleToggleModal(APP_AUTH_MODAL_SIGN_UP_TAB_KEY);
                    dispatch({
                        type: 'USER_CREATE_ACCOUNT_CLICK',
                        payload: {}
                    });
                }}
            >
                <FormattedMessage
                    id="global.register"
                    defaultMessage="Register"
                />
            </button>
        </>
    ) : (
        <>
            <button className={classes.trigger} onClick={handleToggleDropdown}>
                {!currentUser.firstname ? (
                    <Icon classes={{ icon: classes.loaderIcon }} src={Loader} />
                ) : (
                    <>Hi, {currentUser.firstname}!</>
                )}
            </button>
            <CSSTransition
                in={expanded}
                classNames={{ ...dropdownTransitions }}
                timeout={150}
                unmountOnExit
            >
                <AccountMenu
                    ref={elementRef}
                    handleToggleDropdown={handleToggleDropdown}
                />
            </CSSTransition>
        </>
    );

    return (
        <>
            <div className={classes.root} ref={triggerRef}>
                {content}
            </div>
        </>
    );
};

export default AccountTrigger;
