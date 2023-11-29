import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './checkoutHeader.module.css';

const CheckoutHeaderShimmer = () => (
    <header className={classes.root}>
        <div className={classes.iconButton}>
            <Shimmer width="8px" height="14px" />
        </div>
        <div className={classes.imageContainer}>
            <Shimmer width="100%" height="100%" />
        </div>
    </header>
);

export default CheckoutHeaderShimmer;
