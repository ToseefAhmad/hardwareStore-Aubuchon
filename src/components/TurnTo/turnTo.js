import { arrayOf, number, shape, string } from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useTurnTo } from './useTurnTo';

const TurnTo = ({ orderData }) => {
    const { site_key } = useTurnTo(orderData);
    if (!site_key) {
        return null;
    }
    const turnToWidgetScript = `https://widgets.turnto.com/v5/widgets/${site_key}/js/turnto.js`;

    return (
        <>
            <Helmet>
                <script src={turnToWidgetScript} async />
            </Helmet>
            <div id="tt-comment-capture" />
        </>
    );
};

TurnTo.propTypes = {
    orderData: shape({
        orderInfo: shape({
            order_number: string
        }),
        cart: shape({
            email: string,
            billing_address: shape({
                telephone: string
            }),
            items: arrayOf(
                shape({
                    product: shape({
                        id: number,
                        sku: string,
                        name: string,
                        url_key: string,
                        small_image: shape({
                            url: string
                        })
                    }),
                    prices: shape({
                        price: shape({
                            value: number
                        })
                    })
                })
            )
        })
    })
};

export default TurnTo;
