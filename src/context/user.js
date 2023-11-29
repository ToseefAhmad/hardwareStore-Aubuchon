import { bool, func, instanceOf, node, shape, string } from 'prop-types';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import bindActionCreators from '@magento/peregrine/lib/util/bindActionCreators';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

import actions from '@app/store/actions/user/actions';
import * as asyncActions from '@app/store/actions/user/asyncActions';

const UserContext = createContext();

const UserContextProvider = props => {
    const { actions, asyncActions, children, userState } = props;

    const userApi = useMemo(
        () => ({
            actions,
            ...asyncActions
        }),
        [actions, asyncActions]
    );

    const contextValue = useMemo(() => [userState, userApi], [
        userApi,
        userState
    ]);

    useEffect(() => {
        // check if the user's token is not expired
        const storage = new BrowserPersistence();
        const item = storage.getRawItem('signin_token');

        if (item) {
            const { ttl, timeStored } = JSON.parse(item);
            const now = Date.now();

            // if the token's TTYL has expired, we need to sign out
            if (ttl && now - timeStored > ttl * 1000) {
                asyncActions.signOut();
            }
        }
    }, [asyncActions]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    actions: shape({
        clearToken: func,
        createAccount: shape({
            request: func,
            receive: func
        }),
        getDetails: shape({
            request: func,
            receive: func
        }),
        reset: func,
        resetPassword: shape({
            request: func,
            receive: func
        }),
        setSignInStatus: func,
        setToken: func,
        signIn: shape({
            request: func,
            receive: func
        })
    }),
    asyncActions: shape({
        clearToken: func,
        getUserDetails: func,
        resetPassword: func,
        setToken: func,
        signOut: func
    }),
    children: node,
    userState: shape({
        currentUser: shape({
            email: string,
            firstname: string,
            lastname: string,
            telephone: string
        }),
        getDetailsError: instanceOf(Error),
        isGettingDetails: bool,
        isResettingPassword: bool,
        isSignedIn: bool,
        resetPasswordError: instanceOf(Error),
        token: string
    })
};

const mapStateToProps = ({ user }) => ({ userState: user });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    asyncActions: bindActionCreators(asyncActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserContextProvider);

/**
 * @typedef {Object} CurrentUser
 *
 * @property {string} email Current user's email
 * @property {string} firstname Current user's first name
 * @property {string} lastname Current user's last name
 * @property {string} telephone Current user's telephone
 */

/**
 * @typedef {Object} UserState
 *
 * @property {CurrentUser} currentUser Current user details
 * @property {Error} getDetailsError Get Details call related error
 * @property {boolean} isGettingDetails Boolean if true indicates that user details are being fetched. False otherwise.
 * @property {boolean} isResettingPassword Deprecated
 * @property {boolean} isSignedIn Boolean if true indicates that the user is signed in. False otherwise.
 * @property {Error} resetPasswordError Deprecated
 * @property {string} token User token
 *
 */

/**
 * @typedef {Object} UserActions
 *
 * @property {Function} clearToken Callback to clear user token in browser persistence storage
 * @property {Function} getUserDetails Callback to get user details
 * @property {Function} resetPassword Deprecated
 * @property {Function} setToken Callback to set user token in browser persistence storage
 * @property {Function} signOut Callback to sign the user out
 * @property {Function} actions.setSignInStatus Callback to set user sign in status
 */

/**
 * @returns {[UserState, UserActions]}
 */
export const useUserContext = () => useContext(UserContext);
