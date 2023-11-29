import { number, string } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './rewardCard.module.css';

const RewardCard = props => {
    const { amount, expires } = props;

    return (
        <div className={classes.root}>
            <strong className={classes.strong}>
                <span className={classes.money}>${amount}</span>{' '}
                <span className={classes.title}>
                    <FormattedMessage
                        id="rewardsPage.rewardCardTitle"
                        defaultMessage="Reward"
                    />
                </span>
            </strong>
            <p>
                <FormattedMessage
                    id="rewardsPage.rewardCardDateLabel"
                    defaultMessage="Expires"
                />{' '}
                {expires}
            </p>
        </div>
    );
};

RewardCard.propTypes = {
    amount: number.isRequired,
    expires: string.isRequired
};

export default RewardCard;
