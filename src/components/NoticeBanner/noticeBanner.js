import React from 'react';

import Icon from '@app/components/Icon';
import { Clock } from '@app/components/Icons';
import { usePickupStoreContext } from '@app/context/PickupStore';

import classes from './noticeBanner.module.css';

const NoticeBanner = () => {
    const [{ notice_banner }] = usePickupStoreContext();

    if (!notice_banner) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Icon src={Clock} classes={{ root: classes.clockIcon }} />
            {notice_banner}
        </div>
    );
};

export default NoticeBanner;
