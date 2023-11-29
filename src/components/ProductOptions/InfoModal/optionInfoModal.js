import classnames from 'classnames';
import { func, string } from 'prop-types';
import React, { lazy, Suspense, useMemo } from 'react';

import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';
import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';

import { BUTTON_LABELS } from '../optionHeader';
import classes from './optionInfoModal.module.css';
import OptionInfoModalShimmer from './optionInfoModal.shimmer';

const SheenInfoContent = lazy(() => import('./sheenInfoContent'));

const SizeInfoContent = lazy(() => import('./sizeInfoContent'));

const OptionInfoModal = ({ handleClose, label, modalId }) => {
    const title = useMemo(() => {
        return BUTTON_LABELS[label];
    }, [label]);

    const modalName = `${MODAL_NAMES.optionInfoModal}-${modalId}`;

    return (
        <SimpleModal modalName={modalName} className={classes.modal}>
            <Suspense fallback={<OptionInfoModalShimmer />}>
                <div className={classes.header}>
                    <h2 className={classes.headerTitle}>{title}</h2>

                    <button
                        onClick={handleClose}
                        aria-disabled={false}
                        className={classes.closeButton}
                    >
                        <Icon src={CloseIcon} />
                    </button>
                </div>
                <div
                    className={classnames(classes.content, {
                        [classes.textSheen]: label === 'paint_sheen',
                        [classes.textSize]: label !== 'paint_sheen'
                    })}
                >
                    {label === 'paint_sheen' ? (
                        <SheenInfoContent classes={classes} />
                    ) : (
                        <SizeInfoContent />
                    )}
                </div>
            </Suspense>
        </SimpleModal>
    );
};

OptionInfoModal.defaultProps = {
    handleClose: () => {}
};

OptionInfoModal.propTypes = {
    handleClose: func,
    label: string,
    modalId: string
};

export default OptionInfoModal;
