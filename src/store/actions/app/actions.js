import { createActions } from 'redux-actions';

const prefix = 'APP';
const actionTypes = [
    'TOGGLE_DRAWER',
    'SET_ONLINE',
    'SET_OFFLINE',
    'TOGGLE_SEARCH',
    'EXECUTE_SEARCH',
    'MARK_ERROR_HANDLED',
    'SET_PAGE_LOADING',
    'SET_APP_IS_RENDERED',
    'SET_NEXT_ROOT_COMPONENT',
    'SET_DELAYED_TRANSITION_RESOLVED_URL',
    'SET_IS_SEARCH_HIDDEN',
    'SET_SCROLL_ON_TOP_OFFSET',
    'SET_PREVIOUS_PLP_SCROLL',
    'SET_SEARCH_VALUE',
    'SET_ARE_SEARCH_SUGGESTIONS_SHOWN',
    'SET_LOGIN_CALLBACK',
    'START_SUBMIT_ANIMATION',
    'CLOSE_SUBMIT_ANIMATION',
    'TOGGLE_MODAL',
    'SET_IS_LOADING'
];

export default createActions(...actionTypes, { prefix });
