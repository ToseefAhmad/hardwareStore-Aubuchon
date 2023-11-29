import { useCallback } from 'react';
import { useCookies } from 'react-cookie';

export const useLoyaltyCustomerIdCookie = () => {
    const [, setCookie] = useCookies();

    const updateCookieValue = useCallback(
        cid => {
            if (cid) {
                setCookie('aubuchon_cid', cid, {
                    maxAge: 31536000,
                    path: '/'
                });
            }
        },
        [setCookie]
    );

    return { updateCookieValue };
};
