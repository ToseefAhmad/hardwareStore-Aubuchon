import { func } from 'prop-types';
import React, { useMemo } from 'react';

import Icon from '@app/components/Icon';
import {
    Gift as GiftIcon,
    Percentage15 as Percentage15Icon,
    StarSmall as StarIcon,
    ShoppingBag as ShoppingBagIcon,
    Mail as MailIcon
} from '@app/components/Icons';
import LinkButton from '@app/components/LinkButton';
import CallToActionBlock from '@app/components/MembershipModal/Content/CallToActionBlock';

import classes from './rewardsTabContent.module.css';
import { useRewardsTabContent } from './useRewardsTabContent';

const RewardsTabContent = ({ onLinkBtnClick, onBtnClick }) => {
    const { handleGoToOffersTab } = useRewardsTabContent();

    const rewards = useMemo(
        () => [
            {
                key: 'dollarPoints',
                icon: ShoppingBagIcon,
                title:
                    'Shop & Earn 1 point per dollar spent on most purchases in store and online'
            },
            {
                key: 'rewardPoints',
                icon: StarIcon,
                title: '$5 Reward earned for every 250 points'
            },
            {
                key: 'emailOffer',
                icon: MailIcon,
                title: 'Exclusive offers via email'
            },
            {
                key: 'bdayOffer',
                icon: GiftIcon,
                title: 'Birthday offer'
            },
            {
                key: 'offFirstOrder',
                icon: Percentage15Icon,
                title: '15% off first HardwareStore.com order*',
                onClick: handleGoToOffersTab
            }
        ],
        [handleGoToOffersTab]
    );

    return (
        <>
            <ul className={classes.rewardsList}>
                {rewards.map(({ key, icon, title, onClick }) => (
                    <li key={key} className={classes.rewardsListItem}>
                        <div className={classes.rewardsIcon}>
                            <Icon src={icon} />
                        </div>
                        <p className={classes.rewardTitle}>
                            {onClick ? (
                                <LinkButton onPress={onClick}>
                                    {title}
                                </LinkButton>
                            ) : (
                                title
                            )}
                        </p>
                    </li>
                ))}
            </ul>
            <CallToActionBlock
                onBtnClick={onBtnClick}
                onLinkBtnClick={onLinkBtnClick}
            />
        </>
    );
};

RewardsTabContent.propTypes = {
    onLinkBtnClick: func.isRequired,
    onBtnClick: func.isRequired
};

export default RewardsTabContent;
