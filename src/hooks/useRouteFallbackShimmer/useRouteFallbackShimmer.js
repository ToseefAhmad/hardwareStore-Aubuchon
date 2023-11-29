import React, { useMemo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import { availableRoutes } from '@magento/venia-ui/lib/components/Routes/routes';
import RootShimmerComponent from '@magento/venia-ui/lib/RootComponents/Shimmer';

import collection from './collection';

export const useRouteFallbackShimmer = () => {
    const { pathname } = useLocation();
    const [appState] = useAppContext();
    const { nextRootComponent } = appState;

    const shimmer = useMemo(() => {
        if (nextRootComponent) {
            return <RootShimmerComponent type={nextRootComponent} />;
        }

        if (!pathname) {
            return fullPageLoadingIndicator;
        }

        const { path: matchedPath } =
            availableRoutes
                .map(route =>
                    matchPath(pathname, {
                        path: route.pattern,
                        exact: route.exact
                    })
                )
                .find(match => !!match) || {};

        if (matchedPath && collection.has(matchedPath)) {
            const ShimmerComponent = collection.get(matchedPath);

            return <ShimmerComponent matchedPath={matchedPath} />;
        }

        return fullPageLoadingIndicator;
    }, [pathname, nextRootComponent]);

    return {
        shimmer
    };
};
