import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import SidebarShimmer from '../../partials/Sidebar/sidebar.shimmer';

import classes from './info.module.css';

const InfoStepShimmer = () => {
    return (
        <section className={classes.root}>
            <div className={classes.content}>
                <Shimmer width="100%" height="475px" />
            </div>
            <SidebarShimmer />
        </section>
    );
};

export default InfoStepShimmer;
