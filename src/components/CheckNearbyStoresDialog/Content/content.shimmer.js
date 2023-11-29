import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './contentShimmer.module.css';

const CheckNearbyStoresDialogContentShimmer = () => {
    return (
        <>
            <div className={classes.header}>
                <Shimmer width="100%" height="100%" />
            </div>
            <div className={classes.filters}>
                <Shimmer width="100%" height="100%" />
            </div>
            <div className={classes.main}>
                <Shimmer width="100%" height="100%" />
            </div>
        </>
    );
};

export default CheckNearbyStoresDialogContentShimmer;
