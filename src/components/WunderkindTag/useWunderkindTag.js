import { useCallback, useEffect, useMemo, useRef } from 'react';

export const useWunderkindTag = orderData => {
    const wkndConvertSent = useRef(false);

    const { order_number } = orderData.orderInfo;
    const {
        email,
        billing_address,
        applied_coupons,
        prices,
        items
    } = orderData.cart;

    const itemsInfo = useMemo(() => {
        return items.map(item => ({
            sku: item.product.sku,
            product_id: item.product.id,
            price: item.prices.price.value,
            quantity: item.quantity
        }));
    }, [items]);

    /* Used for Wunderkind `convert1` function. */
    const handleWkndConvert = useCallback(() => {
        if (wkndConvertSent.current) {
            return;
        }

        wkndConvertSent.current = true;

        globalThis.top.bouncex = globalThis.top.bouncex || [];
        globalThis.top.bouncex.push([
            'conversion',
            {
                order_id: order_number,
                email: email,
                phone: billing_address.telephone,
                goal: 'purchase',
                transaction_origin: 'Online',
                currency: prices.grand_total.currency,
                coupon: applied_coupons ? applied_coupons : [],
                total_discount: null,
                tax: prices.applied_taxes,
                shipping: 0, // There is no shipping charge at the moment.
                amount: prices.grand_total.value,
                pay_method: 'CARD',
                item: itemsInfo
            }
        ]);
    }, [
        applied_coupons,
        billing_address.telephone,
        email,
        itemsInfo,
        order_number,
        prices.applied_taxes,
        prices.grand_total.currency,
        prices.grand_total.value
    ]);

    useEffect(() => {
        !wkndConvertSent.current && handleWkndConvert();
    }, [handleWkndConvert]);

    /* Used for Wunderkind `convert2` function. */
    const wkndBounceXMultiPixelUri = useMemo(() => {
        return WUNDERKIND_BOUNCEX_MULTIPIXEL_URI
            ? WUNDERKIND_BOUNCEX_MULTIPIXEL_URI.replace(
                  /ORDER_ID/,
                  encodeURIComponent(order_number)
              )
                  .replace(/EMAIL/, encodeURIComponent(email))
                  .replace(
                      /AMOUNT/,
                      encodeURIComponent(prices.grand_total.value)
                  )
                  .replace(
                      /CURRENCY/,
                      encodeURIComponent(prices.grand_total.currency)
                  )
                  .replace(/GOAL/, encodeURIComponent('purchase'))
            : null;
    }, [
        email,
        order_number,
        prices.grand_total.currency,
        prices.grand_total.value
    ]);

    return { wkndBounceXMultiPixelUri };
};
