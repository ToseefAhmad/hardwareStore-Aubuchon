import React from 'react';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import CheckoutPageContent from './Content';
import { CheckoutPageContextProvider } from './context';
import { useCheckoutPage } from './useCheckoutPage';

const CheckoutPage = () => {
    const { isLoading } = useCheckoutPage();

    if (isLoading) {
        return fullPageLoadingIndicator;
    }

    return (
        <>
            <StoreTitle>Secure Checkout</StoreTitle>
            <CheckoutPageContextProvider>
                <CheckoutPageContent />
            </CheckoutPageContextProvider>
        </>
    );
};

export default CheckoutPage;
