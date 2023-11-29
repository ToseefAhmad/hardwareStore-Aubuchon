import React from 'react';
import { CookiesProvider } from 'react-cookie';

import {
    PeregrineContextProvider as Peregrine,
    ToastContextProvider,
    WindowSizeContextProvider
} from '@magento/peregrine';

import BrandContextProvider from '@app/context/Brand';
import PickupStoreContextProvider from '@app/context/PickupStore';
import RecentlySearched from '@app/context/recentlySearched';
import RecentlyViewedProducts from '@app/context/recentlyViewedProducts';
import TailwindContextProvider from '@app/context/tailwind';

/**
 * List of context providers that are required to run Venia
 *
 * @property {React.Component[]} contextProviders
 */
const contextProviders = [
    TailwindContextProvider,
    CookiesProvider,
    PickupStoreContextProvider,
    BrandContextProvider,
    Peregrine,
    WindowSizeContextProvider,
    ToastContextProvider,
    RecentlyViewedProducts,
    RecentlySearched
];

const ContextProvider = ({ children }) => {
    return contextProviders.reduceRight((memo, ContextProvider) => {
        return <ContextProvider>{memo}</ContextProvider>;
    }, children);
};

export default ContextProvider;
