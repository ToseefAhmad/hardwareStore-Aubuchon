import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useToasts } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha/useGoogleReCaptcha';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import {
    adjustErrorMessageForToast,
    errorEventTypesToMap
} from '@app/components/ToastContainer';
import { useUserContext } from '@app/context/user';
import { retrieveCartId } from '@app/store/actions/cart';

import AuthFormOperations from './authForm.gql';
import { FORM_TYPES, RE_CAPTCHA_PARAMS } from './consts';

const getCustomerToken = ({ generateCustomerToken }) => {
    return generateCustomerToken.token;
};

const getSignInParams = formValues => {
    const result = {};

    if (formValues) {
        const { email, password } = formValues;

        /* String.prototype.trim() is used here in order to delete unnecessary whitespace at the end of the string,
        which is created by Android auto suggestion. */
        result.email = email.trim();
        result.password = password;
    }

    return result;
};

const getSignUpParams = (formValues, loyaltyId) => {
    const result = {};

    if (formValues) {
        const {
            email,
            password,
            firstname,
            lastname,
            telephone,
            date_of_birth,
            is_subscribed,
            loyalty_id,
            address_data
        } = formValues;

        result.customerInput = {
            email,
            password,
            firstname,
            lastname,
            telephone,
            loyalty_id: loyalty_id || loyaltyId || '',
            date_of_birth: date_of_birth || '',
            is_subscribed: !!is_subscribed,
            address_data: address_data || null
        };
    }

    return result;
};

/**
 * Hook for app auth functionality
 *
 * @param {string} formType
 * @param {boolean} [doThrowError]
 * @param {string|boolean} loyaltyId
 */
