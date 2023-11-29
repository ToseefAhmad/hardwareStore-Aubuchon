import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './managers.shimmer.module.css';

const ManagersShimmer = () => {
    return (
        <div className={classes.root}>
            <div className={classes.manager}>
                <div className={classes.imageContainer}>
                    <Shimmer width="100%" height="100%" />
                </div>
                <div className={classes.description}>
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
            <div className={classes.manager}>
                <div className={classes.imageContainer}>
                    <Shimmer width="100%" height="100%" />
                </div>
                <div className={classes.description}>
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
        </div>
    );
};

export default ManagersShimmer;
