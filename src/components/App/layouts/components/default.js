import { bool, func } from 'prop-types';
import React from 'react';

import {
    HeadProvider,
    StoreTitle
} from '@magento/venia-ui/lib/components/Head';
import Mask from '@magento/venia-ui/lib/components/Mask';
import Routes from '@magento/venia-ui/lib/components/Routes';
import ToastContainer from '@magento/venia-ui/lib/components/ToastContainer';

import BottomNavigation from '@app/components/BottomNavigation';
import DialogContainer from '@app/components/DialogContainer';
import Main from '@app/components/Main';
import MiniCart from '@app/components/MiniCart';
import Navigation from '@app/components/Navigation';
import PreCart from '@app/components/PreCart';
import SearchBoxMobile from '@app/components/Search/SearchBoxMobile';

const DefaultLayout = props => {
    const { hasOverlay, handleCloseDrawer } = props;

    return (
        <HeadProvider>
            <StoreTitle />
            <Main isMasked={hasOverlay}>
                <Routes />
                <Mask
                    isActive={hasOverlay}
                    dismiss={handleCloseDrawer}
                    aria-label="Close modal"
                />
            </Main>
            <ToastContainer />
            <DialogContainer />
            <Navigation />
            <MiniCart />
            <PreCart />
            <BottomNavigation />
            <SearchBoxMobile />
        </HeadProvider>
    );
};

DefaultLayout.propTypes = {
    hasOverlay: bool.isRequired,
    handleCloseDrawer: func.isRequired
};

export default DefaultLayout;
