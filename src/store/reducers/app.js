import { handleActions } from 'redux-actions';

import actions from '../actions/app';

export const name = 'app';

// as far as the server is concerned, the app is always online
const isServer = !globalThis.navigator;
const isOnline = !isServer && navigator.onLine;
const hasBeenOffline = !isServer && !navigator.onLine;

const initialState = {
    drawer: null,
    hasBeenOffline,
    loginCallback: () => {},
    modal: {
        identifier: undefined,
        props: undefined
    },
    isOnline,
    isPageLoading: false,
    overlay: false,
    isAppRendered: false,
    pending: {},
    searchOpen: false,
    nextRootComponent: null,
    delayedTransitionResolvedUrl: undefined,
    isSearchHidden: false,
    scrollOnTopOffset: 0,
    previousPlpScroll: { position: { x: 0, y: 72 }, uri: null },
    searchValue: '',
    areSearchSuggestionsShown: false,
    submitAnimation: {
        isOpen: false,
        config: {}
    },
    isLoading: false
};

const reducerMap = {
    [actions.toggleDrawer]: (state, { payload }) => {
        return {
            ...state,
            drawer: payload,
            overlay: !!payload
        };
    },
    [actions.toggleSearch]: state => {
        return {
            ...state,
            searchOpen: !state.searchOpen
        };
    },
    [actions.setOnline]: state => {
        return {
            ...state,
            isOnline: true
        };
    },
    [actions.setOffline]: state => {
        return {
            ...state,
            isOnline: false,
            hasBeenOffline: true
        };
    },
    [actions.setPageLoading]: (state, { payload }) => {
        return {
            ...state,
            isPageLoading: !!payload
        };
    },
    [actions.setAppIsRendered]: state => {
        return {
            ...state,
            isAppRendered: true
        };
    },
    [actions.setNextRootComponent]: (state, { payload }) => {
        return {
            ...state,
            nextRootComponent: payload
        };
    },
    [actions.setDelayedTransitionResolvedUrl]: (state, { payload }) => {
        return {
            ...state,
            delayedTransitionResolvedUrl: payload
        };
    },
    [actions.setIsSearchHidden]: (state, { payload }) => {
        return {
            ...state,
            isSearchHidden: payload
        };
    },
    [actions.setScrollOnTopOffset]: (state, { payload }) => {
        return {
            ...state,
            scrollOnTopOffset: payload
        };
    },
    [actions.setPreviousPlpScroll]: (state, { payload }) => {
        return {
            ...state,
            previousPlpScroll: payload
        };
    },
    [actions.setSearchValue]: (state, { payload }) => {
        return {
            ...state,
            searchValue: payload
        };
    },
    [actions.setAreSearchSuggestionsShown]: (state, { payload }) => {
        return {
            ...state,
            areSearchSuggestionsShown: payload
        };
    },
    [actions.setLoginCallback]: (state, { payload }) => {
        return {
            ...state,
            loginCallback: payload
        };
    },
    [actions.startSubmitAnimation]: (state, { payload }) => {
        return {
            ...state,
            submitAnimation: {
                isOpen: true,
                config: payload
            }
        };
    },
    [actions.closeSubmitAnimation]: state => {
        return {
            ...state,
            submitAnimation: {
                isOpen: false
            }
        };
    },
    [actions.toggleModal]: (state, { payload }) => {
        return {
            ...state,
            modal: payload?.identifier
                ? payload
                : {
                      identifier: undefined,
                      props: undefined
                  }
        };
    },
    [actions.setIsLoading]: (state, { payload }) => {
        return {
            ...state,
            isLoading: payload
        };
    }
};

export default handleActions(reducerMap, initialState);
