import { createActions } from 'redux-actions';

const prefix = 'PICKUP_STORE';

const actionMap = {
    GET_PICKUP_STORE_DETAILS: {
        REQUEST: null,
        RECEIVE: null
    }
};

const actionTypes = ['UPDATE_USER_LOCATION', 'RESET'];

export default createActions(actionMap, ...actionTypes, { prefix });
