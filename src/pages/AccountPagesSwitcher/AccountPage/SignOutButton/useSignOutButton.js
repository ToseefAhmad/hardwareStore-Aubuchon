import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import SignOutButtonOperations from './signOutButton.gql';

export const useSignOutButton = () => {
    const {
        mutations: { signOutMutation }
    } = SignOutButtonOperations;

    const [
        ,
        {
            actions: { setIsLoading }
        }
    ] = useAppContext();

    const history = useHistory();

    const [{ currentUser }, { signOut }] = useUserContext();
    const [, { dispatch }] = useEventingContext();

    const [revokeToken] = useMutation(signOutMutation);

    const handleSignOut = useCallback(async () => {
        setIsLoading(true);
        await signOut({ revokeToken });
        dispatch({
            type: 'USER_SIGN_OUT',
            payload: currentUser
        });
        history.go(0);
    }, [currentUser, dispatch, history, revokeToken, setIsLoading, signOut]);

    return {
        handleSignOut
    };
};
