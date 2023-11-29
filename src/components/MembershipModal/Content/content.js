import {
    APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY,
    APP_MEMBERSHIP_MODAL_OFFERS_TAB_KEY
} from '@app-constants';
import { func, oneOf } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Close as CloseIcon, Stars as StartIcon } from '@app/components/Icons';
import { Tabs, Tab } from '@app/components/Tabs';

import classes from './content.module.css';
import OffersTabContent from './OffersTabContent';
import RewardsTabContent from './RewardsTabContent';
import { useMembershipModalContent } from './useMembershipModalContent';

const MembershipModalContent = props => {
    const { initialTabKey, onClose } = props;

    const {
        contentRef,
        onRegisterBtnClick,
        onLinkBtnClick
    } = useMembershipModalContent();

    return (
        <>
            <header className={classes.header}>
                <h3 className={classes.title}>
                    <Icon classes={{ icon: classes.icon }} src={StartIcon} />
                    <FormattedMessage
                        id="membershipModal.title"
                        defaultMessage="Membership"
                    />
                </h3>
                <Button
                    classes={{ secondary: classes.closeButton }}
                    onPress={onClose}
                >
                    <Icon src={CloseIcon} />
                </Button>
            </header>
            <Tabs
                contentRef={contentRef}
                initialTabKey={initialTabKey}
                name="membershipModalTabs"
                classes={{
                    tabsContainer: classes.tabsContainer,
                    tabs: classes.tabs,
                    tabContent: classes.tabContent
                }}
            >
                <Tab
                    tab="Rewards"
                    tabKey={APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY}
                    classes={{
                        tabButton: classes.tabButton
                    }}
                >
                    <RewardsTabContent
                        onBtnClick={onRegisterBtnClick}
                        onLinkBtnClick={onLinkBtnClick}
                    />
                </Tab>
                <Tab
                    tab="Offers"
                    tabKey={APP_MEMBERSHIP_MODAL_OFFERS_TAB_KEY}
                    classes={{
                        tabButton: classes.tabButton
                    }}
                >
                    <OffersTabContent
                        onBtnClick={onRegisterBtnClick}
                        onLinkBtnClick={onLinkBtnClick}
                    />
                </Tab>
            </Tabs>
        </>
    );
};

MembershipModalContent.propTypes = {
    initialTabKey: oneOf([
        APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY,
        APP_MEMBERSHIP_MODAL_OFFERS_TAB_KEY
    ]).isRequired,
    onClose: func.isRequired
};

export default MembershipModalContent;
