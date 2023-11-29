import { number } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './filterModal.shimmer.module.css';

const FilterModalShimmer = ({ itemsNumber }) => {
    const items = Array.from(Array(itemsNumber).keys(), index => {
        return (
            <div className={classes.item} key={index}>
                <Shimmer width="100%" height="24px" />
            </div>
        );
    });

    return (
        <>
            <div className={classes.header}>
                <Shimmer width="100%" height="100%" />
            </div>
            {items}
            <div className={classes.footer}>
                <Shimmer width="100%" height="50px" />
            </div>
        </>
    );
};

FilterModalShimmer.propTypes = {
    itemsNumber: number
};

FilterModalShimmer.defaultProps = {
    itemsNumber: 3
};

export default FilterModalShimmer;
