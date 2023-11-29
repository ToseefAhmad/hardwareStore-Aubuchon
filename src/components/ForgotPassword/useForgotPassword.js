import { useMutation } from '@apollo/client';
import { useCallback, useMemo, useState } from 'react';

import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha';

import ForgotPasswordOperations from './forgotPassword.gql';

export const useForgotPassword = () => {
    const {
        mutations: { requestPasswordResetEmailMutation }
    } = ForgotPasswordOperations;

    const [isCompleted, setIsCompleted] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    const [
        requestResetEmail,
        { error: requestResetEmailError, loading: isResettingPassword }
    ] = useMutation(requestPasswordResetEmailMutation, {
        fetchPolicy: 'no-cache'
    });

    const {
        recaptchaLoading,
        generateReCaptchaData,
        recaptchaWidgetProps
    } = useGoogleReCaptcha({
        currentForm: 'CUSTOMER_FORGOT_PASSWORD',
        formAction: 'forgotPassword'
    });

    const isDisabled = useMemo(() => isResettingPassword || recaptchaLoading, [
        isResettingPassword,
        recaptchaLoading
    ]);

    const handleFormSubmit = useCallback(
        async ({ email }) => {
            if (isDisabled) return;

            try {
                const reCaptchaData = await generateReCaptchaData();

                await requestResetEmail({
                    variables: { email },
                    ...reCaptchaData
                });
                setForgotPasswordEmail(email);
                setIsCompleted(true);
            } catch (e) {
                process.env.NODE_ENV !== 'production' && console.error(e);
            }
        },
        [generateReCaptchaData, isDisabled, requestResetEmail]
    );

    return {
        forgotPasswordEmail,
        recaptchaWidgetProps,
        errors: [requestResetEmailError],
        isCompleted,
        isDisabled,
        handleFormSubmit
    };
};
