import LogRocket from 'logrocket';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import { useLogRocket } from '@app/hooks/useLogRocket/useLogRocket';

export const useIdentify = () => {
    const { isEnabled } = useLogRocket();
    const [cookies] = useCookies(['aubuchon_cid']);
    const [eventState] = useEventingContext();

    useEffect(() => {
        const subscription = eventState.subscribe(event => {
            if (
                event?.type === 'USER_SIGN_IN' &&
                isEnabled &&
                LogRocket['_isInitialized'] &&
                cookies.aubuchon_cid
            ) {
                LogRocket.identify(cookies.aubuchon_cid);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [cookies, eventState, isEnabled]);
};
