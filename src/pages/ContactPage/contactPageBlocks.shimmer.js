import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './contactPageBlocks.shimmer.module.css';

const ContactPageBlocksShimmer = () => {
    return (
        <div className={classes.root}>
            <div className={classes.firstItem}>
                <Shimmer width="100%" height="100%" />
            </div>
            <div className={classes.secondItem}>
                <Shimmer width="100%" height="100%" />
            </div>
            <div className={classes.thirdItem}>
                <Shimmer width="100%" height="100%" />
            </div>
        </div>
    );
};

export default ContactPageBlocksShimmer;
