import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './colorModalShimmer.module.css';

const ColorContentShimmer = () => {
    const items = Array.from(Array(12).keys(), index => {
        return (
            <div className={classes.item} key={index}>
                <Shimmer width="100%" height="100%" />
            </div>
        );
    });

    return (
        <>
            <div className={classes.content}>{items}</div>
        </>
    );
};

export default ColorContentShimmer;
