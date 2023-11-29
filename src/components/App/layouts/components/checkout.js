import { bool, func } from 'prop-types';
import React, { useEffect } from 'react';

import {
    HeadProvider,
    StoreTitle
} from '@magento/venia-ui/lib/components/Head';
import Mask from '@magento/venia-ui/lib/components/Mask';
import Routes from '@magento/venia-ui/lib/components/Routes';
import ToastContainer from '@magento/venia-ui/lib/components/ToastContainer';

import CheckoutMain from '@app/components/CheckoutMain';
import DialogContainer from '@app/components/DialogContainer';
import SubmitAnimation from '@app/components/SubmitAnimation';

const CheckoutLayout = props => {
    const { hasOverlay, handleCloseDrawer } = props;

    useEffect(() => {
        globalThis.document?.body?.classList?.add('checkout-layout');

        return () => {
            globalThis.document?.body?.classList?.remove('checkout-layout');
        };
    }, []);

    return (
        <HeadProvider>
            <StoreTitle />
            <CheckoutMain isMasked={hasOverlay}>
                <Routes />
            </CheckoutMain>
            <Mask isActive={hasOverlay} dismiss={handleCloseDrawer} />
            <ToastContainer />
            <DialogContainer />
            <SubmitAnimation
                title="Thank you"
                subtitle="We have received your order"
            />
        </HeadProvider>
    );
};

CheckoutLayout.propTypes = {
    hasOverlay: bool.isRequired,
    handleCloseDrawer: func.isRequired
};

export default CheckoutLayout;
