import { bool, func, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Button from '@app/components/Button';
import CurrentStoreInfo from '@app/components/CurrentStoreInfo';
import Icon from '@app/components/Icon';
import { Phone, Mail, Clock } from '@app/components/Icons';
import Link from '@app/components/Link';
import StoreSchedule from '@app/components/StoreComponents/Schedule';

import defaultClasses from './currentStoreBlock.module.css';
import { useCurrentStoreBlock } from './useCurrentStoreBlock';

const CurrentStoreBlock = ({
    isCurrentPickupBlockExpanded,
    setIsCurrentPickupBlockExpanded,
    classes: propClasses
}) => {
    const {
        phone,
        email,
        schedule,
        url_key,
        toggleIsShownMore
    } = useCurrentStoreBlock({
        setIsCurrentPickupBlockExpanded
    });
    const classes = useStyle(defaultClasses, propClasses);

    return (
        <div className={classes.root}>
            <p className={classes.title}>Current pickup store:</p>
            <CurrentStoreInfo
                classes={{
                    workHours: classes.workHours,
                    close: classes.closeStatus,
                    open: classes.openStatus
                }}
            />
            {isCurrentPickupBlockExpanded && (
                <div className={classes.details}>
                    <a className={classes.detailsItem} href={`tel:${phone}`}>
                        <Icon
                            classes={{ icon: classes.detailsIcon }}
                            src={Phone}
                        />
                        {phone}
                    </a>
                    <a className={classes.detailsItem} href={`mailto:${email}`}>
                        <Icon
                            classes={{ icon: classes.detailsIcon }}
                            src={Mail}
                        />
                        {email}
                    </a>
                    <div className={classes.scheduleWrap}>
                        <Icon
                            classes={{ icon: classes.detailsIconClock }}
                            src={Clock}
                        />
                        <div>
                            <StoreSchedule schedule={schedule} />
                        </div>
                    </div>
                    <Link to={`/stores/${url_key}`}>
                        <Button priority="high" isShort>
                            More Info
                        </Button>
                    </Link>
                </div>
            )}
            <Button
                classes={{
                    secondary: classes.showMoreBtn
                }}
                isShort
                onPress={toggleIsShownMore}
            >
                {isCurrentPickupBlockExpanded
                    ? 'Hide store details'
                    : 'Show store details'}
            </Button>
        </div>
    );
};

CurrentStoreBlock.propTypes = {
    isCurrentPickupBlockExpanded: bool.isRequired,
    setIsCurrentPickupBlockExpanded: func.isRequired,
    classes: shape({
        root: string
    })
};

export default CurrentStoreBlock;
