import { node } from 'prop-types';
import React, { createContext, useContext, useReducer, useMemo } from 'react';

import { CREATE_ACCOUNT_ACTIONS } from './createAccount.actions.types';
import { initialStateFragment, reducer } from './createAccount.reducer';

const CreateAccountContext = createContext();

export const CreateAccountContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStateFragment);

    const api = useMemo(() => {
        const {
            GO_TO_INITIAL_SCREEN,
            GO_TO_THAT_IS_ME_SCREEN,
            GO_TO_REG_FORM_SCREEN
        } = CREATE_ACCOUNT_ACTIONS;

        return {
            goToInitialScreen: () => dispatch({ type: GO_TO_INITIAL_SCREEN }),
            goToThatIsMeScreen: payload =>
                dispatch({ type: GO_TO_THAT_IS_ME_SCREEN, payload }),
            goToRegFormScreen: payload =>
                dispatch({ type: GO_TO_REG_FORM_SCREEN, payload })
        };
    }, []);

    return (
        <CreateAccountContext.Provider value={[state, api]}>
            {children}
        </CreateAccountContext.Provider>
    );
};

CreateAccountContextProvider.propTypes = {
    children: node
};

export const useCreateAccountContext = () => useContext(CreateAccountContext);
