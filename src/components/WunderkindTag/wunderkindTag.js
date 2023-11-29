import { arrayOf, number, shape, string, array } from 'prop-types';
import React from 'react';

import { useWunderkindTag } from './useWunderkindTag';

const WunderkindTag = ({ orderData }) => {
    const { wkndBounceXMultiPixelUri } = useWunderkindTag(orderData);

    if (!wkndBounceXMultiPixelUri) {
        return null;
    }

    return (
        <img
            style={{ height: 1, width: 1, border: 0, display: 'none' }}
            src={wkndBounceXMultiPixelUri}
            alt="WKND BounceX MultiPixel"
        />
    );
};

WunderkindTag.propTypes = {
    orderData: shape({
        orderInfo: shape({
            order_number: string
        }),
        cart: shape({
            email: string,
            billing_address: shape({
                telephone: string
            }),
            applied_coupons: array,
            prices: shape({
                grand_total: shape({
                    currency: string,
                    value: number
                }),
                applied_taxes: array
            }),
            items: arrayOf(
                shape({
                    product: shape({
                        id: number,
                        sku: string
                    }),
                    prices: shape({
                        price: shape({
                            value: number
                        })
                    }),
                    quantity: number
                })
            )
        })
    })
};

export default WunderkindTag;
