import { useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

import ThatIsMeScreenOperations from '@app/components/CreateAccount/ScreensFactory/ThatIsMe/thatIsMe.gql.js';
import { APP_ROUTER_PATHS } from '@app/constants';

export const useModal = ({ handleSignUp, userList, password, signUpData }) => {
    const history = useHistory();

    const {
        queries: { loyaltyApiCustomerDetails }
    } = ThatIsMeScreenOperations;

    const [state, setState] = useState({
        isLoading: false,
        formErrors: []
    });
    const radioListData = useMemo(() => (userList?.length ? userList : []), [
        userList
    ]);

    const getLoyaltyApiCustomerDetails = useAwaitQuery(
        loyaltyApiCustomerDetails
    );

    const handleSubmit = useCallback(
        async ({ id }) => {
            setState({
                isLoading: true,
                formErrors: []
            });

            try {
                const { data } = await getLoyaltyApiCustomerDetails({
                    fetchPolicy: 'network-only',
                    variables: {
                        id
                    }
                });
                const {
                    loyaltyApiCustomerDetails: { customerData, error }
                } = data;

                if (error) {
                    throw new Error(error);
                }

                await handleSignUp({
                    loyalty_id: customerData.loyalty_id,
                    password,
                    ...signUpData
                });
                history.push(APP_ROUTER_PATHS.accountPage);
            } catch (e) {
                setState({
                    isLoading: false,
                    formErrors: [e]
                });
            }
        },
        [
            getLoyaltyApiCustomerDetails,
            handleSignUp,
            password,
            history,
            signUpData
        ]
    );

    return {
        state,
        radioListData,
        handleSubmit
    };
};
