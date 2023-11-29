import { useQuery } from '@apollo/client';
import { APP_ROUTER_PATHS } from '@app-constants';
import { useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

import OrderCurbsidePageOperations from './orderCurbsidePickupPage.gql';
import { usePickupOrderDetails } from './usePickupOrderDetails';

export const useOrderCurbsidePickupPage = () => {
    const {
        queries: { getOrderInfoQuery, isOrderAvailableForPickupQuery },
        mutations: { addOrderInstructionMutation }
    } = OrderCurbsidePageOperations;

    const { orderNumber } = useParams();
    const windowSize = useWindowSize();

    const backUrl = useMemo(
        () =>
            generatePath(APP_ROUTER_PATHS.orderViewPage, {
                orderNumber
            }),
        [orderNumber]
    );

    const tailwind = useTailwindContext();

    const { storeConfig } = useStoreConfig({
        fields: ['product_url_suffix']
    });

    const {
        data: getOrderInfoData,
        error: getOrderInfoError,
        loading: isOrderInfoDataLoading
    } = useQuery(getOrderInfoQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: { orderNumber }
    });

    const {
        canceledItemsPriceAndDiscountValues,
        orderInfo,
        orderProducts,
        isSubmitting,
        hasBeenSubmitted,
        handleNavBackButtonClick,
        handleCheckInFormSubmit,
        submitButtonRef,
        isSubmitted
    } = usePickupOrderDetails({
        availabilityVars: {
            id: getOrderInfoData?.customer?.orders?.items[0]?.id
        },
        backUrl,
        isOrderInfoDataLoading,
        orderData: getOrderInfoData?.customer?.orders?.items[0],
        orderInstructionVars: {
            id: getOrderInfoData?.customer?.orders?.items[0]?.id
        },
        operations: {
            addOrderInstructionMutation,
            isOrderAvailableForPickupQuery
        },
        storeConfig
    });

    return {
        canceledItemsPriceAndDiscountValues,
        orderInfo,
        orderProducts,
        isError: getOrderInfoError,
        isMobile: windowSize.innerWidth < tailwind.screens.lg,
        isLoading: isOrderInfoDataLoading,
        isSubmitting,
        hasBeenSubmitted,
        handleNavBackButtonClick,
        handleCheckInFormSubmit,
        submitButtonRef,
        isSubmitted
    };
};
