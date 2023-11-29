import { APP_AUTH_MODAL_SIGN_IN_TAB_KEY } from '@app-constants';
import { useState, useCallback, useMemo } from 'react';

import { useToasts } from '@magento/peregrine';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

import { useCreateAccountContext } from '../../context';

import { useTabsContext } from '@app/components/Tabs';
import { messages as toastMessages } from '@app/components/ToastContainer';

import ThatIsMeScreenOperations from './thatIsMe.gql';

export const useThatIsMeScreen = () => {
    const {
        queries: { loyaltyApiCustomerDetails }
    } = ThatIsMeScreenOperations;

    const [isLoading, setIsLoading] = useState(false);

    const [, { dispatch }] = useEventingContext();
    const [, { addToast }] = useToasts();
    const tabsContext = useTabsContext();

    const { goToTab } = tabsContext ? tabsContext[1] : {};

    const [
        { userList, regFormInitialValues },
        { goToInitialScreen, goToRegFormScreen }
    ] = useCreateAccountContext();

    const getLoyaltyApiCustomerDetails = useAwaitQuery(
        loyaltyApiCustomerDetails
    );

    const radioListData = useMemo(() => (userList?.length ? userList : []), [
        userList
    ]);

    const handleSubmit = useCallback(
        async ({ id }) => {
            setIsLoading(true);

            dispatch({
                type: 'SIGNUP_THATS_ME',
                payload: {
                    id
                }
            });

            try {
                const { data } = await getLoyaltyApiCustomerDetails({
                    fetchPolicy: 'network-only',
                    variables: {
                        id
                    }
                });
                const {
                    loyaltyApiCustomerDetails: {
                        customerData,
                        error,
                        linkedEmail: email
                    }
                } = data;

                if (email && error) {
                    goToTab({
                        tabKey: APP_AUTH_MODAL_SIGN_IN_TAB_KEY,
                        state: {
                            initialSignInFormValues: { email },
                            warningText:
                                'Provided email address is already in use. Please Sign In.'
                        }
                    });
                    return;
                }

                setIsLoading(false);

                if (error) {
                    addToast({
                        type: 'error',
                        message: error
                    });
                    return;
                }

                goToRegFormScreen({
                    email: customerData.emailaddr || regFormInitialValues.email,
                    telephone: customerData.phonenumber,
                    firstname: customerData.firstname,
                    lastname: customerData.lastname,
                    street: customerData.addr1,
                    city: customerData.city,
                    country_code: 'US', // API doesn't return the code, but client base is US.
                    region: { region_id: customerData.region_id },
                    postcode: customerData.zip,
                    loyalty_id: customerData.loyalty_id
                });
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
            getLoyaltyApiCustomerDetails,
            goToRegFormScreen,
            regFormInitialValues.email,
            goToTab,
            addToast
        ]
    );

    const handleCancel = useCallback(() => {
        dispatch({
            type: 'SIGNUP_TRY_AGAIN'
        });

        goToInitialScreen();
    }, [dispatch, goToInitialScreen]);

    return {
        isLoading,
        radioListData,
        handleSubmit,
        handleCancel
    };
};
