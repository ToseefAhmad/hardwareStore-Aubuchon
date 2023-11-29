import React from 'react';

import CmsBlock from '@app/components/CmsBlock/cmsBlock';

import classes from './interiorPaintBanner.module.css';
import InteriorPaintBannerShimmer from './interiorPaintBanner.shimmer';

const InteriorPaintBanner = () => {
    return (
        <CmsBlock
            classes={{
                root: classes.root,
                content: classes.content
            }}
            fallback={<InteriorPaintBannerShimmer />}
            identifiers="interior-exterior-paint-category-banner"
        />
    );
};

export default InteriorPaintBanner;