export const useAuthForm = ({
    formType,
    doThrowError = false,
    loyaltyId = false
}) => {
    const {
        queries: {
            getCustomerQuery,
            getCartDetailsQuery,
            getCountriesListQuery
        },
        mutations: {
            signInMutation,
            signUpMutation,
            createCartMutation,
            mergeCartsMutation
        }
    } = AuthFormOperations;

    const [isProcessing, setIsProcessing] = useState(false);
    const [, { dispatch }] = useEventingContext();
    const apolloClient = useApolloClient();
    const [{ loginCallback }] = useAppContext();
    const url = useLocation();
    const history = useHistory();

    const [
        { isGettingDetails, getDetailsError },
        {
            actions: { setSignInStatus },
            setToken,
            clearToken,
            getUserDetails
        }
    ] = useUserContext();
    const [
        { cartId },
        { createCart, removeCart, getCartDetails }
    ] = useCartContext();

    const {
        generateReCaptchaData,
        recaptchaLoading,
        recaptchaWidgetProps
    } = useGoogleReCaptcha(RE_CAPTCHA_PARAMS[formType]);

    const [, { addToast }] = useToasts();

    const { data: countriesListData } = useQuery(getCountriesListQuery, {
        skip: formType === FORM_TYPES.SIGN_IN,
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const fetchUserDetails = useAwaitQuery(getCustomerQuery);
    const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);

    const [signUp, { error: signUpError }] = useMutation(signUpMutation, {
        fetchPolicy: 'no-cache'
    });
    const [signIn, { error: signInError }] = useMutation(signInMutation, {
        fetchPolicy: 'no-cache'
    });

    const [fetchCartId, { error: fetchCartIdError }] = useMutation(
        createCartMutation,
        {
            fetchPolicy: 'no-cache'
        }
    );
    const [mergeCarts, { error: mergeCartsError }] = useMutation(
        mergeCartsMutation,
        {
            fetchPolicy: 'no-cache'
        }
    );

    const countries = useMemo(() => {
        let value = [];

        if (countriesListData) {
            value = countriesListData.countries;
        }

        return value;
    }, [countriesListData]);

    const handleSubmit = useCallback(
        async formValues => {
            const signUpParams = getSignUpParams(formValues, loyaltyId);
            const signInParams = getSignInParams(formValues);
            const sourceCartId = cartId;

            setIsProcessing(true);

            try {
                const recaptchaDataForSignIn = await generateReCaptchaData();

                if (formType === FORM_TYPES.SIGN_UP) {
                    const recaptchaDataForCreateAccount = await generateReCaptchaData();

                    await signUp({
                        variables: { ...signUpParams },
                        ...recaptchaDataForCreateAccount
                    });

                    dispatch({
                        type: 'USER_CREATE_ACCOUNT',
                        payload: {
                            email: signInParams.email,
                            firstName: signInParams.firstName,
                            lastName: signInParams.lastName,
                            is_subscribed: signInParams.isSubscribed
                        }
                    });
                }

                const { data: signInData } = await signIn({
                    variables: { ...signInParams },
                    ...recaptchaDataForSignIn
                });

                await setToken(getCustomerToken(signInData));

                // Clear apollo cache
                await apolloClient.clearCacheData(apolloClient, 'cart');
                await apolloClient.clearCacheData(apolloClient, 'customer');

                await removeCart();
                await createCart({ fetchCartId });

                const destinationCartId = await retrieveCartId();

                if (sourceCartId && destinationCartId) {
                    await mergeCarts({
                        variables: {
                            sourceCartId,
                            destinationCartId
                        }
                    });
                }

                setIsProcessing(false);
                setSignInStatus(true);

                // Ensure old stores are updated with any new data.
                await getUserDetails({ fetchUserDetails });
                await getCartDetails({ fetchCartId, fetchCartDetails });

                dispatch({
                    type: 'USER_SIGN_IN',
                    payload: {
                        ...getUserDetails.customer
                    }
                });

                loginCallback();
                if (url.pathname === '/create-account') {
                    history.replace('/');
                    addToast({
                        type: 'info',
                        message:
                            'You have successfully registered and logged in.',
                        timeout: 3000
                    });
                }
            } catch (e) {
                setIsProcessing(false);
                clearToken();
                if (doThrowError) throw new Error(e);

                // Mutations' errors are handled with toasts
            }
        },
        [
            cartId,
            generateReCaptchaData,
            formType,
            signIn,
            setToken,
            apolloClient,
            removeCart,
            createCart,
            fetchCartId,
            mergeCarts,
            setSignInStatus,
            getUserDetails,
            fetchUserDetails,
            getCartDetails,
            fetchCartDetails,
            dispatch,
            loginCallback,
            addToast,
            url.pathname,
            signUp,
            history,
            clearToken,
            doThrowError,
            loyaltyId
        ]
    );

    const derivedErrorMessage = useMemo(
        () =>
            deriveErrorMessage([
                getDetailsError,
                signUpError,
                signInError,
                fetchCartIdError,
                mergeCartsError
            ]),
        [
            getDetailsError,
            signUpError,
            signInError,
            fetchCartIdError,
            mergeCartsError
        ]
    );

    useEffect(() => {
        if (derivedErrorMessage && !doThrowError) {
            const message = adjustErrorMessageForToast({
                message: derivedErrorMessage,
                eventType: errorEventTypesToMap.AUTH
            });

            addToast({
                type: 'error',
                message
            });
        }
    }, [derivedErrorMessage, addToast, doThrowError]);

    useEffect(() => {
        if (formType === FORM_TYPES.SIGN_UP) {
            dispatch({
                type: 'USER_CREATE_ACCOUNT_FORM_BEGIN'
            });
        }
    }, [dispatch, formType]);

    const signInPageInitialValues = {
        email: history?.location?.state?.authState?.email || ''
    };
    const signInPageWarningText =
        history?.location?.state?.authState?.warningText || null;

    return {
        countries,
        recaptchaWidgetProps,
        isLoading: isProcessing,
        isDisabled: isGettingDetails,
        isRecaptchaLoading: recaptchaLoading,
        handleSubmit,
        signInPageInitialValues,
        signInPageWarningText
    };
};
