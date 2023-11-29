import { useQuery } from '@apollo/client';
import { APP_ROUTER_PATHS } from '@app-constants';
import { useCallback, useMemo } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

import OrderViewPageOperations from './orderViewPage.gql';
import { useOrderDetails } from './useOrderDetails';

/**
 * OrderViewPage component talon
 */
export const useOrderViewPage = () => {
    const {
        queries: { getOrderInfoQuery }
    } = OrderViewPageOperations;

    const { storeConfig } = useStoreConfig({
        fields: ['product_url_suffix']
    });

    const history = useHistory();
    const { orderNumber } = useParams();
    const windowSize = useWindowSize();

    const tailwind = useTailwindContext();

    const {
        data: getOrderInfoData,
        error: getOrderInfoError,
        loading: isOrderInfoLoading
    } = useQuery(getOrderInfoQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: { orderNumber }
    });

    const {
        canceledItemsPriceAndDiscountValues,
        itemGroups,
        orderInfo
    } = useOrderDetails({
        storeConfig,
        orderData: getOrderInfoData?.customer?.orders?.items[0]
    });

    /**
     * Handler for order navigation back button click
     */
    const handleNavBackButtonClick = useCallback(() => {
        history.push(APP_ROUTER_PATHS.orderHistory);
    }, [history]);

    const pickupUrl = useMemo(
        () =>
            generatePath(APP_ROUTER_PATHS.orderCurbsidePickupPage, {
                orderNumber
            }),
        [orderNumber]
    );

    return {
        orderInfo,
        isError: !!getOrderInfoError,
        isMobile: windowSize.innerWidth < tailwind.screens.lg,
        isLoading: isOrderInfoLoading,
        handleNavBackButtonClick,
        itemGroups,
        canceledItemsPriceAndDiscountValues,
        pickupUrl
    };
};
