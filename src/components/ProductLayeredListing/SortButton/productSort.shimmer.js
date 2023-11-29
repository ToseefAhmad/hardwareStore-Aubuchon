import { shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import defaultClasses from './productSort.shimmer.module.css';

const ProductSortShimmer = ({ classes: propsClasses }) => {
    const classes = useStyle(defaultClasses, propsClasses);

    return (
        <div className={classes.root}>
            <Shimmer width="100%" height="100%" />
        </div>
    );
};

ProductSortShimmer.propTypes = {
    classes: shape({
        root: string
    })
};

export default ProductSortShimmer;
