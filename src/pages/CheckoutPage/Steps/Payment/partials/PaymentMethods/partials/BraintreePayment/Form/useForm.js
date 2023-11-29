import { useMutation } from '@apollo/client';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha';

import { useCheckoutPageContext } from '../../../../../../../context';
import { STORE_CARD } from '../../../../../../Payment/constants';

import { useTailwindContext } from '@app/context/tailwind';
import { useUserContext } from '@app/context/user';

import BraintreePaymentOperations from '../braintreePayment.gql';

const ACTIONS = {
    add: 'add',
    remove: 'remove'
};

const CLIENT_AUTHORIZATION = process.env.CHECKOUT_BRAINTREE_TOKEN;

const CARD_NUMBER_ID = 'hws-braintree-card-number';
const EXPIRATION_DATE_ID = 'hws-braintree-expiration-date';
const CVV_ID = 'hws-braintree-cvv';

const HOSTED_FIELD_INPUT_CLASS = 'hws-braintree__input';
const HOSTED_FIELD_INPUT_MOBILE_CLASS = 'hws-braintree__input--mobile';

const BRAINTREE_FIELDS = {
    number: 'number',
    expirationDate: 'expirationDate',
    cvv: 'cvv'
};

const FIELDS_CONFIG = {
    [BRAINTREE_FIELDS.number]: {
        selector: `#${CARD_NUMBER_ID}`,
        placeholder: 'Credit card number'
    },
    [BRAINTREE_FIELDS.expirationDate]: {
        selector: `#${EXPIRATION_DATE_ID}`,
        placeholder: 'MM/YY'
    },
    [BRAINTREE_FIELDS.cvv]: {
        selector: `#${CVV_ID}`,
        placeholder: 'CVV'
    }
};

const STYLES_CONFIG = {
    input: HOSTED_FIELD_INPUT_CLASS,
    [`.${HOSTED_FIELD_INPUT_MOBILE_CLASS}`]: HOSTED_FIELD_INPUT_MOBILE_CLASS
};

export const getFormattedErrorMessage = error =>
    error ? error.message.split('.')[0] : '';

