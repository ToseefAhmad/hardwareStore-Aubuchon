import { useQuery } from '@apollo/client';
import { APP_ROUTER_PATHS } from '@app-constants';
import { useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';
import { useStoreConfig } from '@app/hooks/useStoreConfig';
import { useURLQuery } from '@app/hooks/useURLQuery';
import { usePickupOrderDetails } from '@app/pages/AccountPagesSwitcher/OrderCurbsidePickupPage/usePickupOrderDetails';

import GuestOrderPageOperations from './guestOrderPickupPage.gql';

export const useGuestOrderPickupPage = () => {
    const {
        queries: { getGuestOrderQuery, isOrderAvailableForPickupQuery },
        mutations: { addOrderInstructionMutation }
    } = GuestOrderPageOperations;
    const { orderNumber } = useParams();
    const windowSize = useWindowSize();
    const query = useURLQuery();
    const shortUrl = query.get('oid');
    const backUrl = useMemo(() => {
        return (
            generatePath(APP_ROUTER_PATHS.guestOrderViewPage, {
                orderNumber
            }) + `?oid=${shortUrl}`
        );
    }, [orderNumber, shortUrl]);
    const { storeConfig } = useStoreConfig({
        fields: ['store_code', 'product_url_suffix']
    });
    const tailwind = useTailwindContext();

    const {
        data: getOrderInfoData,
        error: getOrderInfoError,
        loading: isOrderInfoDataLoading
    } = useQuery(getGuestOrderQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: { shortUrl: shortUrl, orderNumber: orderNumber }
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
            shortUrl: shortUrl,
            orderNumber: orderNumber
        },
        backUrl,
        isOrderInfoDataLoading,
        orderData: getOrderInfoData?.guestOrder,
        orderInstructionVars: {
            shortUrl: shortUrl,
            orderNumber: orderNumber
        },
        operations: {
            addOrderInstructionMutation,
            isOrderAvailableForPickupQuery
        },
        storeConfig
    });

    return {
        backUrl,
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
