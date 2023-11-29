import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './currentStoreInfo.shimmer.module.css';

const CurrentStoreInfoShimmer = () => {
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Shimmer width="100%" height="100%" />
            </div>
        </div>
    );
};

export default CurrentStoreInfoShimmer;
