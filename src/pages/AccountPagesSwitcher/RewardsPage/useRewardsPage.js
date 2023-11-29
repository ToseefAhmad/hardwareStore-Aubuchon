import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { useUserContext } from '@app/context/user';

import RewardsPageOperations from './rewardsPage.gql';

export const useRewardsPage = () => {
    const {
        queries: { getRewardsPageInfoQuery }
    } = RewardsPageOperations;

    const [{ isSignedIn }] = useUserContext();

    const { data: rewardsPageInfoData, error: loadDataError } = useQuery(
        getRewardsPageInfoQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            skip: !isSignedIn
        }
    );

    const pageData = useMemo(() => {
        const value = {};

        if (rewardsPageInfoData) {
            const { rewards } = rewardsPageInfoData;

            value.rewards = {
                pointTotal: rewards.point_total || 0,
                items: rewards.items
            };
        }

        return value;
    }, [rewardsPageInfoData]);

    return {
        pageData,
        loadDataError
    };
};
