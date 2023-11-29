import React from 'react';

import AuthModal from '@app/components/AuthModal';
import CheckNearbyStoresDialog from '@app/components/CheckNearbyStoresDialog';
import ClosestStoreSwitcher from '@app/components/ClosestStoreSwitcher';
import ImageModal from '@app/components/ImageModal';
import MembershipModal from '@app/components/MembershipModal';
import { StoreSelectorDialog } from '@app/components/StoreSelector';
import WarningDialog from '@app/components/WarningDialog';

const DialogContainer = () => {
    return (
        <>
            <StoreSelectorDialog />
            <WarningDialog />
            <ImageModal />
            <CheckNearbyStoresDialog />
            <MembershipModal />
            <AuthModal />
            <ClosestStoreSwitcher />
        </>
    );
};

export default DialogContainer;