export const useForm = () => {
    const {
        mutations: { setBraintreeCreditCardOnCartMutation }
    } = BraintreePaymentOperations;

    const [{ cartId }, { setHandlePaymentMethod }] = useCheckoutPageContext();
    const tailwindContext = useTailwindContext();
    const [{ isSignedIn }] = useUserContext();

    const { value: isStoreCard } = useFieldState(STORE_CARD);
    const instance = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);
    const [focused, setFocused] = useState(null);

    const {
        recaptchaLoading,
        generateReCaptchaData,
        recaptchaWidgetProps
    } = useGoogleReCaptcha({
        currentForm: 'BRAINTREE',
        formAction: 'setBraintreeCreditCardOnCart'
    });

    const [setBraintreeCreditCardOnCart] = useMutation(
        setBraintreeCreditCardOnCartMutation,
        {
            fetchPolicy: 'network-only',
            variables: { cartId }
        }
    );

    /**
     * Helper for control mobile classes for input element in iframes
     */
    const setScreenSizeClass = useCallback(isSmall => {
        const braintreeInstance = instance.current;

        if (!braintreeInstance) return;

        for (const field in BRAINTREE_FIELDS) {
            if (isSmall) {
                braintreeInstance.addClass(
                    field,
                    HOSTED_FIELD_INPUT_MOBILE_CLASS
                );
            } else {
                braintreeInstance.removeClass(
                    field,
                    HOSTED_FIELD_INPUT_MOBILE_CLASS
                );
            }
        }
    }, []);

    /**
     * Helper for control disabled state for input element in iframes
     */
    const setDisabledStateForFields = useCallback(action => {
        const braintreeInstance = instance.current;

        if (!braintreeInstance) return;

        for (const field in BRAINTREE_FIELDS) {
            const options = {
                field,
                attribute: 'disabled'
            };

            if (action === ACTIONS.add) {
                braintreeInstance.setAttribute(options);
            } else {
                braintreeInstance.removeAttribute(options);
            }
        }
    }, []);

    /**
     * Helper for imitation focus behavior for inputs container element
     */
    const addFocusBehaviorImitationListeners = useCallback(() => {
        const braintreeInstance = instance.current;

        if (!braintreeInstance) return;

        braintreeInstance.on('focus', () => {
            setFocused(true);
        });
        braintreeInstance.on('blur', () => {
            setFocused(false);
        });
    }, []);

    /**
     * Helper for imitation responsive behavior for elements in iframe
     * https://github.com/braintree/braintree-web/issues/483
     */
    const addResponsiveBehaviorImitationListeners = useCallback(() => {
        const braintreeInstance = instance.current;

        if (!braintreeInstance) return () => {};

        const resizeCallback = debounce(({ target: { innerWidth } }) => {
            setScreenSizeClass(innerWidth < tailwindContext.screens.xl);
        }, 25);

        window.addEventListener('resize', resizeCallback);

        return () => {
            window.removeEventListener('resize', resizeCallback);
        };
    }, [setScreenSizeClass, tailwindContext.screens.xl]);

    /**
     * Wrapped Braintree "tokenize" method with custom logic
     */
    const tokenize = useCallback(() => {
        return new Promise((resolve, reject) => {
            setError(null);

            const braintreeApi = instance.current;

            if (!braintreeApi) {
                const e = new Error('Braintree instance is not created!');

                setError(e);
                reject(e);

                return;
            }

            const asyncHandler = async () => {
                try {
                    setDisabledStateForFields(ACTIONS.add);

                    const reCaptchaData = await generateReCaptchaData();
                    const tokenizeRes = await braintreeApi.tokenize();

                    resolve({
                        ...tokenizeRes,
                        reCaptchaData
                    });
                } catch (e) {
                    setError(e);
                    reject(e);
                } finally {
                    setDisabledStateForFields(ACTIONS.remove);
                }
            };

            asyncHandler();
        });
    }, [generateReCaptchaData, setDisabledStateForFields]);

    /**
     * Handler for credit card payment method
     */
    const handleCreditCardPayment = useCallback(async () => {
        try {
            const { nonce, reCaptchaData } = await tokenize();

            await setBraintreeCreditCardOnCart({
                variables: {
                    paymentNonce: nonce,
                    saveCard: !!isStoreCard && isSignedIn
                },
                ...reCaptchaData
            });
        } catch (e) {
            throw new Error(e);
        }
    }, [isSignedIn, isStoreCard, setBraintreeCreditCardOnCart, tokenize]);

    /**
     * Init Braintree CDK
     */
    useEffect(() => {
        const init = async () => {
            const { default: braintree } = await import('braintree-web');
            const braintreeClient = braintree.client;

            braintreeClient.create(
                {
                    authorization: CLIENT_AUTHORIZATION
                },
                (err, clientInstance) => {
                    if (err) return;

                    const hostedFields = braintree.hostedFields;

                    hostedFields.create(
                        {
                            client: clientInstance,
                            fields: FIELDS_CONFIG,
                            styles: STYLES_CONFIG
                        },
                        (err, hostedFieldsInstance) => {
                            if (err) return;

                            instance.current = hostedFieldsInstance;

                            const isSmall =
                                window.innerWidth < tailwindContext.screens.xl;

                            setScreenSizeClass(isSmall);

                            // We need to wait about 100ms for prevent font size jumping (tested on x6 slowdown CPU)
                            setTimeout(() => {
                                setIsReady(true);
                            }, 100);
                        }
                    );
                }
            );
        };

        !instance.current && init();

        return () => {
            if (!instance.current) return;

            setIsReady(false);
            instance.current.teardown();
            instance.current = null;
        };
    }, [setScreenSizeClass, tailwindContext.screens.xl]);

    /**
     * Init listeners
     */
    useEffect(() => {
        if (!isReady) return;

        addFocusBehaviorImitationListeners();

        const removeResponsiveBehaviorImitationListeners = addResponsiveBehaviorImitationListeners();

        return () => {
            removeResponsiveBehaviorImitationListeners();
        };
    }, [
        addFocusBehaviorImitationListeners,
        addResponsiveBehaviorImitationListeners,
        isReady
    ]);

    /**
     * Method for override default payment method handler into checkout page context
     */
    useEffect(() => {
        isReady && setHandlePaymentMethod(() => handleCreditCardPayment);
    }, [handleCreditCardPayment, isReady, setHandlePaymentMethod]);

    return {
        fieldsIds: {
            CARD_NUMBER_ID,
            EXPIRATION_DATE_ID,
            CVV_ID
        },
        recaptchaWidgetProps,
        isReady: isReady || recaptchaLoading,
        focused,
        error,
        getFormattedErrorMessage,
        isSignedIn
    };
};
