import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './interiorPaintBanner.shimmer.module.css';

const InteriorPaintBannerShimmer = () => (
    <Shimmer classes={{ root_rectangle: classes.root }} />
);

export default InteriorPaintBannerShimmer;
