import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './orderDetails.shimmer.module.css';

const OrderDetailsShimmer = () => {
    return (
        <div className={classes.root}>
            <Shimmer classes={{ root_rectangle: classes.navShimmer }} />
            <div className={classes.summarySection}>
                <div className={classes.section}>
                    <Shimmer
                        classes={{
                            root_rectangle: classes.sectionTitleShimmer
                        }}
                    />
                    <Shimmer
                        classes={{
                            root_rectangle: classes.sectionContentShimmer
                        }}
                    />
                </div>
                <div className={classes.section}>
                    <Shimmer
                        classes={{
                            root_rectangle: classes.sectionTitleShimmer
                        }}
                    />
                    <Shimmer
                        classes={{
                            root_rectangle: classes.sectionContentShimmer
                        }}
                    />
                </div>
            </div>
            <div className={classes.section}>
                <Shimmer
                    classes={{
                        root_rectangle: classes.progressSectionTitleShimmer
                    }}
                />
                <Shimmer
                    classes={{ root_rectangle: classes.progressBarShimmer }}
                />
                <div className={classes.progressAdditionalInfoSection}>
                    {Array.from({ length: 3 })
                        .fill(null)
                        .map((v, idx) => (
                            <Shimmer
                                key={idx}
                                classes={{
                                    root_rectangle:
                                        classes.progressAdditionalInfoItem
                                }}
                            />
                        ))}
                </div>
                <Shimmer
                    classes={{ root_rectangle: classes.statusSectionShimmer }}
                />
            </div>
        </div>
    );
};

export default OrderDetailsShimmer;
