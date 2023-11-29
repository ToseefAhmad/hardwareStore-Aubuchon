import { APP_MEMBERSHIP_MODAL_OFFERS_TAB_KEY } from '@app-constants';
import { useCallback } from 'react';

import { useTabsContext } from '@app/components/Tabs';

export const useRewardsTabContent = () => {
    const [, { goToTab }] = useTabsContext();

    const handleGoToOffersTab = useCallback(() => {
        goToTab({ tabKey: APP_MEMBERSHIP_MODAL_OFFERS_TAB_KEY });
    }, [goToTab]);

    return {
        handleGoToOffersTab
    };
};
