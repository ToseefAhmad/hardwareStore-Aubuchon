import { useApolloClient, useMutation } from '@apollo/client';
import { APP_ROUTER_PATHS } from '@app-constants';
import { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

import { CHECKOUT_STEPS_KEYS } from '../../constants';
import { useCheckoutPageContext } from '../../context';

import { FORM_TYPES, useAuthForm } from '@app/hooks/useAuthForm';

import InfoStepOperations from './info.gql';

export const useInfo = () => {
    const {
        queries: { getEmailAvailableQuery, writeGuestCustomerQuery },
        mutations: { setGuestEmailOnCartMutation }
    } = InfoStepOperations;

    const history = useHistory();
    const apolloClient = useApolloClient();

    const [
        { cartId, isSignedIn, activeTabKey, currentStep, currentStepData },
        { changeActiveTab, changeCurrentStep }
    ] = useCheckoutPageContext();

    const {
        recaptchaWidgetProps,
        handleSubmit: handleSignInSubmit
    } = useAuthForm({ formType: FORM_TYPES.SIGN_IN, doThrowError: true });

    const formApi = useRef(null);

    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        company: '',
        isShownPasswordField: false,
        isShownInfoFields: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [, { dispatch }] = useEventingContext();

    /**
     * Calculated submit button text value
     */
    const submitButtonText = useMemo(() => {
        let value = 'Continue';

        if (customerInfo.isShownPasswordField) {
            value = 'Login & Continue';
        } else if (customerInfo.isShownInfoFields) {
            value = 'Continue To Pickup Options';
        }

        return value;
    }, [customerInfo]);

    /**
     * Calculated error message component props
     */
    const errorMessageProps = useMemo(() => {
        if (!error) return null;

        const INVALID_PASSWORD_ERROR_MESSAGE =
            'The account sign-in was incorrect or your account is disabled temporarily.';
        const RECAPTCHA_FAILED =
            'ReCaptcha validation failed, please try again';

        return !error.message.includes(INVALID_PASSWORD_ERROR_MESSAGE)
            ? {
                  id: 'error',
                  message: error.message.includes(RECAPTCHA_FAILED)
                      ? RECAPTCHA_FAILED
                      : 'An error has occurred. Please check the input and try again.'
              }
            : {
                  id: 'forgotPasswordError',
                  message: 'The password you entered is incorrect',
                  buttons: [
                      {
                          key: 'forgotPassword',
                          label: 'Forgot your password?',
                          onClick: () => {
                              history.push(APP_ROUTER_PATHS.forgotPassword);
                          }
                      }
                  ]
              };
    }, [error, history]);

    const getEmailAvailable = useAwaitQuery(getEmailAvailableQuery);

    const [setGuestEmailOnCart] = useMutation(setGuestEmailOnCartMutation, {
        fetchPolicy: 'network-only',
        variables: { cartId }
    });

    /**
     * Helper for getting formApi ref
     */
    const getFormApi = useCallback(v => {
        formApi.current = v;
    }, []);

    /**
     * Method for saving guest customer info data in cache
     */
    const setGuestCustomerInfoOnCart = useCallback(
        guestCheckoutCustomerInfo => {
            apolloClient.writeQuery({
                query: writeGuestCustomerQuery,
                data: {
                    cart: {
                        __typename: 'Cart',
                        id: cartId,
                        guestCheckoutCustomerInfo
                    }
                }
            });
        },
        [apolloClient, cartId, writeGuestCustomerQuery]
    );

    /**
     * Handler for submit form
     */
    const handleSubmit = useCallback(
        async formValues => {
            const email = customerInfo.email;

            setIsLoading(true);
            setError(null);

            try {
                // If we don't have an email in memory, we need to check the email that the user entered
                if (!email) {
                    const {
                        data: {
                            isEmailAvailable: { is_email_available }
                        }
                    } = await getEmailAvailable({
                        fetchPolicy: 'no-cache',
                        variables: { email: formValues.email }
                    });

                    setCustomerInfo(prevState => ({
                        ...prevState,
                        email: formValues.email,
                        isShownPasswordField: !is_email_available,
                        isShownInfoFields: is_email_available
                    }));

                    dispatch({
                        type: 'CHECKOUT_INFO_STEP_LOOKUP'
                    });

                    setIsLoading(false);

                    return;
                }

                // If the password field exists, then we need to log in the user
                if (formValues.password) {
                    await handleSignInSubmit(formValues);

                    dispatch({
                        type: 'USER_SIGN_IN'
                    });

                    globalThis.location && globalThis.location.reload();

                    return;
                }

                const { firstname, lastname, phone, company = '' } = formValues;
                const tabChangeFn =
                    currentStep === CHECKOUT_STEPS_KEYS.info
                        ? changeCurrentStep
                        : changeActiveTab;

                await setGuestEmailOnCart({ variables: { email } });
                setGuestCustomerInfoOnCart({
                    email,
                    firstname,
                    lastname,
                    phone,
                    company
                });
                setIsLoading(false);

                dispatch({
                    type: 'CHECKOUT_INFO_STEP_CONTINUE_AS_GUEST'
                });

                tabChangeFn(CHECKOUT_STEPS_KEYS.pickup);
            } catch (e) {
                process.env.NODE_ENV !== 'production' && console.error(e);
                setIsLoading(false);
                setError(e);
            }
        },
        [
            customerInfo.email,
            currentStep,
            changeCurrentStep,
            changeActiveTab,
            dispatch,
            setGuestEmailOnCart,
            setGuestCustomerInfoOnCart,
            getEmailAvailable,
            handleSignInSubmit
        ]
    );

    /**
     * Handler for reset values to initial state
     */
    const handleReset = useCallback(() => {
        setCustomerInfo({});
        setError(null);
        formApi.current.reset();
    }, []);

    /**
     * Method for setting initial data
     */
    useEffect(() => {
        const {
            cart: { email, guestCheckoutCustomerInfo }
        } = currentStepData;

        setCustomerInfo(prevState => ({
            ...prevState,
            ...guestCheckoutCustomerInfo,
            email: email || guestCheckoutCustomerInfo?.email || '',
            isShownInfoFields: !!email || !!guestCheckoutCustomerInfo?.email
        }));
    }, [activeTabKey, currentStepData]);

    /**
     * Reset the form whenever initial values change
     */
    useEffect(() => {
        formApi.current && formApi.current.reset();
    }, [customerInfo]);

    /**
     * Reload page after user log in
     */
    useEffect(() => {
        if (isSignedIn) {
            globalThis.location && globalThis.location.reload();
        }
    }, [isSignedIn]);

    useEffect(() => {
        dispatch({
            type: 'CHECKOUT_INFO_STEP_ENTER'
        });
    }, [dispatch]);

    return {
        submitButtonText,
        getFormApi,
        customerInfo,
        recaptchaWidgetProps,
        errorMessageProps,
        isLoading,
        handleSubmit,
        handleReset
    };
};
