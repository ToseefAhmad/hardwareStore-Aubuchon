import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './sidebar.module.css';

const SidebarShimmer = () => (
    <aside className={classes.root}>
        <Shimmer width="100%" height="290px" />
    </aside>
);

export default SidebarShimmer;
