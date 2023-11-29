import LogRocket from 'logrocket';
import { useCallback } from 'react';
import Cookies from 'universal-cookie';

import { useAppContext } from '@magento/peregrine/lib/context/app';

// 30 minutes in ms
export const LOG_ROCKET_TTL = 30 * 60 * 1000;
// 2 minutes in ms
export const LOG_ROCKET_SESSION_TTL = 2 * 60 * 1000;

// Cookie prefixes used within the app
const COOKIE_LOG_ROCKET_TABS = '_lr_tabs_-';
const COOKIE_LOG_ROCKET_SESSION = '_lr_uf_-';

export const useLogRocket = () => {
    const [{ isAppRendered }] = useAppContext();

    const apiKey =
        (isAppRendered && globalThis?.UPWARD?.logRocketApiKey) || undefined;

    const shouldTrack = useCallback(() => {
        if (!apiKey) {
            return false;
        }

        // react-cookies do not refresh for some reason
        const cookies = new Cookies();
        const tabs = cookies.get(
            COOKIE_LOG_ROCKET_TABS + encodeURIComponent(apiKey)
        );
        const session = cookies.get(
            COOKIE_LOG_ROCKET_SESSION + encodeURIComponent(apiKey.split('/')[0])
        );

        if (!tabs) {
            return true;
        }

        const lastActivity = tabs['lastActivity'];
        const ttl = session ? LOG_ROCKET_TTL : LOG_ROCKET_SESSION_TTL;
        const now = Date.now();

        return now - lastActivity > ttl;
    }, [apiKey]);

    const initSession = useCallback(() => {
        if (!apiKey || LogRocket['_isInitialized']) {
            return;
        }

        LogRocket.init(apiKey, {
            console: { isEnabled: true, shouldAggregateConsoleErrors: true }
        });

        // react-cookies do not refresh for some reason
        const cookies = new Cookies();
        const aubuchonCid = cookies.get('aubuchon_cid');
        if (aubuchonCid) {
            LogRocket.identify(aubuchonCid);
        }
    }, [apiKey]);

    return {
        isEnabled: isAppRendered && !!apiKey,
        shouldTrack,
        initSession
    };
};
