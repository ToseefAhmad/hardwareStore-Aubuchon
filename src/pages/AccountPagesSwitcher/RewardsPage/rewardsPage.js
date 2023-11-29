import React from 'react';
import { FormattedMessage } from 'react-intl';

import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';

import RewardCard from './RewardCard';
import RewardInfoCard from './RewardInfoCard';
import classes from './rewardsPage.module.css';
import RewardsPageShimmer from './rewardsPage.shimmer';
import { useRewardsPage } from './useRewardsPage';

const RewardsPage = () => {
    const { pageData, loadDataError } = useRewardsPage();

    let pageContent = <RewardsPageShimmer />;

    if (loadDataError) {
        pageContent = (
            <div className={classes.errorContainer}>
                <p>
                    <FormattedMessage
                        id="rewardsPage.errorTryAgain"
                        defaultMessage="Something went wrong. Please refresh and try again."
                    />
                </p>
            </div>
        );
    } else if (!isObjectEmpty(pageData)) {
        pageContent = (
            <div className={classes.root}>
                <RewardInfoCard pointTotal={pageData.rewards.pointTotal} />
                <div className={classes.cards}>
                    {pageData.rewards.items.map(({ id, ...rest }) => (
                        <RewardCard {...rest} key={id} />
                    ))}
                </div>
            </div>
        );
    }

    return pageContent;
};

export default RewardsPage;
