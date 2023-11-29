import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useStoreConfig } from '@app/hooks/useStoreConfig';

export const useTurnTo = orderData => {
    const turnToOrderFeed = useRef(false);
    const { storeConfig } = useStoreConfig({
        fields: [
            'product_url_suffix',
            'turnto_site_key',
            'turnto_delivery_date_to_modify'
        ]
    });
    const baseUrl = globalThis.location.origin;
    const { order_number } = orderData.orderInfo;
    const { email, billing_address, items } = orderData.cart;
    const productUrlSuffix = useMemo(() => {
        if (storeConfig) {
            return storeConfig?.product_url_suffix;
        }
    }, [storeConfig]);

    const nonPaintFeeItems = useMemo(
        () => items.filter(item => item.is_paint_fee === false),
        [items]
    );
    const orderItems = useMemo(() => {
        return nonPaintFeeItems.map(item => ({
            sku: item.product.sku,
            title: item.product.name,
            getPrice: item.prices.price.value,
            url: `${baseUrl}/${item.product?.url_key}${productUrlSuffix || ''}`,
            itemImageUrl: item.product.small_image?.url
        }));
    }, [nonPaintFeeItems, baseUrl, productUrlSuffix]);

    const handleTurnToOrderFeed = useCallback(() => {
        if (!storeConfig?.turnto_site_key || turnToOrderFeed.current) {
            return;
        }

        const now = new Date();
        const deliveryDate = new Date(
            new Date(now).setDate(
                now.getDate() + storeConfig.turnto_delivery_date_to_modify
            )
        )
            .toISOString()
            .split('T')[0];

        globalThis.turnToConfig = {
            baseUrl: baseUrl,
            siteKey: storeConfig.turnto_site_key,
            locale: 'en_US',
            pageId: 'order-confirmation-page'
        };
        globalThis.TurnToCmd =
            globalThis.TurnToCmd ||
            function() {
                (TurnToCmd.q = TurnToCmd.q || []).push(arguments);
            };
        turnToOrderFeed.current = true;

        TurnToCmd('feed.send', {
            deliveryDate: deliveryDate,
            orderId: order_number,
            email: email,
            firstName: billing_address.firstname,
            lastName: billing_address.lastname,
            items: orderItems
        });
    }, [
        order_number,
        email,
        billing_address.firstname,
        billing_address.lastname,
        orderItems,
        storeConfig,
        baseUrl
    ]);

    useEffect(() => {
        !turnToOrderFeed.current && handleTurnToOrderFeed();
    }, [handleTurnToOrderFeed]);

    return {
        site_key: storeConfig?.turnto_site_key
    };
};
