import { useEffect, useState } from 'react';

import useScript from './useScript';

/**
 * Loads external script only once the app has been rendered for the first time
 * Attempt to improve first paint time
 */
export const useExternalScripts = () => {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        setIsRendered(true);
    }, []);

    useScript(
        isRendered && globalThis.UPWARD?.fbPixelId
            ? 'https://connect.facebook.net/en_US/fbevents.js'
            : null
    );
    useScript(
        isRendered && globalThis.UPWARD?.gtmId
            ? 'https://www.googletagmanager.com/gtm.js?id=' +
                  globalThis.UPWARD?.gtmId
            : null
    );
    useScript(
        isRendered && globalThis.UPWARD?.userwayAccountId
            ? 'https://cdn.userway.org/widget.js'
            : null,
        {
            'data-account': globalThis.UPWARD?.userwayAccountId
        }
    );
};
