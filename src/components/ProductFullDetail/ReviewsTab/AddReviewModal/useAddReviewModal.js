import { useState, useCallback, useRef, useMemo } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';

export const useAddReviewModal = () => {
    const contentRef = useRef();

    const [
        { modal },
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const [isSubmitFailed, setIsSubmitFailed] = useState(false);

    const handleCloseModal = useCallback(() => {
        toggleModal();
        setIsSubmitFailed(false);
    }, [toggleModal]);

    const isModalOpen = useMemo(
        () => modal.identifier === MODAL_NAMES.writeReview,
        [modal.identifier]
    );

    return {
        contentRef,
        isSubmitFailed,
        setIsSubmitFailed,
        handleCloseModal,
        isModalOpen
    };
};
