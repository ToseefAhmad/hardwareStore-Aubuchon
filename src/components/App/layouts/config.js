import { APP_ROUTER_PATHS } from '@app-constants';
import React from 'react';

import DefaultLayout from './components/default';

const CheckoutLayout = React.lazy(() => import('./components/checkout'));
const OrderLayout = React.lazy(() => import('./components/order'));

export const APP_LAYOUTS = {
    default: 'default',
    checkout: 'checkout',
    order: 'order'
};

export const APP_LAYOUT_MATCHES = [
    {
        path: APP_ROUTER_PATHS.checkout,
        code: APP_LAYOUTS.checkout
    },
    {
        path: APP_ROUTER_PATHS.checkoutSuccessPage,
        code: APP_LAYOUTS.checkout
    },
    {
        path: APP_ROUTER_PATHS.orderViewPage,
        code: APP_LAYOUTS.order
    },
    {
        path: APP_ROUTER_PATHS.guestOrderViewPage,
        code: APP_LAYOUTS.order
    },
    {
        path: APP_ROUTER_PATHS.orderCurbsidePickupPage,
        code: APP_LAYOUTS.order
    },
    {
        path: APP_ROUTER_PATHS.guestOrderCurbsidePickupPage,
        code: APP_LAYOUTS.order
    }
];

export const APP_LAYOUT_COMPONENTS = {
    [APP_LAYOUTS.default]: DefaultLayout,
    [APP_LAYOUTS.checkout]: CheckoutLayout,
    [APP_LAYOUTS.order]: OrderLayout
};
