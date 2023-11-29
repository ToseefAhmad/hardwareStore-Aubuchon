import { APP_ROUTER_PATHS } from '@app-constants';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useGuestRoute } from '@app/hooks/useGuestRoute';

export const useForgotPasswordPage = () => {
    const history = useHistory();

    useGuestRoute();

    const handleOnCancel = useCallback(() => {
        history.push(APP_ROUTER_PATHS.signIn);
    }, [history]);

    return {
        forgotPasswordProps: {
            onCancel: handleOnCancel
        }
    };
};
