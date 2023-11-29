import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './orderHistoryPage.shimmer.module.css';

const OrderHistoryPageShimmer = () => {
    return (
        <div className={classes.root}>
            <Shimmer classes={{ root_rectangle: classes.shimmer }} />
        </div>
    );
};

export default OrderHistoryPageShimmer;
