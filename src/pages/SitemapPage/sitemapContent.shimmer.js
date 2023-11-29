import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Icon from '@app/components/Icon';
import { CaretUp } from '@app/components/Icons';

import classes from './sitemapContent.shimmer.module.css';

const SitemapContentShimmer = ({ itemsCount = 20 }) => {
    const shimmerBody = <Shimmer className={classes.shimmerBody} />;
    const shimmerElements = Array(itemsCount).fill(shimmerBody);

    return (
        <div className={classes.root}>
            <div className={classes.shimmerContainer}>
                {shimmerElements.map((shimmer, index) => {
                    return (
                        <div key={index} className={classes.shimmerWrapper}>
                            {shimmer}
                            <div key={index} className={classes.shimmerIcon}>
                                <Icon src={CaretUp} size={24} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SitemapContentShimmer;
