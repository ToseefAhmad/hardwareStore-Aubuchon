import { string } from 'prop-types';
import React from 'react';

import BaseGoogleReviewsCarousel from '@app/components/GoogleReviewsCarousel';

const GoogleReviewsCarouselShimmer = ({ title }) => {
    return <BaseGoogleReviewsCarousel title={title} showLoading={true} />;
};

GoogleReviewsCarouselShimmer.propTypes = {
    title: string
};

export default GoogleReviewsCarouselShimmer;
