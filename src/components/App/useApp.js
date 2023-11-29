import { APP_ROUTER_PATHS } from '@app-constants';
import { useCallback, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import errorRecord from '@magento/peregrine/lib/util/createErrorRecord';

import { getLayoutCode } from '@app/components/App';
import { useCustomerDetails } from '@app/hooks/useCustomerDetails/useCustomerDetails';
import { useExternalScripts } from '@app/hooks/useExternalScripts';
import {
    useRandomSession as initLogRocket,
    useIdentify as useLogRocketIdentify
} from '@app/hooks/useLogRocket';
import { usePWAManifest } from '@app/hooks/usePWAManifest';

const dismissers = new WeakMap();

// Memoize dismisser funcs to reduce re-renders from func identity change.
const getErrorDismisser = (error, onDismissError) => {
    return dismissers.has(error)
        ? dismissers.get(error)
        : dismissers.set(error, () => onDismissError(error)).get(error);
};

/**
 * Talon that handles effects for App and returns props necessary for rendering
 * the app.
 *
 * @param {Function} props.handleError callback to invoke for each error
 * @param {Function} props.handleIsOffline callback to invoke when the app goes offline
 * @param {Function} props.handleIsOnline callback to invoke wen the app goes online
 * @param {Function} props.handleHTMLUpdate callback to invoke when a HTML update is available
 * @param {Function} props.markErrorHandled callback to invoke when handling an error
 * @param {Function} props.renderError an error that occurs during rendering of the app
 * @param {Function} props.unhandledErrors errors coming from the error reducer
 *
 * @returns {{ hasOverlay: boolean,handleCloseDrawer: function }}
 */
export const useApp = props => {
    const {
        handleError,
        handleIsOffline,
        handleIsOnline,
        markErrorHandled,
        renderError,
        unhandledErrors
    } = props;

    const history = useHistory();
    const location = useLocation();

    const [
        { hasBeenOffline, isOnline, overlay },
        { closeDrawer, setAppIsRendered }
    ] = useAppContext();

    const layoutCode = getLayoutCode({ currentPath: location.pathname });

    const reload = useCallback(() => {
        if (process.env.NODE_ENV !== 'development') {
            history.go(0);
        }
    }, [history]);

    const renderErrors = useMemo(
        () =>
            renderError
                ? [
                      errorRecord(
                          renderError,
                          globalThis,
                          useApp,
                          renderError.stack
                      )
                  ]
                : [],
        [renderError]
    );
    const errors = renderError ? renderErrors : unhandledErrors;
    const handleDismissError = renderError ? reload : markErrorHandled;

    const handleCloseDrawer = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    // A Callback handler to update state after intial render
    const handleSetAppIsRendered = useCallback(() => {
        setAppIsRendered();
    }, [setAppIsRendered]);

    // Only add toasts for errors if the errors list changes. Since `addToast`
    // and `toasts` changes each render we cannot add it as an effect dependency
    // otherwise we infinitely loop.
    useEffect(() => {
        for (const { error, id, loc } of errors) {
            handleError(
                error,
                id,
                loc,
                getErrorDismisser(error, handleDismissError)
            );
        }
    }, [errors, handleDismissError, handleError]);

    useEffect(() => {
        if (hasBeenOffline) {
            if (isOnline) {
                handleIsOnline();
            } else {
                handleIsOffline();
            }
        }
    }, [handleIsOnline, handleIsOffline, hasBeenOffline, isOnline]);

    useEffect(() => {
        setTimeout(() => {
            /*
                MagentoRoute usually clears this data on its own.

                But there is a case where MagentoRoute won't be mounted (static React route),
                but INLINED_PAGE_TYPE will be present (historic redirect present that matches static route).

                For instances like these, we need to make sure INLINED_PAGE_TYPE is cleared before navigation happens.
                Otherwise, navigating to MagentoRoute will cause stale data to be used
                and content to be empty or incorrect.

                Lastly, setTimeout is a safety net for MagentoRoute to process this data and reset it on its own,
                if entry-point uses MagentoRoute.
             */
            globalThis.INLINED_PAGE_TYPE = false;
        });
    }, []);

    useEffect(() => {
        if (location.pathname === APP_ROUTER_PATHS.cart) {
            history.replace(APP_ROUTER_PATHS.home, {
                ...location.state
            });
        }
    }, [history, location]);

    useExternalScripts();
    usePWAManifest();
    useCustomerDetails();
    initLogRocket();
    useLogRocketIdentify();

    return {
        hasOverlay: !!overlay,
        layoutCode,
        handleCloseDrawer,
        handleSetAppIsRendered
    };
};
