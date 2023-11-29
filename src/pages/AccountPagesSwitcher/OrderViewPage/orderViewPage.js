import React from 'react';

import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';

import OrderDetails from '@app/components/OrderDetails';

import { useOrderViewPage } from './useOrderViewPage';

const OrderViewPage = () => {
    const {
        orderInfo,
        isError,
        isMobile,
        isLoading,
        handleNavBackButtonClick,
        itemGroups,
        canceledItemsPriceAndDiscountValues,
        pickupUrl
    } = useOrderViewPage();

    return (
        <OrderDetails
            orderInfo={isObjectEmpty(orderInfo) ? undefined : orderInfo}
            handleNavBackButtonClick={handleNavBackButtonClick}
            isError={isError}
            isMobile={isMobile}
            isLoading={isLoading}
            itemGroups={itemGroups}
            canceledItemsPriceAndDiscountValues={
                canceledItemsPriceAndDiscountValues
            }
            pickupUrl={pickupUrl}
        />
    );
};

export default OrderViewPage;
