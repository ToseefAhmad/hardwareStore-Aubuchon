import classnames from 'classnames';
import { bool, number, string, shape } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Button from '@app/components/Button';
import RatingStars from '@app/components/ProductFullDetail/RatingStars';
import { SnapSlider } from '@app/components/ReactSnapSlider';
import SnapSliderWithPagination from '@app/components/ReactSnapSlider/SnapSliderWithPagination';
import { useTailwindContext } from '@app/context/tailwind';

import ErrorMessage from './content/errorMessage';
import GoogleReviewCard from './content/googleReviewCard';
import GoogleReviewsCarouselShimmer from './content/googleReviewsCarouselShimmer';
import defaultClasses from './googleReviewsCarousel.module.css';
import { useGoogleReviewsCarousel } from './useGoogleReviewsCarousel';
const GoogleReviewsCarousel = ({
    showLoading,
    pickupStoreId,
    title,
    brandName,
    storeName,
    classes: propClasses,
    isStoreViewPage
}) => {
    const { googleReviews, isLoading, error } = useGoogleReviewsCarousel({
        pickupStoreId,
        showLoading
    });

    const { screens } = useTailwindContext();
    const { innerWidth } = useWindowSize();
    const isMobile = innerWidth < screens.lg;

    const classes = useStyle(defaultClasses, propClasses);
    const SliderComponent = isMobile ? SnapSliderWithPagination : SnapSlider;
    if (showLoading || isLoading) {
        return (
            <GoogleReviewsCarouselShimmer isStoreViewPage={isStoreViewPage} />
        );
    }
    if (error) {
        return <ErrorMessage />;
    }

    const reviewPadding = isStoreViewPage
        ? classes.reviewPaddingStorePage
        : classes.reviewPadding;
    const reviewMargin = isStoreViewPage
        ? classes.reviewMarginStorePage
        : classes.reviewMargin;
    return (
        <div
            className={classnames({
                [classes.wrapper]: isStoreViewPage
            })}
        >
            <span className={classes.customerTitle}>{title}</span>
            <div
                className={classnames(
                    classes.review,
                    reviewPadding,
                    reviewMargin
                )}
            >
                <div>
                    <p
                        className={classes.reviewAddress}
                    >{`${brandName} in ${storeName}`}</p>
                    <div className={classes.reviewStarsWrapper}>
                        <div
                            className={classnames(classes.reviewStars, {
                                [classes.hideReviewStars]: isStoreViewPage
                            })}
                        >
                            <p className={classes.reviewAverage}>
                                {googleReviews.avg_rating.toFixed(2)}
                            </p>
                            <div className={classes.ratingStars}>
                                <RatingStars
                                    rating={googleReviews.avg_rating}
                                    hideReviewCount
                                    classes={{
                                        starColorFilled: classes.ratingColor
                                    }}
                                />
                            </div>
                            <span className={classes.slash} />
                        </div>
                        <p
                            className={classnames(classes.reviewTotal, {
                                [classes.semiBoldReviewTotal]: isStoreViewPage
                            })}
                        >
                            {googleReviews.total_reviews} reviews
                        </p>
                    </div>
                </div>
                <div className={classes.button}>
                    <Button isShort priority="high">
                        <a
                            href={googleReviews.review_url}
                            target="_blank"
                            rel="noreferrer"
                            className={classes.reviewLink}
                        >
                            Write a review
                        </a>
                    </Button>
                </div>
            </div>
            <div className={classes.root}>
                <SliderComponent
                    slidesGap={20}
                    threshold={0.2}
                    arrowClasses={{
                        root: classes.arrowRoot
                    }}
                >
                    {googleReviews.reviews.map(review => (
                        <GoogleReviewCard
                            isStoreViewPage={isStoreViewPage}
                            key={review.reviewer}
                            {...review}
                        />
                    ))}
                </SliderComponent>
            </div>
        </div>
    );
};

GoogleReviewsCarousel.propTypes = {
    showLoading: bool,
    pickupStoreId: number,
    title: string,
    brandName: string,
    storeName: string,
    classes: shape({
        arrowRoot: string,
        title: string
    }),
    isStoreViewPage: bool
};

GoogleReviewsCarousel.defaultProps = {
    showLoading: false,
    title: 'Customer Reviews',
    isStoreViewPage: false
};

export default GoogleReviewsCarousel;
