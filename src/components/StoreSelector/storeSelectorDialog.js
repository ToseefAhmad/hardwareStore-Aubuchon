import React, { lazy, Suspense } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import GoogleMaps from '@app/components/GoogleMaps';
import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';

import StoreSelectorShimmer from './storeSelector.shimmer';
import classes from './storeSelectorDialog.module.css';

const StoreSelector = lazy(() => import('@app/components/StoreSelector'));

const SelectStoreDialog = () => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    return (
        <SimpleModal
            modalName={MODAL_NAMES.storeSwitcher}
            className={classes.modal}
        >
            <Suspense fallback={<StoreSelectorShimmer />}>
                <GoogleMaps>
                    <StoreSelector onClose={toggleModal} />
                </GoogleMaps>
            </Suspense>
        </SimpleModal>
    );
};

export default SelectStoreDialog;
