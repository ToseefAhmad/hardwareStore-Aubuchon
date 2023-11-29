import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './options.module.css';

const OptionsShimmer = () => {
    return (
        <div className={classes.root}>
            <div className={classes.item}>
                <div className={classes.optionHeader}>
                    <Shimmer width="100%" height="100%" />
                </div>
                <div className={classes.colorButton}>
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
            <div className={classes.item}>
                <div className={classes.optionHeader}>
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
            <div className={classes.item}>
                <div className={classes.optionHeader}>
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
        </div>
    );
};

export default OptionsShimmer;
