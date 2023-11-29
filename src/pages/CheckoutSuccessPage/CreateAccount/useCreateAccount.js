import { useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

import InitialScreenOperations from '@app/components/CreateAccount/ScreensFactory/Initial/initial.gql.js';
import { MODAL_NAMES } from '@app/components/SimpleModal';
import { APP_ROUTER_PATHS } from '@app/constants';
import { FORM_TYPES, useAuthForm } from '@app/hooks/useAuthForm';

const throwEmailError = () => {
    throw new Error('Provided email address is already in use.');
};

export const useCreateAccount = ({ cartData }) => {
    const {
        queries: { loyaltyApiCustomerLookup, isEmailAvailable }
    } = InitialScreenOperations;

    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const { billing_address: billingInfo, email } = cartData || {};
    const {
        telephone: phone,
        lastname,
        firstname,
        street,
        city,
        country,
        postcode,
        region
    } = billingInfo || {};
    const signUpData = useMemo(() => {
        return {
            email,
            telephone: phone,
            firstname,
            lastname,
            address_data: {
                street: street,
                city,
                country_code: country?.label,
                region_id: region?.region_id,
                postcode
            },
            is_agree_with_policy: true
        };
    }, [
        city,
        country?.label,
        email,
        firstname,
        lastname,
        phone,
        postcode,
        region?.region_id,
        street
    ]);

    const { handleSubmit: handleSignUp, recaptchaWidgetProps } = useAuthForm({
        formType: FORM_TYPES.SIGN_UP
    });
    const history = useHistory();
    const [state, setState] = useState({
        isLoading: false,
        formError: ''
    });
    const [userList, setUserList] = useState([]);
    const [password, setPassword] = useState('');

    const getLoyaltyApiCustomerLookup = useAwaitQuery(loyaltyApiCustomerLookup);
    const getEmailAvailable = useAwaitQuery(isEmailAvailable);

    const handleSubmit = useCallback(
        async ({ createAccountPassword }) => {
            setState({
                isLoading: true,
                formError: ''
            });
            setPassword(createAccountPassword);

            try {
                const {
                    data: {
                        isEmailAvailable: { is_email_available }
                    }
                } = await getEmailAvailable({
                    fetchPolicy: 'no-cache',
                    variables: { email }
                });

                if (!is_email_available) {
                    throwEmailError();
                    return;
                }

                const { data } = await getLoyaltyApiCustomerLookup({
                    fetchPolicy: 'network-only',
                    variables: {
                        phone,
                        email
                    },
                    skip: !is_email_available
                });

                const { loyaltyApiCustomerLookup: userList } = data;

                if (userList.length) {
                    setUserList(userList);
                    toggleModal({
                        identifier: MODAL_NAMES.successPageCreateAccount
                    });
                    setState(prevState => ({
                        ...prevState,
                        isLoading: false
                    }));
                } else {
                    await handleSignUp({
                        password: createAccountPassword,
                        ...signUpData
                    });
                    setState(prevState => ({
                        ...prevState,
                        isLoading: false
                    }));
                    history.push(APP_ROUTER_PATHS.accountPage);
                }
            } catch {
                setState({
                    isLoading: false,
                    formError:
                        'An error has occurred. Please check the input and try again.'
                });
            }
        },
        [
            getEmailAvailable,
            email,
            getLoyaltyApiCustomerLookup,
            phone,
            toggleModal,
            handleSignUp,
            signUpData,
            history
        ]
    );

    const handleCancel = useCallback(async () => {
        toggleModal();
        setState({
            isLoading: true,
            formError: ''
        });

        try {
            await handleSignUp({
                password,
                ...signUpData
            });
            setState(prevState => ({
                ...prevState,
                isLoading: false
            }));
            history.push(APP_ROUTER_PATHS.accountPage);
        } catch {
            setState({
                isLoading: false,
                formError:
                    'An error has occurred. Please check the input and try again.'
            });
        }
    }, [handleSignUp, history, password, signUpData, toggleModal]);

    return {
        state,
        handleSubmit: handleSubmit,
        handleCancel,
        userList,
        password,
        recaptchaWidgetProps,
        handleSignUp,
        signUpData
    };
};
