import { bool } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './storeDetails.shimmer.module.css';

const StoreDetailsShimmer = ({ isMobile }) => {
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                {isMobile && <Shimmer width="30px" height="24px" />}
                <div className={classes.titleShimmer}>
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
            <div className={classes.image}>
                <Shimmer width="100%" height="100%" />
            </div>

            <div className={classes.content}>
                <div className={classes.logo}>
                    <Shimmer width="100%" height="100%" />
                </div>
                <div className={classes.fields}>
                    <div className={classes.address}>
                        <Shimmer width="100%" height="100%" />
                    </div>
                </div>
                <div className={classes.buttonWrap}>
                    <Shimmer width="100%" height="100%" />
                </div>
                <div className={classes.fields}>
                    <div className={classes.schedule}>
                        <Shimmer width="100%" height="100%" />
                    </div>
                    <div className={classes.phone}>
                        <Shimmer width="100%" height="100%" />
                    </div>
                    <div className={classes.mail}>
                        <Shimmer width="100%" height="100%" />
                    </div>
                </div>
                <div className={classes.buttonWrap}>
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
        </div>
    );
};

StoreDetailsShimmer.propTypes = {
    isMobile: bool
};

export default StoreDetailsShimmer;
