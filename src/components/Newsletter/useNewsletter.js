import { useMutation } from '@apollo/client';
import { useCallback, useRef, useMemo, useState, useEffect } from 'react';

import { useToasts } from '@magento/peregrine';
import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha/useGoogleReCaptcha';

import { useLoyaltyCustomerIdCookie } from '@app/hooks/useLoyaltyCustomerIdCookie';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

import DEFAULT_OPERATIONS from './newsletter.gql.js';

export const useNewsletter = () => {
    const { subscribeMutation } = DEFAULT_OPERATIONS;

    const [, { addToast }] = useToasts();
    const formApiRef = useRef(null);
    const { updateCookieValue } = useLoyaltyCustomerIdCookie();

    const [newsLetterError, setNewsLetterError] = useState(null);

    const [
        subscribeNewsLetter,
        { data, loading: subscribeLoading }
    ] = useMutation(subscribeMutation, {
        fetchPolicy: 'no-cache',
        onError: setNewsLetterError
    });

    const { storeConfig, loading: configLoading } = useStoreConfig({
        fields: ['newsletter_enabled']
    });

    const {
        generateReCaptchaData,
        recaptchaLoading,
        recaptchaWidgetProps
    } = useGoogleReCaptcha({
        currentForm: 'NEWSLETTER',
        formAction: 'newsletter'
    });

    const isEnabled = useMemo(() => {
        return !!storeConfig?.newsletter_enabled;
    }, [storeConfig]);

    const derivedErrorMessage = useMemo(() => {
        return newsLetterError?.message;
    }, [newsLetterError]);

    const setFormApi = useCallback(api => (formApiRef.current = api), []);
    const handleSubmit = useCallback(
        async ({ email }) => {
            if (email) {
                try {
                    const recaptchaDataForSubscribe = await generateReCaptchaData();

                    await subscribeNewsLetter({
                        variables: { email },
                        ...recaptchaDataForSubscribe
                    });
                } catch (error) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.error(error);
                    }
                }
            }
        },
        [subscribeNewsLetter, generateReCaptchaData]
    );

    useEffect(() => {
        if (data?.subscribeEmailToNewsletter?.loyalty_api_id)
            updateCookieValue(data.subscribeEmailToNewsletter.loyalty_api_id);
    }, [data, updateCookieValue]);

    const clearErrors = useCallback(() => {
        setNewsLetterError(null);
    }, [setNewsLetterError]);

    useEffect(() => {
        if (derivedErrorMessage) {
            addToast({
                type: 'error',
                message: derivedErrorMessage
            });
        }
    }, [addToast, derivedErrorMessage]);

    return {
        isEnabled,
        handleSubmit,
        clearErrors,
        isBusy: subscribeLoading || recaptchaLoading,
        isLoading: configLoading,
        setFormApi,
        newsLetterResponse: data && data.subscribeEmailToNewsletter,
        recaptchaWidgetProps
    };
};
