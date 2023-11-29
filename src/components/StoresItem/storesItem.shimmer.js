import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './storesItem.shimmer.module.css';

const StoresItemShimmer = () => {
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Shimmer width="100%" height="100%" />
            </div>
        </div>
    );
};

export default StoresItemShimmer;
