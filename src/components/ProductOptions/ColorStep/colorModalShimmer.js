import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import ColorItemsShimmer from '@app/components/ProductOptions/ColorStep/colorItemsShimmer';

import classes from './colorModalShimmer.module.css';

const ColorModalShimmer = () => {
    return (
        <>
            <div className={classes.header}>
                <Shimmer width="100%" height="34px" />
            </div>
            <ColorItemsShimmer />
            <div className={classes.footer}>
                <Shimmer width="100%" height="50px" />
            </div>
        </>
    );
};

export default ColorModalShimmer;
