import { Form } from 'informed';
import { shape, bool, string } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import {
    StarFilledSmall as StarFilledSmallIcon,
    Search as SearchIcon
} from '@app/components/Icons';
import Pagination from '@app/components/Pagination';
import Select from '@app/components/Select';
import { MODAL_NAMES } from '@app/components/SimpleModal';
import Input from '@app/components/TextInput';
import { reviewSortByOptions } from '@app/utils/TurnTo';

import RatingStars from '../RatingStars';
import AddReviewModal from './AddReviewModal';
import Review from './Review';
import classes from './reviewsTab.module.css';
import { useReviewsTab } from './useReviewsTab';

const sortSelectItems = [
    {
        key: 'recent',
        value: reviewSortByOptions.RECENT,
        label: 'Most Recent'
    },
    {
        key: 'helpful',
        value: reviewSortByOptions.HELPFUL,
        label: 'Most Helpful'
    },
    {
        key: 'oldest',
        value: reviewSortByOptions.OLDEST,
        label: 'Oldest'
    },
    {
        key: 'highestRated',
        value: reviewSortByOptions.H_RATED,
        label: 'Highest Rated'
    },
    {
        key: 'lowestRated',
        value: reviewSortByOptions.L_RATED,
        label: 'Lowest Rated'
    }
];

const starRatingFilterValues = [5, 4, 3, 2, 1];

const starRatingFilterItems = [
    {
        key: 'all',
        value: '',
        label: 'All'
    },
    ...starRatingFilterValues.map(value => ({
        key: value,
        value: value,
        label: value === 1 ? '1 Star' : `${value} Stars`
    }))
];

const ReviewsTab = ({ productDetails, storeConfig, isMobile }) => {
    const {
        ratingsBreakdown,
        reviews,
        reviewsTotalCount,
        ratingTotal,
        isLoadingReviews,
        totalPages,
        currentPage,
        filtersContainerRef,
        toggleModal,
        handlePageChange,
        handleSortChange,
        handleReactSelectSortChange,
        handleStarRatingFilterChange,
        handleReactSelectRatingFilterChange,
        handleFilterChange
    } = useReviewsTab({
        sku: productDetails.sku,
        storeConfig
    });

    const shimmerSize = () => Math.min(100, 20 * reviewsTotalCount);

    return (
        <>
            <div className={classes.summary}>
                <div className={classes.summaryMain}>
                    <RatingStars
                        rating={Number(ratingTotal)}
                        hideReviewCount={true}
                    />
                    <p className={classes.rating}>
                        <span className={classes.productRating}>
                            {ratingTotal || 0}
                        </span>{' '}
                        out of 5 stars
                    </p>
                    <Button
                        onClick={() => {
                            toggleModal({
                                identifier: MODAL_NAMES.writeReview
                            });
                        }}
                    >
                        Write Review
                    </Button>
                </div>
                <div className={classes.summaryDetails}>
                    <p className={classes.reviewsCount}>
                        <span className={classes.productReviewsCount}>
                            {reviewsTotalCount}
                        </span>{' '}
                        {reviewsTotalCount === 1 ? 'Rating' : 'Ratings'}
                    </p>
                    {!ratingsBreakdown.length && reviewsTotalCount ? (
                        <Shimmer width="100%" height={7.938} />
                    ) : (
                        ratingsBreakdown.map(item => (
                            <div
                                className={classes.ratingBreakdownItem}
                                key={item.rating}
                            >
                                <div className={classes.ratingBreakdownKey}>
                                    <span
                                        className={
                                            classes.ratingBreakdownItemIcon
                                        }
                                    >
                                        <Icon src={StarFilledSmallIcon} />
                                    </span>
                                    <span
                                        className={
                                            classes.ratingBreakdownItemRating
                                        }
                                    >
                                        {item.rating}
                                    </span>
                                </div>
                                <div
                                    className={classes.ratingBreakdownBar}
                                    role="presentation"
                                >
                                    <div
                                        className={
                                            classes.ratingBreakdownBarFilled
                                        }
                                        style={{
                                            width: item.pctOfRatingsFormatted
                                        }}
                                    />
                                </div>
                                <span
                                    className={
                                        classes.ratingBreakdownPercentage
                                    }
                                >
                                    {item.pctOfRatingsFormatted}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className={classes.filtersWrapper} ref={filtersContainerRef}>
                <Form className={classes.filters}>
                    <div className={classes.selectInputs}>
                        <Select
                            field="sort"
                            items={sortSelectItems}
                            onChangeInformed={handleSortChange}
                            onChangeReactSelect={handleReactSelectSortChange}
                            placeholder="Sort by"
                        />
                        <Select
                            field="starRatingFilter"
                            items={starRatingFilterItems}
                            onChangeInformed={handleStarRatingFilterChange}
                            onChangeReactSelect={
                                handleReactSelectRatingFilterChange
                            }
                            placeholder="Star rating"
                        />
                    </div>
                    <Input
                        field="filter"
                        placeholder="Search review"
                        icon={<SearchIcon />}
                        onChange={handleFilterChange}
                    />
                </Form>
            </div>
            {reviews && (
                <>
                    {isLoadingReviews ? (
                        <Shimmer
                            width="100%"
                            height={isMobile ? 90 : shimmerSize()}
                        />
                    ) : (
                        <ul>
                            {reviews.map(review => (
                                <li
                                    className={classes.reviewListItem}
                                    key={review.id}
                                >
                                    <Review
                                        smallImage={productDetails.smallImage}
                                        review={review}
                                        storeConfig={storeConfig}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className={classes.pagination}>
                        <Pagination
                            pageControl={{
                                currentPage,
                                setPage: handlePageChange,
                                totalPages
                            }}
                            isVirtual={true}
                        />
                    </div>
                </>
            )}
            <AddReviewModal
                productDetails={productDetails}
                storeConfig={storeConfig}
            />
        </>
    );
};

ReviewsTab.propTypes = {
    productDetails: shape({
        sku: string.isRequired
    }).isRequired,
    storeConfig: shape({
        turnto_review_url: string.isRequired,
        turnto_site_key: string.isRequired,
        turnto_reviews_enabled: bool.isRequired
    }).isRequired,
    isMobile: bool.isRequired
};

export default ReviewsTab;
