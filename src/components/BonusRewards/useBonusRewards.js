import { useState } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { useUserContext } from '@app/context/user';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

export const useBonusRewards = grandTotal => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const [{ isSignedIn }] = useUserContext();
    const [isContentVisible, setContentVisible] = useState(false);

    const { storeConfig } = useStoreConfig({
        fields: [
            'hardwareStore_rewardsCampaign_bonus_reward_amount',
            'hardwareStore_rewardsCampaign_description',
            'hardwareStore_rewardsCampaign_enabled',
            'hardwareStore_rewardsCampaign_threshold_amount'
        ]
    });

    const bonusReward =
        storeConfig?.hardwareStore_rewardsCampaign_bonus_reward_amount;
    const description = storeConfig?.hardwareStore_rewardsCampaign_description;
    const isEnabled = storeConfig?.hardwareStore_rewardsCampaign_enabled;
    const thresholdAmount =
        storeConfig?.hardwareStore_rewardsCampaign_threshold_amount;

    const needToSpend = Math.max((thresholdAmount - grandTotal).toFixed(2), 0);
    const progressPercentage = Math.min(
        ((grandTotal / thresholdAmount) * 100).toFixed(2),
        100
    );

    const isNeedToSpendZero = needToSpend === 0;

    const handleExpand = () => {
        setContentVisible(!isContentVisible);
    };

    const handleClick = event => {
        event.preventDefault();
        if (event.target.tagName === 'A' && !isSignedIn) {
            toggleModal({ identifier: MODAL_NAMES.auth });
        }
    };

    return {
        bonusReward,
        description,
        isEnabled,
        thresholdAmount,
        needToSpend,
        progressPercentage,
        handleExpand,
        handleClick,
        isContentVisible,
        isSignedIn,
        isNeedToSpendZero
    };
};
