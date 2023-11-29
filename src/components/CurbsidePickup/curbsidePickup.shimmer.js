import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './curbsidePickup.shimmer.module.css';

const CurbsidePickupShimmer = () => {
    return (
        <div className={classes.root}>
            <Shimmer classes={{ root_rectangle: classes.desktopNavShimmer }} />
            <div className={classes.section}>
                <Shimmer
                    classes={{ root_rectangle: classes.sectionTitleShimmer }}
                />
                <Shimmer
                    classes={{
                        root_rectangle: classes.checkInFormDescriptionShimmer
                    }}
                />
                <Shimmer
                    classes={{
                        root_rectangle: classes.checkInFormTextAreaShimmer
                    }}
                />
                <Shimmer
                    classes={{
                        root_rectangle: classes.checkInFormButtonShimmer
                    }}
                />
            </div>
            <div className={classes.section}>
                <Shimmer
                    classes={{ root_rectangle: classes.sectionTitleShimmer }}
                />
                <Shimmer
                    classes={{ root_rectangle: classes.mobileNavShimmer }}
                />
            </div>
            <div className={classes.section}>
                <Shimmer classes={{ root_rectangle: classes.itemsShimmer }} />
            </div>
            <div className={classes.section}>
                <Shimmer
                    classes={{ root_rectangle: classes.storeInfoTitleShimmer }}
                />
                <Shimmer
                    classes={{ root_rectangle: classes.storeInfoShimmer }}
                />
            </div>
        </div>
    );
};

export default CurbsidePickupShimmer;
