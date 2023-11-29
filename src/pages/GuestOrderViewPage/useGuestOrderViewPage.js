import { useQuery } from '@apollo/client';
import { APP_ROUTER_PATHS } from '@app-constants';
import { useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { useStoreConfig } from '@app/hooks/useStoreConfig';
import { useURLQuery } from '@app/hooks/useURLQuery';
import { useOrderDetails } from '@app/pages/AccountPagesSwitcher/OrderViewPage/useOrderDetails';

import operations from './guestOrderViewPage.gql';

export const useGuestOrderViewPage = () => {
    const { orderNumber } = useParams();
    const { getGuestOrderQuery } = operations;
    const query = useURLQuery();
    const shortUrl = query.get('oid');
    const {
        data: guestOrderData,
        error: guestOrderError,
        loading: isGuestOrderLoading
    } = useQuery(getGuestOrderQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: { shortUrl: shortUrl, orderNumber: orderNumber }
    });

    const pickupUrl = useMemo(() => {
        return (
            generatePath(APP_ROUTER_PATHS.guestOrderCurbsidePickupPage, {
                orderNumber
            }) + `?oid=${shortUrl}`
        );
    }, [orderNumber, shortUrl]);
    const { storeConfig } = useStoreConfig({
        fields: ['store_code', 'product_url_suffix']
    });

    const {
        canceledItemsPriceAndDiscountValues,
        itemGroups,
        orderInfo
    } = useOrderDetails({
        storeConfig,
        orderData: guestOrderData?.guestOrder
    });

    return {
        orderInfo,
        orderNumber,
        pickupUrl,
        isError: guestOrderError,
        isLoading: isGuestOrderLoading,
        itemGroups,
        canceledItemsPriceAndDiscountValues
    };
};
