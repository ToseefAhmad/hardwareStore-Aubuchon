import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import SidebarShimmer from '../../partials/Sidebar/sidebar.shimmer';

import classes from './pickup.module.css';

const PickupStepShimmer = () => {
    return (
        <section className={classes.root}>
            <div className={classes.content}>
                <Shimmer width="100%" height="475px" />
            </div>
            <SidebarShimmer />
        </section>
    );
};

export default PickupStepShimmer;
