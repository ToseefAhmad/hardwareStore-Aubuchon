import {
    APP_ROUTER_PATHS,
    APP_AUTH_MODAL_SIGN_IN_TAB_KEY
} from '@app-constants';
import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useToasts } from '@magento/peregrine';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

import { useCreateAccountContext } from '../../context';

import { useTabsContext } from '@app/components/Tabs';
import { messages as toastMessages } from '@app/components/ToastContainer';

import InitialScreenOperations from './initial.gql';

export const useInitialScreen = () => {
    const history = useHistory();

    const {
        queries: { loyaltyApiCustomerLookup, isEmailAvailable }
    } = InitialScreenOperations;

    const [isLoading, setIsLoading] = useState(false);
    const [, { dispatch }] = useEventingContext();
    const tabsContext = useTabsContext();
    const [, { addToast }] = useToasts();

    const { goToTab } = tabsContext ? tabsContext[1] : {};

    const [
        ,
        { goToThatIsMeScreen, goToRegFormScreen }
    ] = useCreateAccountContext();

    const getLoyaltyApiCustomerLookup = useAwaitQuery(loyaltyApiCustomerLookup);
    const getIsEmailAvailable = useAwaitQuery(isEmailAvailable);

    const handleSubmit = useCallback(
        async ({ phone, email }) => {
            setIsLoading(true);

            dispatch({
                type: 'SIGNUP_FIND_MY_ACCOUNT',
                payload: {
                    email,
                    phone
                }
            });

            try {
                const {
                    data: {
                        isEmailAvailable: { is_email_available }
                    }
                } = await getIsEmailAvailable({
                    fetchPolicy: 'no-cache',
                    variables: { email }
                });

                const { data } = await getLoyaltyApiCustomerLookup({
                    fetchPolicy: 'network-only',
                    variables: {
                        phone,
                        email
                    },
                    skip: !is_email_available
                });

                const { loyaltyApiCustomerLookup: userList } = data;

                setIsLoading(false);

                if (userList.length) {
                    goToThatIsMeScreen({
                        userList,
                        regFormInitialValues: { telephone: phone, email }
                    });
                } else {
                    goToRegFormScreen({ telephone: phone, email });
                }

                if (!is_email_available) {
                    goToTab?.({
                        tabKey: APP_AUTH_MODAL_SIGN_IN_TAB_KEY,
                        state: {
                            initialSignInFormValues: { email },
                            warningText:
                                'Provided email address is already in use. Please Sign In.'
                        }
                    });

                    if (
                        globalThis.location.pathname ===
                            APP_ROUTER_PATHS.createAccount &&
                        !tabsContext
                    ) {
                        history.push(
                            APP_ROUTER_PATHS.signIn,

                            {
                                authState: {
                                    email: email,
                                    warningText:
                                        'Provided email address is already in use. Please Sign In.'
                                }
                            }
                        );
                    }
                }
            } catch (e) {
                addToast({
                    type: 'error',
                    message: toastMessages.GENERAL_ERROR_MESSAGE
                });
            } finally {
                setIsLoading(false);
            }
        },
        [
            dispatch,
            getLoyaltyApiCustomerLookup,
            goToRegFormScreen,
            goToThatIsMeScreen,
            getIsEmailAvailable,
            addToast,
            goToTab,
            history,
            tabsContext
        ]
    );

    return {
        isLoading,
        handleSubmit
    };
};
