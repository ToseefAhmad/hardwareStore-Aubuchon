import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useUserContext } from '@app/context/user';

export const useCreateAccountPage = () => {
    const [{ isSignedIn }] = useUserContext();
    const history = useHistory();

    useEffect(() => {
        isSignedIn && history.push('/account');
    }, [isSignedIn, history]);
};
