import { APP_AUTH_MODAL_SIGN_UP_TAB_KEY } from '@app-constants';
import { useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { useUserContext } from '@app/context/user';

const META_TITLE = 'Try Curbside Pickup';
const META_DESCRIPTION =
    'Stay in your car and let us do the heavy lifting ― errands are easy with Curbside Pickup at HardwareStore.com!';

export const useTryCurbsidePage = () => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const [{ isSignedIn }] = useUserContext();
    const [, { dispatch }] = useEventingContext();

    const handleToggleModal = useCallback(
        tabId => {
            toggleModal({
                identifier: MODAL_NAMES.auth,
                props: {
                    initialTabKey: tabId || APP_AUTH_MODAL_SIGN_IN_TAB_KEY
                }
            });
        },
        [toggleModal]
    );

    const handleOpenAuthModal = useCallback(() => {
        handleToggleModal(APP_AUTH_MODAL_SIGN_UP_TAB_KEY);
        dispatch({
            type: 'USER_CREATE_ACCOUNT_CLICK',
            payload: {}
        });
    }, [dispatch, handleToggleModal]);

    return {
        isSignedIn,
        handleOpenAuthModal,
        meta_title: META_TITLE,
        meta_description: META_DESCRIPTION
    };
};
