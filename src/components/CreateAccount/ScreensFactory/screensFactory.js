import React, { Suspense, useMemo } from 'react';

import { useCreateAccountContext } from '../context';
import { SCREEN_COMPONENTS } from './config';

const ScreensFactory = () => {
    const [{ currentScreen }] = useCreateAccountContext();

    const Component = useMemo(
        () => SCREEN_COMPONENTS[currentScreen].Component,
        [currentScreen]
    );
    const ComponentShimmer = useMemo(
        () => SCREEN_COMPONENTS[currentScreen].Shimmer,
        [currentScreen]
    );

    return (
        <Suspense fallback={ComponentShimmer ? <ComponentShimmer /> : null}>
            <Component />
        </Suspense>
    );
};

export default ScreensFactory;
