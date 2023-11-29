import { APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY } from '@app-constants';
import React, { Suspense, lazy } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';

import MembershipModalContentShimmer from './Content/content.shimmer';
import classes from './membershipModal.module.css';

const MembershipModalContent = lazy(() => import('./Content'));

const MembershipModal = () => {
    const [
        {
            modal: { props }
        },
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    return (
        <SimpleModal
            className={classes.modal}
            modalName={MODAL_NAMES.membership}
            fullHeight={false}
            id="membership"
        >
            <Suspense
                fallback={
                    <MembershipModalContentShimmer
                        initialTabKey={
                            props?.initialTabKey ||
                            APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY
                        }
                    />
                }
            >
                <MembershipModalContent
                    initialTabKey={
                        props?.initialTabKey ||
                        APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY
                    }
                    onClose={toggleModal}
                />
            </Suspense>
        </SimpleModal>
    );
};

export default MembershipModal;
