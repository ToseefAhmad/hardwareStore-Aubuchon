import {
    APP_AUTH_MODAL_SIGN_UP_TAB_KEY,
    APP_AUTH_MODAL_SIGN_IN_TAB_KEY
} from '@app-constants';
import { useCallback, useRef } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';

export const useMembershipModalContent = () => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const contentRef = useRef();

    const onRegisterBtnClick = useCallback(() => {
        toggleModal({
            identifier: MODAL_NAMES.auth,
            props: {
                initialTabKey: APP_AUTH_MODAL_SIGN_UP_TAB_KEY
            }
        });
    }, [toggleModal]);

    const onLinkBtnClick = useCallback(() => {
        toggleModal({
            identifier: MODAL_NAMES.auth,
            props: {
                initialTabKey: APP_AUTH_MODAL_SIGN_IN_TAB_KEY
            }
        });
    }, [toggleModal]);

    return {
        onLinkBtnClick,
        onRegisterBtnClick,
        contentRef
    };
};
