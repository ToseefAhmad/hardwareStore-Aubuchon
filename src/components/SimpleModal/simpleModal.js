import classnames from 'classnames';
import { bool, node, string } from 'prop-types';
import React, { createContext, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { Portal } from '@magento/venia-ui/lib/components/Portal';

import { useSimpleModal } from '@app/components/SimpleModal/useSimpleModal';
import { useScrollLock } from '@app/overrides/peregrine/hooks/useScrollLock';

import containerTransitionsClasses from './containerTransitions.module.css';
import overlayTransitionsClasses from './overlayTransitions.module.css';
import classes from './simpleModal.module.css';

const ModalContext = createContext();

const SimpleModal = props => {
    const { children, fullHeight, className, modalName, id } = props;
    const [{ modal }] = useAppContext();

    const { modalRef, overlayRef, isFullHeight, isOpen } = useSimpleModal({
        fullHeight,
        modal,
        modalName
    });

    useScrollLock(isOpen);

    return (
        <Portal>
            <CSSTransition
                in={isOpen}
                classNames={{ ...overlayTransitionsClasses }}
                timeout={200}
                unmountOnExit
            >
                <div className={classes.modalOverlay} ref={overlayRef} />
            </CSSTransition>
            <CSSTransition
                in={isOpen}
                classNames={{ ...containerTransitionsClasses }}
                timeout={200}
                unmountOnExit
            >
                <ModalContext.Provider value={[{ modalRef }]}>
                    <aside
                        className={classnames(
                            classes.modalContainer,
                            {
                                [classes.withDynamicHeight]: !fullHeight,
                                [classes.isRounded]: !isFullHeight
                            },
                            className
                        )}
                        aria-modal
                        role="dialog"
                        id={id}
                        ref={modalRef}
                    >
                        {children}
                    </aside>
                </ModalContext.Provider>
            </CSSTransition>
        </Portal>
    );
};

SimpleModal.propTypes = {
    children: node,
    fullHeight: bool,
    className: string,
    modalName: string,
    id: string
};

SimpleModal.defaultProps = {
    fullHeight: true
};

SimpleModal.displayName = 'SimpleModal';

export default SimpleModal;

export const useSimpleModalContext = () => useContext(ModalContext);
