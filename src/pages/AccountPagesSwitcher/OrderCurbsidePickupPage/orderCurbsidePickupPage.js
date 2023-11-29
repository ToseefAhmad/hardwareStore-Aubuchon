import React from 'react';

import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';

import CurbsidePickup from '@app/components/CurbsidePickup';

import { useOrderCurbsidePickupPage } from './useOrderCurbsidePickupPage';

const OrderCurbsidePickupPage = () => {
    const {
        canceledItemsPriceAndDiscountValues,
        orderInfo,
        orderProducts,
        isError,
        isMobile,
        isLoading,
        isSubmitting,
        hasBeenSubmitted,
        handleNavBackButtonClick,
        handleCheckInFormSubmit,
        submitButtonRef,
        isSubmitted
    } = useOrderCurbsidePickupPage();

    return (
        <CurbsidePickup
            canceledItemsPriceAndDiscountValues={
                canceledItemsPriceAndDiscountValues
            }
            isError={isError}
            isMobile={isMobile}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            hasBeenSubmitted={hasBeenSubmitted}
            orderInfo={isObjectEmpty(orderInfo) ? undefined : orderInfo}
            orderProducts={orderProducts}
            handleNavBackButtonClick={handleNavBackButtonClick}
            handleCheckInFormSubmit={handleCheckInFormSubmit}
            submitButtonRef={submitButtonRef}
            isSubmitted={isSubmitted}
        />
    );
};

export default OrderCurbsidePickupPage;
