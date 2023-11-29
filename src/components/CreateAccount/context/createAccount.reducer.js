import { CREATE_ACCOUNT_ACTIONS } from './createAccount.actions.types';
import { CREATE_ACCOUNT_SCREENS } from './createAccount.consts';

const { INITIAL, THAT_IS_ME, REG_FORM } = CREATE_ACCOUNT_SCREENS;
const {
    GO_TO_INITIAL_SCREEN,
    GO_TO_THAT_IS_ME_SCREEN,
    GO_TO_REG_FORM_SCREEN
} = CREATE_ACCOUNT_ACTIONS;

export const initialStateFragment = {
    currentScreen: INITIAL,
    userList: [],
    regFormInitialValues: {}
};

export const reducer = (state, action) => {
    switch (action.type) {
        case GO_TO_INITIAL_SCREEN:
            return {
                ...state,
                currentScreen: INITIAL,
                userList: [],
                regFormInitialValues: {}
            };
        case GO_TO_THAT_IS_ME_SCREEN:
            return {
                ...state,
                ...action.payload,
                currentScreen: THAT_IS_ME
            };
        case GO_TO_REG_FORM_SCREEN:
            return {
                ...state,
                currentScreen: REG_FORM,
                userList: [],
                regFormInitialValues: { ...action.payload }
            };
        default:
            throw new Error(
                '[CreateAccountContextProvider]: Unknown action type!'
            );
    }
};
