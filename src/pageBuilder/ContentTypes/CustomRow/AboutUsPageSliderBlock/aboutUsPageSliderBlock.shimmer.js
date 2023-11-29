import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './aboutUsPageSliderBlock.shimmer.module.css';

const AboutUsPageSliderBlockShimmer = () => (
    <Shimmer classes={{ root_rectangle: classes.shimmer }} />
);

export default AboutUsPageSliderBlockShimmer;
