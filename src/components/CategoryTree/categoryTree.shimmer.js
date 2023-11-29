import { shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import defaultClasses from './categoryTree.shimmer.module.css';

const CategoryTreeShimmer = ({ classes: propClasses }) => {
    const classes = useStyle(defaultClasses, propClasses);

    const items = Array.from(Array(10).keys(), index => {
        return (
            <li className={classes.listItem} key={index}>
                <Shimmer width="100%" height="100%" />
            </li>
        );
    });

    return (
        <Fragment>
            <ul className={classes.list}>{items}</ul>
        </Fragment>
    );
};

CategoryTreeShimmer.propTypes = {
    classes: shape({
        root: string
    })
};

export default CategoryTreeShimmer;
