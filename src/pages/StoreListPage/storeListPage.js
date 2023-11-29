import React from 'react';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

import GoogleMaps from '@app/components/GoogleMaps';
import { Meta } from '@app/components/Head';

import StoreListPageContent from './storeListPageContent';

const CheckBrowserCompatibility = React.lazy(() =>
    import('@app/components/CheckBrowserCompatibilty/checkBrowserCompatibilty')
);

const STORES_DESCRIPTION =
    '100+ local hardware stores are part of the HardwareStore.com family ― find your local hardware store today!';

const StoreListPage = () => {
    return (
        <>
            <StoreTitle>Store Locator</StoreTitle>
            <Meta name="description" content={STORES_DESCRIPTION} />
            <GoogleMaps>
                <StoreListPageContent />
            </GoogleMaps>
            <CheckBrowserCompatibility />
        </>
    );
};

export default StoreListPage;
