import { useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { APP_AUTH_MODAL_SIGN_IN_TAB_KEY } from '@app/constants';

export const useSignInBanner = () => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const handleToggleModal = useCallback(() => {
        toggleModal({
            identifier: MODAL_NAMES.auth,
            props: {
                initialTabKey: APP_AUTH_MODAL_SIGN_IN_TAB_KEY
            }
        });
    }, [toggleModal]);

    return { handleToggleModal };
};
