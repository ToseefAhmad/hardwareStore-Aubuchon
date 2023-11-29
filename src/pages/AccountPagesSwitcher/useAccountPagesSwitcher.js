import { APP_ROUTER_PATHS } from '@app-constants';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useRouteMatch } from 'react-router-dom';

import { ACCOUNT_PAGES_CONFIG } from './config';

const ACCOUNT_META_DESCRIPTION_POSTFIX = ' at HardWareStore.com';

export const useAccountPagesSwitcher = () => {
    const { path } = useRouteMatch();
    const { formatMessage } = useIntl();

    const routeConfig = useMemo(
        () =>
            ACCOUNT_PAGES_CONFIG.find(
                ({ path: configPath }) => configPath === path
            ),
        [path]
    );

    const isShownBackBtn = useMemo(
        () => path !== APP_ROUTER_PATHS.accountPage,
        [path]
    );

    const backBtnPath = useMemo(() => {
        switch (path) {
            case APP_ROUTER_PATHS.addressPage:
            case APP_ROUTER_PATHS.addAddressPage:
                return APP_ROUTER_PATHS.addressBook;
            default:
                return APP_ROUTER_PATHS.accountPage;
        }
    }, [path]);

    const meta_title =
        routeConfig.meta_title || formatMessage(routeConfig.title);
    const meta_description = meta_title + ACCOUNT_META_DESCRIPTION_POSTFIX;

    return {
        routeConfig,
        isShownBackBtn,
        backBtnPath,
        meta_title,
        meta_description
    };
};
