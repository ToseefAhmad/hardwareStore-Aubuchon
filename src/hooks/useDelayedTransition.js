import { useApolloClient } from '@apollo/client';
import { useEffect, useRef } from 'react';
import { matchPath } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useRootComponents } from '@magento/peregrine/lib/context/rootComponents';
import { getRootComponent } from '@magento/peregrine/lib/talons/MagentoRoute/helpers';
import { getComponentData } from '@magento/peregrine/lib/util/magentoRouteData';
import { availableRoutes } from '@magento/venia-ui/lib/components/Routes/routes';

import operations from '@app/talons/MagentoRoute/magentoRoute.gql';

const DELAY_MESSAGE_PREFIX = 'DELAY:';

const useDelayedTransition = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    const client = useApolloClient();
    const { resolveUrlQuery } = operations;
    const [, setComponentMap] = useRootComponents();
    const [, appApi] = useAppContext();
    const { actions: appActions } = appApi;
    const { setPageLoading, setDelayedTransitionResolvedUrl } = appActions;
    const unblock = useRef();

    useEffect(() => {
        // Override globalThis.addEventListener to prevent binding beforeunload while we add our blocker
        const originalWindowAddEventListener = globalThis.addEventListener;
        globalThis.addEventListener = (type, listener, options) => {
            if (type === 'beforeunload') {
                return;
            }

            if (typeof originalWindowAddEventListener === 'function') {
                return originalWindowAddEventListener(type, listener, options);
            }
        };

        unblock.current = history.block(location => {
            let currentPath = pathname;

            if (process.env.USE_STORE_CODE_IN_URL === 'true') {
                const storeCodes = AVAILABLE_STORE_VIEWS.map(
                    store => `/?${store.store_code}`
                ).join('|');
                const regex = new RegExp(`^${storeCodes}`);
                currentPath = currentPath.replace(regex, '');
            }

            // Ignore query string changes
            if (location.pathname === currentPath) {
                return true;
            }

            // Ignore hardcoded routes
            const isInternalRoute = availableRoutes.some(
                ({ pattern: path, exact }) => {
                    return !!matchPath(location.pathname, {
                        path,
                        exact
                    });
                }
            );
            if (isInternalRoute) {
                return true;
            }

            return `${DELAY_MESSAGE_PREFIX}${location.pathname}`;
        });

        globalThis.addEventListener = originalWindowAddEventListener;

        return () => {
            if (typeof unblock.current === 'function') {
                unblock.current();
            }
        };
    }, [pathname, history]);

    useEffect(() => {
        globalThis.handleRouteChangeConfirmation = async (message, proceed) => {
            setDelayedTransitionResolvedUrl(undefined);

            if (globalThis.avoidDelayedTransition) {
                globalThis.avoidDelayedTransition = false;
                if (typeof unblock.current === 'function') {
                    unblock.current();
                }
                return proceed(true);
            }

            setPageLoading(true);
            const currentPathname = message.replace(DELAY_MESSAGE_PREFIX, '');

            const cacheQueryResult = await client.query({
                query: resolveUrlQuery,
                fetchPolicy: 'cache-only',
                nextFetchPolicy: 'cache-only',
                variables: { url: currentPathname }
            });

            /**
             * If we don't have cached results, we need to fetch from remote
             * Because we do remote fetch here, we don't need to do it in MagentoRoute component
             * Store the results from remote in redux state and
             * use it in MagentoRoute instead of making another remote request
             */
            const hasCacheQueryResult = !!cacheQueryResult?.data?.route;
            let networkQueryResult;
            if (!hasCacheQueryResult) {
                networkQueryResult = await client.query({
                    query: resolveUrlQuery,
                    fetchPolicy: 'cache-first',
                    nextFetchPolicy: 'cache-first',
                    variables: { url: currentPathname }
                });
                setDelayedTransitionResolvedUrl(networkQueryResult);
            }

            const { data } =
                (hasCacheQueryResult && cacheQueryResult) ||
                networkQueryResult ||
                {};
            const { route } = data || {};
            const { type, ...routeData } = route || {};

            if (type) {
                const rootComponent = await getRootComponent(type);
                setComponentMap(prevMap =>
                    new Map(prevMap).set(currentPathname, {
                        component: rootComponent,
                        ...getComponentData(routeData),
                        type
                    })
                );
            }

            setPageLoading(false);
            if (typeof unblock.current === 'function') {
                unblock.current();
            }
            proceed(true);
        };
    }, [
        client,
        resolveUrlQuery,
        setComponentMap,
        setDelayedTransitionResolvedUrl,
        setPageLoading
    ]);
};

export default useDelayedTransition;
