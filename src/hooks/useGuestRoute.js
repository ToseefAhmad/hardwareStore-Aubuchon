import { APP_ROUTER_PATHS } from '@app-constants';
import { useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useUserContext } from '@app/context/user';

export const useGuestRoute = ({ redirect = false } = {}) => {
    const history = useHistory();
    const location = useLocation();
    const [{ isSignedIn }] = useUserContext();

    const historyState = useMemo(() => history?.location?.state || {}, [
        history
    ]);

    useEffect(() => {
        if (
            isSignedIn &&
            location.state?.from === APP_ROUTER_PATHS.orderHistory
        ) {
            history.replace(APP_ROUTER_PATHS.orderHistory, {
                ...location.state
            });
        } else if (isSignedIn) {
            const fromRedirectUrl = historyState.from || null;

            fromRedirectUrl && redirect
                ? history.replace(fromRedirectUrl)
                : history.replace(APP_ROUTER_PATHS.accountPage, {
                      ...location.state
                  });
        }
    }, [history, historyState, isSignedIn, location, redirect]);
};
