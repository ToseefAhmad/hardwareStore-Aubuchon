import { shape, string, bool } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import defaultClasses from './breadcrumbs.module.css';

const BreadcrumbsShimmer = props => {
    const { isMobile } = props;
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.root} aria-live="polite" aria-busy="true">
            {isMobile && <Shimmer width={1.825} borderRadius={0.313} />}
        </div>
    );
};

BreadcrumbsShimmer.propTypes = {
    classes: shape({
        root: string
    }),
    isMobile: bool
};

export default BreadcrumbsShimmer;
