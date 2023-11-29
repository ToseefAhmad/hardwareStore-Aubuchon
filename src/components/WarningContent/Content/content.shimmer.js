import classnames from 'classnames';
import { bool } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/peregrine/lib/context/style';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import defaultClasses from './content.module.css';
import defaultShimmerClasses from './contentShimmer.module.css';

const ContentShimmer = ({ isSpecialOrder }) => {
    const classes = useStyle(defaultClasses, defaultShimmerClasses);

    return (
        <>
            <div className={classes.header}>
                <div
                    className={classnames(classes.headerShimmer, {
                        [classes.specialHeaderShimmer]: isSpecialOrder
                    })}
                >
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
            {!isSpecialOrder && (
                <div className={classes.content}>
                    <div className={classes.contentShimmer}>
                        <Shimmer width="100%" height="100%" />
                    </div>
                </div>
            )}
            {isSpecialOrder && (
                <div className={classes.paragraphShimmer}>
                    <Shimmer width="100%" height="100%" />
                </div>
            )}
            <div
                className={classnames(classes.textShimmer, {
                    [classes.specialTextShimmer]: isSpecialOrder
                })}
            >
                <Shimmer width="100%" height="100%" />
            </div>
            <div
                className={classnames(classes.controls, {
                    [classes.special]: isSpecialOrder
                })}
            >
                <div className={classes.button}>
                    <Shimmer width="100%" height="100%" />
                </div>
                <div className={classes.button}>
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
        </>
    );
};

ContentShimmer.defaultProps = {
    isSpecialOrder: false
};
ContentShimmer.propTypes = {
    isSpecialOrder: bool
};

export default ContentShimmer;
