import React from 'react';

import PageHeadingShimmer from '@app/components/PageHeadingShimmer';

import SitemapContentShimmer from './sitemapContent.shimmer';
import classes from './sitemapPage.module.css';

const SiteMapPageShimmer = () => {
    return (
        <>
            <div className={classes.root}>
                <h1 className={classes.title}>
                    <PageHeadingShimmer />
                </h1>
                <SitemapContentShimmer />
            </div>
            <div className={classes.root}>
                <h1 className={classes.title}>
                    <PageHeadingShimmer />
                </h1>
                <SitemapContentShimmer itemsCount={8} />
            </div>
        </>
    );
};

export default SiteMapPageShimmer;
