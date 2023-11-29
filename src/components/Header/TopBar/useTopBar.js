import { APP_ROUTER_PATHS } from '@app-constants';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useTopBar = () => {
    const { pathname } = useLocation();

    const isShownAccountTrigger = useMemo(() => {
        const { signIn, createAccount, forgotPassword } = APP_ROUTER_PATHS;
        const paths = [signIn, createAccount, forgotPassword];

        return !paths.includes(pathname);
    }, [pathname]);

    return {
        isShownAccountTrigger
    };
};
