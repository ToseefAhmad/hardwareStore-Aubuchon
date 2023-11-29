import classnames from 'classnames';
import { bool } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './googleReviewsCarousel.shimmer.module.css';

const GoogleReviewShimmer = ({ isStoreViewPage }) => {
    return (
        <div
            className={classnames(classes.root, {
                [classes.rootMarginTop]: isStoreViewPage
            })}
        >
            <div className={classes.title}>
                <Shimmer width="300px" height="50px" />
            </div>
            <div className={classes.reviewInfo}>
                <Shimmer width="100%" height="92px" />
            </div>
            <div className={classes.reviews}>
                <Shimmer width="100%" height="372px" />
            </div>
        </div>
    );
};

GoogleReviewShimmer.propTypes = {
    isStoreViewPage: bool
};

GoogleReviewShimmer.defaultProps = {
    isStoreViewPage: false
};

export default GoogleReviewShimmer;
