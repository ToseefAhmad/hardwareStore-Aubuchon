import { array, func, string } from 'prop-types';
import React, { Suspense, useEffect } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';

import SimpleModal from '@app/components/SimpleModal';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './zoomImageModal.module.css';
const ZoomContent = React.lazy(() => import('./ZoomContent'));

const ZoomImageModal = ({ handleCloseModal, productName, mediaGallery }) => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.xl;

    const [{ modal }] = useAppContext();
    const isOpen = modal.identifier === 'mobileZoom';

    useEffect(() => {
        if (!isMobile) handleCloseModal();
    }, [isMobile, handleCloseModal]);

    return (
        <SimpleModal className={classes.root} modalName="mobileZoom">
            {isOpen && (
                <Suspense fallback={null}>
                    <ZoomContent
                        handleCloseModal={handleCloseModal}
                        productName={productName}
                        mediaGallery={mediaGallery}
                    />
                </Suspense>
            )}
        </SimpleModal>
    );
};
ZoomImageModal.propTypes = {
    handleCloseModal: func,
    productName: string,
    mediaGallery: array
};
export default ZoomImageModal;
