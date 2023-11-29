import { number } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CircleProgressBar from './CircleProgressBar';
import classes from './rewardInfoCard.module.css';

const RewardInfoCard = props => {
    const { pointTotal } = props;

    return (
        <div className={classes.root}>
            <div className={classes.info}>
                <h3 className={classes.title}>
                    <FormattedMessage
                        id="rewardsPage.rewardInfoCardTitle"
                        defaultMessage="My Rewards"
                    />
                </h3>
                <p className={classes.paragraph}>
                    <FormattedMessage
                        id="rewardsPage.rewardInfoCardDescr"
                        defaultMessage="The best just got better, claim your rewards today!"
                    />
                </p>
            </div>
            <div className={classes.counter}>
                <CircleProgressBar pointTotal={pointTotal} />
            </div>
        </div>
    );
};

RewardInfoCard.propTypes = {
    pointTotal: number.isRequired
};

export default RewardInfoCard;
