import { APP_ROUTER_PATHS } from '@app-constants';
import { number, shape } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon from '@app/components/Icon';
import { Cup } from '@app/components/Icons';
import Link from '@app/components/Link';

import classes from './rewardInfo.module.css';

const RewardInfo = ({ data: { points, money } }) => (
    <section className={classes.root}>
        <Icon src={Cup} classes={{ icon: classes.icon }} />
        <div className={classes.info}>
            <h4 className={classes.title}>
                <FormattedMessage
                    id="accountPage.rewardInformationTitle"
                    defaultMessage="Reward Information"
                />
            </h4>
            <p className={classes.paragraph}>
                <FormattedMessage
                    id="accountPage.rewardBalance"
                    defaultMessage="Your balance is"
                />{' '}
                <strong className={classes.strong}>
                    {points}{' '}
                    <FormattedMessage
                        id="accountPage.rewardPoint"
                        defaultMessage="Point(s)"
                    />{' '}
                    (${money}{' '}
                    <FormattedMessage
                        id="accountPage.inRewards"
                        defaultMessage="in rewards"
                    />
                    )
                </strong>
            </p>
        </div>
        <Link
            className={classes.link}
            to={APP_ROUTER_PATHS.rewardsPage}
            isButtonLike
            priority="secondary"
        >
            <FormattedMessage
                id="accountPage.rewardInformationLink"
                defaultMessage="View My Rewards"
            />
        </Link>
    </section>
);

RewardInfo.propTypes = {
    data: shape({
        points: number.isRequired,
        money: number.isRequired
    })
};

export default RewardInfo;
