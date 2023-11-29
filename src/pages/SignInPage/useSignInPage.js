import { useMemo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { useGuestRoute } from '@app/hooks/useGuestRoute';

export const useSignInPage = () => {
    const history = useHistory();
    const location = useLocation();
    const [{ isLoading }] = useAppContext();

    useGuestRoute({
        redirect: true
    });

    const initialValues = useMemo(() => {
        const value = {
            email: ''
        };

        if (location.state?.email) {
            value.email = location.state.email;
        }

        return value;
    }, [location]);

    /**
     * Removing email value from router state after saving it into component state
     */
    useEffect(() => {
        if (initialValues.email && location.state?.email) {
            const state = { ...location.state };

            delete state.email;
            history.replace({ ...location, state });
        }
    }, [initialValues.email, history, location]);

    useEffect(() => {
        globalThis.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return {
        initialValues,
        isLoading
    };
};
