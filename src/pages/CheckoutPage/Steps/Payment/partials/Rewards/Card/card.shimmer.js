import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './card.shimmer.module.css';

const CardShimmer = () => {
    return (
        <div className={classes.root}>
            <Shimmer width="100%" height="100%" />
        </div>
    );
};

export default CardShimmer;
