import { string, shape } from 'prop-types';
import React, { Suspense } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './categoryBanner.module.css';
import { CATEGORY_BANNER_CONFIG } from './config';

const CategoryBanner = props => {
    const { urlKey, classes: propClasses, ...restProps } = props;
    const classes = useStyle(defaultClasses, propClasses);

    const configData = CATEGORY_BANNER_CONFIG[urlKey];

    if (!configData) return null;

    const { Component, ComponentShimmer } = configData;

    return (
        <aside className={classes.root} aria-label="Category banner">
            <Suspense fallback={ComponentShimmer && <ComponentShimmer />}>
                <Component {...restProps} />
            </Suspense>
        </aside>
    );
};

CategoryBanner.propTypes = {
    urlKey: string.isRequired,
    classes: shape({
        root: string
    })
};

export default CategoryBanner;
