import { string, func, number } from 'prop-types';
import React, { lazy, Suspense } from 'react';

import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';

import classes from './successMessage.module.css';

const SuccessMessage = ({ handleClose, message, modalId, modalType }) => {
    const SuccessMessageContent = lazy(() => import('./successMessageContent'));

    const modalName = modalId
        ? `${MODAL_NAMES.successMessage}-${modalType}-${modalId}`
        : MODAL_NAMES.successMessage;

    return (
        <SimpleModal className={classes.modalRoot} modalName={modalName}>
            <Suspense fallback="">
                <SuccessMessageContent
                    message={message}
                    handleClose={handleClose}
                />
            </Suspense>
        </SimpleModal>
    );
};

SuccessMessage.propTypes = {
    handleClose: func.isRequired,
    message: string.isRequired,
    modalId: number,
    modalType: string
};

export default SuccessMessage;
