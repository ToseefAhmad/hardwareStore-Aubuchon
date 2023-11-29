import { arrayOf, shape, string, number } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';

import Card from './Card';
import classes from './rewards.module.css';
import RewardsShimmer from './rewards.shimmer';
import { useRewards } from './useRewards';

const Rewards = ({ rewardItems, appliedRewards }) => {
    const {
        toggleSetShowAll,
        showAll,
        handleApplyCartRewards,
        handleCancelCartRewards,
        loadingItemId,
        firstLoading
    } = useRewards({ appliedRewards });

    return (
        <>
            {firstLoading ? (
                <RewardsShimmer />
            ) : (
                <div className={classes.root}>
                    <div className={classes.cards}>
                        {rewardItems.map(({ id, ...rest }, index) => {
                            const isCurrentLoading = id === loadingItemId;

                            return (
                                <Card
                                    {...rest}
                                    id={id}
                                    key={id}
                                    isLoading={isCurrentLoading}
                                    isDisabled={
                                        loadingItemId && !isCurrentLoading
                                    }
                                    isHidden={index > 1 && !showAll}
                                    onApply={handleApplyCartRewards}
                                    onCancel={handleCancelCartRewards}
                                />
                            );
                        })}
                    </div>
                    {rewardItems.length > 2 && (
                        <Button
                            priority="low"
                            onPress={toggleSetShowAll}
                            type="button"
                            classes={{
                                secondary: classes.button
                            }}
                        >
                            {showAll
                                ? 'View Less Rewards'
                                : 'Load More Rewards'}
                        </Button>
                    )}
                </div>
            )}
        </>
    );
};

Rewards.propTypes = {
    rewardItems: arrayOf(
        shape({
            id: string,
            amount: number,
            expires: string
        })
    ),
    appliedRewards: arrayOf(
        shape({
            id: string,
            amount: number
        })
    )
};

export default Rewards;
