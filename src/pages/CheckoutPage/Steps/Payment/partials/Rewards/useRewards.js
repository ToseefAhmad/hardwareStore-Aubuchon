import { useMutation } from '@apollo/client';
import { useCallback, useState } from 'react';

import { useCartContext } from '@magento/peregrine/lib/context/cart';

import { useCheckoutPageContext } from '@app/pages/CheckoutPage/context';

import RewardsOperations from './rewards.gql';

export const useRewards = ({ appliedRewards }) => {
    const {
        mutations: { applyCartRewardsMutation }
    } = RewardsOperations;

    const [{ cartId }] = useCartContext();
    const [, { refreshCurrentStepData }] = useCheckoutPageContext();

    const [applyCartRewards, { loading, called }] = useMutation(
        applyCartRewardsMutation
    );

    const [showAll, setShowAll] = useState(false);
    const [loadingItemId, setLoadingItemId] = useState(null);

    const toggleSetShowAll = useCallback(() => {
        setShowAll(prevState => !prevState);
    }, [setShowAll]);

    const handleApplyCartRewards = useCallback(
        async id => {
            setLoadingItemId(id);
            const currentAppliedRewards = appliedRewards.reduce(
                (acc, reward) => acc + `,${reward.id}`,
                ''
            );

            try {
                await applyCartRewards({
                    variables: {
                        cartId,
                        usedRewards: `${id}${currentAppliedRewards}`
                    }
                });
                refreshCurrentStepData();
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingItemId(null);
            }
        },
        [applyCartRewards, cartId, appliedRewards, refreshCurrentStepData]
    );

    const handleCancelCartRewards = useCallback(
        async id => {
            setLoadingItemId(id);
            const rewards = appliedRewards
                .filter(reward => reward.id !== id)
                .map(reward => reward.id)
                .join(',');

            try {
                await applyCartRewards({
                    variables: {
                        cartId,
                        usedRewards: rewards
                    }
                });
                refreshCurrentStepData();
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingItemId(null);
            }
        },
        [applyCartRewards, cartId, appliedRewards, refreshCurrentStepData]
    );

    return {
        toggleSetShowAll,
        showAll,
        handleApplyCartRewards,
        handleCancelCartRewards,
        loadingItemId,
        firstLoading: loading && !called
    };
};
