import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './relatedProducts.module.css';

const RelatedProductsShimmer = () => {
    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={classes.shimmerRoot}>
                    <div className={classes.shimmerImage}>
                        <Shimmer width={'120px'} height={'120px'} />
                    </div>
                    <div className={classes.shimmerDescription}>
                        <Shimmer width={'100%'} height={'20px'} />
                        <Shimmer width={'100%'} height={'20px'} />
                        <Shimmer width={'100%'} height={'20px'} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default RelatedProductsShimmer;
