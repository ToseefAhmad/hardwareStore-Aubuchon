import { shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import defaultClasses from './categoryBrand.shimmer.module.css';

const CategoryBrandShimmer = ({ classes: propClasses }) => {
    const classes = useStyle(defaultClasses, propClasses);

    return (
        <Fragment>
            <div className={classes.root}>
                <Shimmer width="100%" height="100%" />
            </div>
        </Fragment>
    );
};

CategoryBrandShimmer.propTypes = {
    classes: shape({
        root: string
    })
};

export default CategoryBrandShimmer;
