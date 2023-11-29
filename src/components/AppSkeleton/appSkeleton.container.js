import React from 'react';

import { WindowSizeContextProvider } from '@magento/peregrine';

import TailwindContextProvider from '@app/context/tailwind';

import AppSkeleton from './appSkeleton';

const AppSkeletonContainer = () => {
    return (
        <WindowSizeContextProvider>
            <TailwindContextProvider>
                <AppSkeleton />
            </TailwindContextProvider>
        </WindowSizeContextProvider>
    );
};

export default AppSkeletonContainer;
