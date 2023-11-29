import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useToasts } from '@magento/peregrine';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import { messages as toastMessages } from '@app/components/ToastContainer';
import { useUserContext } from '@app/context/user';
import authOperations from '@app/hooks/useAuthForm/authForm.gql';

import AccountInformationPageOperations from './accountInformationPage.gql.js';

export const useAccountInformationPage = () => {
    const {
        mutations: {
            updateCustomerInformationMutation,
            updateCustomerEmailMutation,
            changeCustomerPasswordMutation
        }
    } = AccountInformationPageOperations;
    const {
        queries: { getCustomerQuery }
    } = authOperations;

    const formApi = useRef(null);

    const history = useHistory();
    const location = useLocation();

    const [
        { currentUser, getDetailsError },
        { getUserDetails }
    ] = useUserContext();
    const [, { addToast }] = useToasts();
    const {
        generateReCaptchaData,
        recaptchaLoading,
        recaptchaWidgetProps
    } = useGoogleReCaptcha({
        currentForm: 'CUSTOMER_EDIT',
        formAction: 'editCustomer'
    });
    const [, { dispatch }] = useEventingContext();
    const fetchUserDetails = useAwaitQuery(getCustomerQuery);

    useEffect(() => {
        // avoid cache and fetch directly
        getUserDetails({ fetchUserDetails, forceNetwork: true });
    }, [fetchUserDetails, getUserDetails]);

    const [
        updateCustomerInformation,
        {
            error: customerInformationUpdateError,
            loading: isUpdatingCustomerInformation
        }
    ] = useMutation(updateCustomerInformationMutation);
    const [
        updateCustomerEmail,
        { error: customerEmailUpdateError, loading: isUpdatingCustomerEmail }
    ] = useMutation(updateCustomerEmailMutation);
    const [
        changeCustomerPassword,
        {
            error: customerPasswordChangeError,
            loading: isChangingCustomerPassword
        }
    ] = useMutation(changeCustomerPasswordMutation);

    const isLoading =
        isUpdatingCustomerInformation ||
        isUpdatingCustomerEmail ||
        isChangingCustomerPassword;
    const isDisabled = recaptchaLoading;

    const initialValues = useMemo(() => {
        const value = {};

        if (currentUser) {
            value.customer = currentUser;

            if (location.state?.isChangePassword) {
                value.customer.isChangePassword =
                    location.state.isChangePassword;
            }
        }

        return value;
    }, [currentUser, location]);

    useEffect(() => {
        if (initialValues?.customer?.date_of_birth) {
            const [
                ,
                month,
                day
            ] = initialValues?.customer?.date_of_birth?.split('-');
            formApi.current.setValue('date_of_birth_day', parseInt(day));
            formApi.current.setValue('date_of_birth_month', parseInt(month));
            formApi.current.setValue(
                'firstname',
                initialValues?.customer?.firstname
            );
            formApi.current.setValue(
                'lastname',
                initialValues?.customer?.lastname
            );
            formApi.current.setValue(
                'telephone',
                initialValues?.customer?.telephone
            );
        }
    }, [initialValues]);

    const handleSubmit = useCallback(
        async ({
            firstname,
            lastname,
            telephone,
            date_of_birth,
            email,
            password,
            newPassword
        }) => {
            firstname = firstname.trim();
            lastname = lastname.trim();
            telephone = telephone.trim();
            email = email ? email.trim() : email;
            password = password ? password.trim() : password;
            newPassword = newPassword ? newPassword.trim() : newPassword;

            const { customer } = initialValues;
            const isNeedUpdateCustomerEmail = email && customer.email !== email;
            const isNeedChangeCustomerPassword = password && newPassword;

            try {
                await updateCustomerInformation({
                    variables: {
                        customerInput: {
                            firstname,
                            lastname,
                            telephone,
                            date_of_birth: date_of_birth || ''
                        }
                    }
                });

                if (isNeedUpdateCustomerEmail) {
                    await updateCustomerEmail({
                        variables: {
                            email,
                            password
                        }
                    });
                }

                if (isNeedChangeCustomerPassword) {
                    const recaptchaDataForChangeCustomerPassword = await generateReCaptchaData();

                    await changeCustomerPassword({
                        variables: {
                            currentPassword: password,
                            newPassword: newPassword
                        },
                        ...recaptchaDataForChangeCustomerPassword
                    });
                }

                dispatch({
                    type: 'USER_ACCOUNT_UPDATE',
                    payload: {
                        email,
                        firstName: firstname,
                        lastName: lastname
                    }
                });

                addToast({
                    type: 'success',
                    message: toastMessages.UPDATE_ACCOUNT_INFO
                });

                await getUserDetails({ fetchUserDetails });
            } catch {
                // Toast message will be triggered on mutations' error
            }
        },
        [
            initialValues,
            updateCustomerInformation,
            dispatch,
            addToast,
            fetchUserDetails,
            getUserDetails,
            updateCustomerEmail,
            generateReCaptchaData,
            changeCustomerPassword
        ]
    );

    /**
     * Removing isChangePassword value from router state after saving it into component state
     */
    useEffect(() => {
        if (
            initialValues.customer?.isChangePassword &&
            location.state?.isChangePassword
        ) {
            const state = { ...location.state };

            delete state.isChangePassword;
            history.replace({ ...location, state });
        }
    }, [initialValues, history, location]);

    const derivedErrorMessage = useMemo(
        () =>
            deriveErrorMessage([
                customerInformationUpdateError,
                customerEmailUpdateError,
                customerPasswordChangeError
            ]),
        [
            customerInformationUpdateError,
            customerEmailUpdateError,
            customerPasswordChangeError
        ]
    );

    useEffect(() => {
        if (derivedErrorMessage) {
            addToast({
                type: 'error',
                message: derivedErrorMessage
            });
        }
    }, [derivedErrorMessage, addToast]);

    const getFormApi = useCallback(data => {
        formApi.current = data;
    }, []);

    return {
        initialValues,
        recaptchaWidgetProps,
        getDetailsError,
        handleSubmit,
        isLoading,
        isDisabled,
        getFormApi
    };
};
