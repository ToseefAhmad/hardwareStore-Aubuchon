import { useQuery } from '@apollo/client';
import {
    APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY,
    APP_ROUTER_PATHS,
    APP_AUTH_MODAL_SIGN_IN_TAB_KEY
} from '@app-constants';
import { useCallback, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { useUserContext } from '@app/context/user';

import MembershipTriggerOperations from './membershipTrigger.gql';

export const useMembershipTrigger = () => {
    const [
        { modal },
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const [{ currentUser, isSignedIn }] = useUserContext();

    const [cookies] = useCookies();
    const history = useHistory();

    const {
        queries: { loyaltyApiCustomerName }
    } = MembershipTriggerOperations;

    const { data: loyaltyApiCustomerData } = useQuery(loyaltyApiCustomerName, {
        fetchPolicy: 'cache-first',
        skip: !cookies.aubuchon_cid || isSignedIn,
        variables: {
            id: cookies.aubuchon_cid
        }
    });

    const handleToggleModal = useCallback(() => {
        const identifier = cookies.aubuchon_cid
            ? MODAL_NAMES.auth
            : MODAL_NAMES.membership;
        const initialTabKey = cookies.aubuchon_cid
            ? APP_AUTH_MODAL_SIGN_IN_TAB_KEY
            : APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY;

        toggleModal({
            identifier,
            props: {
                initialTabKey
            }
        });
    }, [toggleModal, cookies]);

    const firstName = useMemo(() => {
        if (!cookies.aubuchon_cid) return null;
        return isSignedIn
            ? currentUser.firstname
            : loyaltyApiCustomerData?.loyaltyApiCustomerName?.firstname;
    }, [cookies, currentUser, loyaltyApiCustomerData, isSignedIn]);

    const handleTriggerClick = useCallback(() => {
        if (!isSignedIn) {
            handleToggleModal();
            return;
        }

        history.push(APP_ROUTER_PATHS.accountPage);
    }, [handleToggleModal, isSignedIn, history]);

    return {
        handleTriggerClick,
        isOpen: modal.identifier === MODAL_NAMES.membership,
        firstName
    };
};
