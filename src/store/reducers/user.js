import { handleActions } from 'redux-actions';

import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

const storage = new BrowserPersistence();

import actions from '../actions/user';

export const name = 'user';

const rawSignInToken = storage.getRawItem('signin_token');

const isSignedIn = () => !!rawSignInToken;

const getToken = () => {
    if (!rawSignInToken) {
        return undefined;
    }
    const { value } = JSON.parse(rawSignInToken);
    return value;
};

const initialState = {
    currentUser: {
        email: '',
        firstname: '',
        lastname: ''
    },
    getDetailsError: null,
    isGettingDetails: false,
    isResettingPassword: false,
    isSignedIn: isSignedIn(),
    resetPasswordError: null,
    token: getToken()
};

const reducerMap = {
    [actions.setToken]: (state, { payload }) => {
        return {
            ...state,
            token: payload
        };
    },
    [actions.clearToken]: state => {
        return {
            ...state,
            token: null
        };
    },
    [actions.setSignInStatus]: (state, { payload }) => {
        return {
            ...state,
            isSignedIn: payload
        };
    },
    [actions.getDetails.request]: state => {
        return {
            ...state,
            getDetailsError: null,
            isGettingDetails: true
        };
    },
    [actions.getDetails.receive]: (state, { payload, error }) => {
        if (error) {
            return {
                ...state,
                getDetailsError: payload,
                isGettingDetails: false
            };
        }

        return {
            ...state,
            currentUser: payload,
            getDetailsError: null,
            isGettingDetails: false
        };
    },
    [actions.resetPassword.request]: state => ({
        ...state,
        isResettingPassword: true
    }),
    // @todo: handle the reset password response from the API.
    [actions.resetPassword.receive]: (state, { payload, error }) => {
        if (error) {
            return {
                ...state,
                isResettingPassword: false,
                resetPasswordError: payload
            };
        }

        return {
            ...state,
            isResettingPassword: false,
            resetPasswordError: null
        };
    },
    [actions.reset]: () => {
        return {
            ...initialState,
            isSignedIn: false,
            token: null
        };
    }
};

export default handleActions(reducerMap, initialState);
