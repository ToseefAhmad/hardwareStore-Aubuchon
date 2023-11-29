import { bool, shape, string } from 'prop-types';
import React, { lazy, Suspense } from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';
import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';

import classes from './addReviewModal.module.css';
import { AddReviewModalContextProvider } from './context';
import { useAddReviewModal } from './useAddReviewModal';

const AddReviewModal = ({ productDetails, storeConfig }) => {
    const {
        contentRef,
        isSubmitFailed,
        setIsSubmitFailed,
        handleCloseModal,
        isModalOpen
    } = useAddReviewModal();

    const FormsFactory = lazy(() => import('./FormsFactory'));

    return (
        <SimpleModal
            className={classes.modalRoot}
            modalName={MODAL_NAMES.writeReview}
        >
            {isModalOpen && (
                <AddReviewModalContextProvider
                    storeConfig={storeConfig}
                    productDetails={productDetails}
                    contentRef={contentRef}
                    setIsSubmitFailed={setIsSubmitFailed}
                    handleCloseModal={handleCloseModal}
                >
                    <div className={classes.contentWrapper} ref={contentRef}>
                        <button
                            className={classes.closeButton}
                            onClick={handleCloseModal}
                        >
                            <Icon src={CloseIcon} />
                        </button>
                        <Suspense
                            fallback={<Shimmer width="100%" height="100%" />}
                        >
                            {isSubmitFailed ? (
                                <h3>
                                    Thanks, we already have your review for this
                                    item.
                                </h3>
                            ) : (
                                <FormsFactory />
                            )}
                        </Suspense>
                    </div>
                </AddReviewModalContextProvider>
            )}
        </SimpleModal>
    );
};

AddReviewModal.propTypes = {
    storeConfig: shape({
        turnto_review_url: string.isRequired,
        turnto_site_key: string.isRequired,
        turnto_reviews_enabled: bool.isRequired
    }).isRequired,
    productDetails: shape({
        sku: string.isRequired,
        name: string.isRequired,
        smallImage: string.isRequired
    })
};

export default AddReviewModal;
