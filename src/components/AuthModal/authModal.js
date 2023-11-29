import { APP_AUTH_MODAL_SIGN_IN_TAB_KEY } from '@app-constants';
import React, { Suspense, lazy, useMemo } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';

import classes from './authModal.module.css';
import AuthModalContentShimmer from './Content/content.shimmer';
import { useAuthModal } from './useAuthModal';

const AuthModalContent = lazy(() => import('./Content'));

const AuthModal = () => {
    const [
        { modal },
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const { identifier, props } = modal;

    const isOpen = useMemo(() => {
        return identifier === MODAL_NAMES.auth;
    }, [identifier]);

    useAuthModal({ isOpen, onClose: toggleModal });

    return (
        <SimpleModal
            className={classes.modal}
            modalName={MODAL_NAMES.auth}
            fullHeight={false}
        >
            <Suspense
                fallback={
                    <AuthModalContentShimmer
                        initialTabKey={
                            props?.initialTabKey ||
                            APP_AUTH_MODAL_SIGN_IN_TAB_KEY
                        }
                    />
                }
            >
                <AuthModalContent
                    initialTabKey={
                        props?.initialTabKey || APP_AUTH_MODAL_SIGN_IN_TAB_KEY
                    }
                    onClose={toggleModal}
                />
            </Suspense>
        </SimpleModal>
    );
};

export default AuthModal;
