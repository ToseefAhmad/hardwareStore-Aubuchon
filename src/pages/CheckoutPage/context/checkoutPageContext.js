import { useApolloClient } from '@apollo/client';
import { node } from 'prop-types';
import React, {
    createContext,
    useContext,
    useCallback,
    useMemo,
    useState,
    useRef,
    useEffect
} from 'react';

import { useCartContext } from '@magento/peregrine/lib/context/cart';

import { useUserContext } from '@app/context/user';
import { smoothScroll } from '@app/utils/smooth-scroll';

import { CHECKOUT_STEPS_KEYS } from '../constants';
import CheckoutPageContextQueries from './checkoutPageContext.queries.gql';

const CheckoutPageContext = createContext();

export const CheckoutPageContextProvider = props => {
    const { children } = props;
    const [{ isSignedIn }] = useUserContext();
    const [{ cartId }] = useCartContext();

    // Save the initial values of these parameters for use in the context,
    // to make this module more isolated
    const cartIdOnInit = useRef(cartId);
    const isSignedInOnInit = useRef(isSignedIn);

    const apolloClient = useApolloClient();

    /**
     * Calculated tab list for checkout page
     */
    const tabs = useMemo(() => {
        const steps = [
            {
                key: CHECKOUT_STEPS_KEYS.info,
                label: 'Info'
            },
            {
                key: CHECKOUT_STEPS_KEYS.pickup,
                label: 'Pickup'
            },
            {
                key: CHECKOUT_STEPS_KEYS.payment,
                label: 'Payment'
            }
        ];

        isSignedInOnInit.current && steps.shift();

        return steps;
    }, []);

    const initialTabKey = useRef(tabs[0].key);
    const [stepData, setStepData] = useState([]);
    const [isDataReady, setIsDataReady] = useState(false);
    const [currentStep, setCurrentStep] = useState(initialTabKey.current);
    const [activeTabKey, setActiveTabKey] = useState(initialTabKey.current);
    const [handlePaymentMethod, setHandlePaymentMethod] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');

    /**
     * Calculated allowed checkout tab keys
     */
    const allowedTabKeys = useMemo(() => {
        const tabKeys = tabs.map(({ key }) => key);
        const currentStepTabIdx = tabKeys.findIndex(key => key === currentStep);

        return tabKeys.slice(0, currentStepTabIdx + 1);
    }, [currentStep, tabs]);

    const updateStepData = useCallback(
        (data, key) => {
            const tempData = [...stepData];
            tempData[key] = data;
            setStepData(tempData);
        },
        [stepData]
    );

    const currentStepData = useMemo(() => {
        return stepData[activeTabKey];
    }, [activeTabKey, stepData]);

    /**
     * Method for read cached data by tab key
     */
    const readTabDataFromCache = useCallback(
        tabKey => {
            let value = {};

            if (Object.values(CHECKOUT_STEPS_KEYS).includes(tabKey)) {
                value = apolloClient.readQuery({
                    query: CheckoutPageContextQueries[tabKey],
                    variables: {
                        cartId: cartIdOnInit.current,
                        isSignedIn: !!isSignedIn,
                        skipRewards: !isSignedIn
                    }
                });
            }

            return value;
        },
        [apolloClient, isSignedIn]
    );

    /**
     * Handler for checkout tab change
     */
    const changeActiveTab = useCallback(
        tabKey => {
            if (!allowedTabKeys.includes(tabKey)) return;

            updateStepData(readTabDataFromCache(tabKey), tabKey);
            setActiveTabKey(tabKey);
            smoothScroll({ to: { y: 0 }, duration: 750 });
        },
        [allowedTabKeys, readTabDataFromCache, updateStepData]
    );

    /**
     * Handler for checkout step change
     */
    const changeCurrentStep = useCallback(
        tabKey => {
            updateStepData(readTabDataFromCache(tabKey), tabKey);
            setCurrentStep(tabKey);
            setActiveTabKey(tabKey);
            smoothScroll({ to: { y: 0 }, duration: 750 });
        },
        [readTabDataFromCache, updateStepData]
    );

    /**
     * Handler for step data refresh
     */
    const refreshCurrentStepData = useCallback(() => {
        updateStepData(readTabDataFromCache(activeTabKey), activeTabKey);
    }, [activeTabKey, readTabDataFromCache, updateStepData]);

    /**
     * Set initial tab data
     */
    useEffect(() => {
        if (!isDataReady) {
            const tabKey = initialTabKey.current;
            updateStepData(readTabDataFromCache(tabKey), tabKey);
            setIsDataReady(true);
        }
    }, [isDataReady, readTabDataFromCache, updateStepData]);

    const contextValue = [
        {
            cartId: cartIdOnInit.current,
            phoneNumber,
            isSignedIn: isSignedInOnInit.current,
            tabs,
            currentStep,
            currentStepData,
            activeTabKey,
            allowedTabKeys,
            isDataReady,
            handlePaymentMethod
        },
        {
            changeActiveTab,
            changeCurrentStep,
            refreshCurrentStepData,
            setHandlePaymentMethod,
            setPhoneNumber
        }
    ];

    return (
        <CheckoutPageContext.Provider value={contextValue}>
            {children}
        </CheckoutPageContext.Provider>
    );
};

CheckoutPageContextProvider.propTypes = {
    children: node
};

/**
 * @typedef {Object} CheckoutPageTab
 *
 * @property {number} key
 * @property {string} label
 */

/**
 * @typedef {Object} CheckoutPageContextState
 *
 * @property {string} cartId
 * @property {string} phoneNumber
 * @property {boolean} isSignedIn
 * @property {CheckoutPageTab[]} tabs
 * @property {number} activeTabKey
 * @property {number[]} allowedTabKeys
 * @property {number} currentStep
 * @property {object} currentStepData
 * @property {boolean} isDataReady
 * @property {Function} handlePaymentMethod
 */

/**
 * @typedef {Object} CheckoutPageContextActions
 *
 * @property {Function} changeActiveTab
 * @property {Function} changeCurrentStep
 * @property {Function} refreshCurrentStepData
 * @property {Function} setHandlePaymentMethod
 * @property {Function} setPhoneNumber
 */

/**
 * @returns {[CheckoutPageContextState, CheckoutPageContextActions]}
 */
export const useCheckoutPageContext = () => useContext(CheckoutPageContext);
