import React, { lazy, Suspense } from 'react';

import GoogleMaps from '@app/components/GoogleMaps';
import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';

import classes from './checkNearbyStoresDialog.module.css';
import CheckNearbyStoresDialogContentShimmer from './Content/content.shimmer';

const CheckNearbyStoresDialogContent = lazy(() => import('./Content'));

const CheckNearbyStoresDialog = () => {
    return (
        <SimpleModal
            className={classes.modal}
            modalName={MODAL_NAMES.checkNearbyStores}
        >
            <Suspense fallback={<CheckNearbyStoresDialogContentShimmer />}>
                <GoogleMaps>
                    <CheckNearbyStoresDialogContent />
                </GoogleMaps>
            </Suspense>
        </SimpleModal>
    );
};

export default CheckNearbyStoresDialog;
