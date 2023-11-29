import React, { lazy, Suspense } from 'react';

import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';

import classes from './imageModal.module.css';

const ImageModalContent = lazy(() => import('./Content'));

const ImageModal = () => (
    <SimpleModal
        className={classes.modal}
        modalName={MODAL_NAMES.image}
        fullHeight={false}
    >
        <Suspense fallback={null}>
            <ImageModalContent />
        </Suspense>
    </SimpleModal>
);

export default ImageModal;
