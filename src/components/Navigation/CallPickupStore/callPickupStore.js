import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Icon from '@app/components/Icon';
import { Phone } from '@app/components/Icons';

import classes from './callPickupStore.module.css';
import { useCallPickupStore } from './useCallPickupStore';

const CallPickupStore = () => {
    const { dataIsLoaded, phone, city, region_code } = useCallPickupStore();

    if (!dataIsLoaded) {
        return (
            <Shimmer
                width="100%"
                height="54px"
                borderRadius="5px"
                style={{ display: 'grid' }}
            />
        );
    } else {
        return (
            <a href={`tel:${phone}`} className={classes.root}>
                <span className={classes.content}>
                    <Icon classes={{ icon: classes.icon }} src={Phone} />
                    Call {city}, {region_code}{' '}
                    <span className={classes.phone}>({phone})</span>
                </span>
            </a>
        );
    }
};

export default CallPickupStore;
