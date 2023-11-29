import SubscribeToEvents from '@magebit/events';
import LogRocket from 'logrocket';
import { array, func, shape, string } from 'prop-types';
import React, { Suspense, useCallback, useEffect } from 'react';
import {
    AlertCircle as AlertCircleIcon,
    CloudOff as CloudOffIcon,
    Wifi as WifiIcon
} from 'react-feather';
import { useIntl } from 'react-intl';

import { useToasts } from '@magento/peregrine';
import useDelayedTransition from '@magento/peregrine/lib/hooks/useDelayedTransition';
import {
    HeadProvider,
    StoreTitle
} from '@magento/venia-ui/lib/components/Head';
import Mask from '@magento/venia-ui/lib/components/Mask';
import ToastContainer from '@magento/venia-ui/lib/components/ToastContainer';
import globalCSS from '@magento/venia-ui/lib/index.module.css';

import Icon from '@app/components/Icon';
import Main from '@app/components/Main';

import { APP_LAYOUT_COMPONENTS } from './layouts/config';
import { useApp } from './useApp';

const OnlineIcon = <Icon src={WifiIcon} attrs={{ width: 18 }} />;
const OfflineIcon = <Icon src={CloudOffIcon} attrs={{ width: 18 }} />;
const ErrorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

const App = props => {
    const { markErrorHandled, renderError, unhandledErrors } = props;

    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    useDelayedTransition();

    const ERROR_MESSAGE = formatMessage({
        id: 'app.errorUnexpected',
        defaultMessage: 'Sorry! An unexpected error occurred.'
    });

    const handleIsOffline = useCallback(() => {
        addToast({
            type: 'error',
            icon: OfflineIcon,
            message: formatMessage({
                id: 'app.errorOffline',
                defaultMessage:
                    'You are offline. Some features may be unavailable.'
            }),
            timeout: 3000
        });
    }, [addToast, formatMessage]);

    const handleIsOnline = useCallback(() => {
        addToast({
            type: 'info',
            icon: OnlineIcon,
            message: formatMessage({
                id: 'app.infoOnline',
                defaultMessage: 'You are online.'
            }),
            timeout: 3000
        });
    }, [addToast, formatMessage]);

    const handleError = useCallback(
        (error, id, loc, handleDismissError) => {
            const errorMessage = `${ERROR_MESSAGE}\nDebug: ${id} ${loc}`;

            const errorToastProps = {
                icon: ErrorIcon,
                message: errorMessage,
                onDismiss: remove => {
                    handleDismissError();
                    remove();
                },
                timeout: 15000,
                type: 'error'
            };

            addToast(errorToastProps);

            LogRocket['_isInitialized'] &&
                LogRocket.captureException(error, {
                    extra: {
                        generatedMessage:
                            errorMessage ||
                            'no generated error message available',
                        id: id || 'no error id available',
                        loc: loc || 'no error location available',
                        errorMessage:
                            error?.message || 'no error message available',
                        errorName: error?.name || 'no error name available',
                        errorStack: error?.stack || 'no error stack available'
                    }
                });
        },
        [ERROR_MESSAGE, addToast]
    );

    const {
        hasOverlay,
        layoutCode,
        handleCloseDrawer,
        handleSetAppIsRendered
    } = useApp({
        handleError,
        handleIsOffline,
        handleIsOnline,
        markErrorHandled,
        renderError,
        unhandledErrors
    });
    const LayoutComponent = APP_LAYOUT_COMPONENTS[layoutCode];

    // Update satet for isAppRendered
    useEffect(() => {
        handleSetAppIsRendered();
    }, [handleSetAppIsRendered]);

    if (renderError) {
        return (
            <HeadProvider>
                <StoreTitle />
                <Main isMasked={true} />
                <Mask isActive={true} />
                <ToastContainer />
            </HeadProvider>
        );
    }

    return (
        <Suspense fallback={null}>
            <SubscribeToEvents />
            <LayoutComponent
                hasOverlay={hasOverlay}
                handleCloseDrawer={handleCloseDrawer}
            />
        </Suspense>
    );
};

App.propTypes = {
    markErrorHandled: func.isRequired,
    renderError: shape({
        stack: string
    }),
    unhandledErrors: array
};

App.globalCSS = globalCSS;

export default App;
