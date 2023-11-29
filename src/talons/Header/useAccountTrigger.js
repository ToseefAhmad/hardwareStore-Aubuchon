import { APP_AUTH_MODAL_SIGN_IN_TAB_KEY } from '@app-constants';
import { useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { useUserContext } from '@app/context/user';

export const useAccountTrigger = () => {
    const [{ currentUser, isSignedIn }] = useUserContext();
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const { elementRef, expanded, setExpanded, triggerRef } = useDropdown();

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

    const handleToggleDropdown = useCallback(() => {
        setExpanded(prevState => !prevState);
    }, [setExpanded]);

    return {
        isSignedIn,
        currentUser,
        expanded,
        elementRef,
        triggerRef,
        handleToggleModal,
        handleToggleDropdown
    };
};
