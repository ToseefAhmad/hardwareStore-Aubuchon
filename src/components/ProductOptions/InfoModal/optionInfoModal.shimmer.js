import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './optionInfoModal.module.css';

const OptionInfoModalShimmer = () => {
    return (
        <>
            <div className={classes.header}>
                <Shimmer width="100%" height="34px" />
            </div>
            <div className={classes.currentStoreBlock}>
                <Shimmer width="100%" height="238px" />
            </div>
            <div className={classes.locationInput}>
                <Shimmer width="100%" height="40px" />
            </div>
            <Shimmer width="100%" height="100%" />
            <div className={classes.footer}>
                <Shimmer width="100%" height="50px" />
            </div>
        </>
    );
};

export default OptionInfoModalShimmer;
