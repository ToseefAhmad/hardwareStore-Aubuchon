import { useLocation } from 'react-router-dom';

import { APP_ROUTER_PATHS } from '@app/constants';

export const useIsOrderPage = () => {
    const { pathname } = useLocation();

    const isOrderPage =
        pathname !== APP_ROUTER_PATHS.orderHistory &&
        pathname.includes(APP_ROUTER_PATHS.orderHistory);

    return { isOrderPage };
};
