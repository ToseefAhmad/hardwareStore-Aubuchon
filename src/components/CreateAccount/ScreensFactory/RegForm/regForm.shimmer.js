import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './regForm.shimmer.module.css';

const RegFormShimmer = () => {
    return (
        <>
            <div className={classes.root}>
                <Shimmer width="100%" height="100vh" />
            </div>
        </>
    );
};

export default RegFormShimmer;
