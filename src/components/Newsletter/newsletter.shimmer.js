import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import defaultClasses from './newsletter.module.css';
import defaultShimmerClasses from './newsletter.shimmer.module.css';

const fullSizeShimmer = <Shimmer width="100%" height="100%" />;

const NewsletterShimmer = () => {
    const classes = useStyle(defaultClasses, defaultShimmerClasses);

    return (
        <div className={classes.root}>
            <div className={classes.greetingWrapper}>
                <div className={classes.icon}>{fullSizeShimmer}</div>
                <div className={classes.greetingTextWrapper}>
                    <h4 className={classes.title}>{fullSizeShimmer}</h4>
                    <div className={classes.infoText}>{fullSizeShimmer}</div>
                </div>
            </div>
            <div className={classes.form}>
                <Shimmer type="textInput" />
            </div>
            <div className={classes.legal}>{fullSizeShimmer}</div>
        </div>
    );
};

export default NewsletterShimmer;
