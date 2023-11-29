import { debounce } from 'lodash';
import { useEffect, useCallback, useState, useMemo, useRef } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { smoothScroll } from '@app/utils/smooth-scroll';
import { turnToApi, reviewSortByOptions } from '@app/utils/TurnTo';

const REVIEWS_PER_PAGE = 6;

export const useReviewsTab = ({ sku, storeConfig }) => {
    const filtersContainerRef = useRef();

    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const [turnToReviewsSummary, setTurnToReviewsSummary] = useState();
    const [turnToReviews, setTurnToReviews] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState(reviewSortByOptions.RECENT);
    const [filter, setFilter] = useState('');
    const [starRatingFilter, setStarRatingFilter] = useState();
    const [isLoadingReviews, setIsLoadingReviews] = useState(false);

    const handlePageChange = useCallback(async value => {
        await smoothScroll({
            to: { y: filtersContainerRef.current?.offsetTop - 70 }
        });

        setCurrentPage(value);
    }, []);

    const handleSortChange = useCallback(e => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    }, []);

    const handleReactSelectSortChange = useCallback(value => {
        setSortBy(value);
        setCurrentPage(1);
    }, []);

    const handleStarRatingFilterChange = useCallback(e => {
        setStarRatingFilter(Number(e.target.value));
        setCurrentPage(1);
    }, []);

    const handleReactSelectRatingFilterChange = useCallback(value => {
        setStarRatingFilter(value);
        setCurrentPage(1);
    }, []);

    const debouncedFilterChange = debounce(value => {
        setFilter(value);
    }, 500);

    const handleFilterChange = useCallback(
        e => {
            debouncedFilterChange(e.target.value);
            setCurrentPage(1);
        },
        [debouncedFilterChange]
    );

    useEffect(() => {
        (async () => {
            try {
                const response = await turnToApi.getTurnToReviewsSummary({
                    storeConfig,
                    sku
                });

                setTurnToReviewsSummary(response.data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [sku, storeConfig]);

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingReviews(true);
                const response = await turnToApi.getTurnToReviews({
                    storeConfig,
                    sku,
                    sortBy,
                    filter,
                    starRatingFilter,
                    offset:
                        currentPage === 1
                            ? 0
                            : (currentPage - 1) * REVIEWS_PER_PAGE,
                    reviewsPerPage: REVIEWS_PER_PAGE
                });

                setTurnToReviews(response.data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoadingReviews(false);
            }
        })();
    }, [sku, storeConfig, sortBy, starRatingFilter, filter, currentPage]);

    const ratingsBreakdown = useMemo(() => {
        return turnToReviewsSummary?.ratingsBreakdown?.reverse();
    }, [turnToReviewsSummary]);

    const reviews = useMemo(() => {
        return turnToReviews?.reviews;
    }, [turnToReviews]);

    const totalPages = useMemo(() => {
        return Math.ceil(turnToReviews?.total / REVIEWS_PER_PAGE);
    }, [turnToReviews]);

    return {
        ratingsBreakdown: ratingsBreakdown || [],
        reviews: !reviews?.length ? null : reviews,
        reviewsTotalCount: turnToReviewsSummary?.reviewsCount,
        ratingTotal: turnToReviewsSummary?.ratingFormatted,
        isLoadingReviews,
        setSortBy,
        setFilter,
        setStarRatingFilter,
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
    };
};
