import { string } from 'prop-types';
import React from 'react';

import BaseGoogleReviewsCarousel from '@app/components/GoogleReviewsCarousel';

import { useGoogleReviewsCarousel } from './useGoogleReviewsCarousel';

const GoogleReviewsCarousel = ({ title }) => {
    const {
        isLoading,
        pickupStoreId,
        storeName,
        brandName
    } = useGoogleReviewsCarousel();
    return (
        <BaseGoogleReviewsCarousel
            showLoading={isLoading}
            title={title}
            pickupStoreId={pickupStoreId}
            storeName={storeName}
            brandName={brandName}
        />
    );
};

GoogleReviewsCarousel.propTypes = {
    title: string
};

export default GoogleReviewsCarousel;
