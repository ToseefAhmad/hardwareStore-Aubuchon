import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import PageHeadingShimmer from '@app/components/PageHeadingShimmer';

import classes from './contactPage.module.css';
import ContactPageBlocksShimmer from './contactPageBlocks.shimmer';

const ContactPageShimmer = () => {
    return (
        <div className={classes.root}>
            <h1 className={classes.title}>
                <PageHeadingShimmer />
            </h1>
            <ContactPageBlocksShimmer />
            <div className={classes.mapWrapper}>
                <h2 className={classes.subTitle}>
                    <Shimmer width={'25%'} height={'100%'} />
                </h2>
                <div className={classes.map}>
                    <div className={classes.mapShimmer}>
                        <Shimmer width={'100%'} height={'100%'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPageShimmer;
