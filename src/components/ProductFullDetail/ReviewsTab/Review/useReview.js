import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useCallback, useState } from 'react';

import { BrowserPersistence } from '@magento/peregrine/lib/util';

import { turnToApi, SITE_KEY, imgBaseUrl } from '@app/utils/TurnTo';

import reviewOperations from './review.gql';

const storage = new BrowserPersistence();

export const useReview = ({ review, storeConfig }) => {
    const { data: productImageData } = useQuery(
        reviewOperations.queries.getProductImageQuery,
        {
            variables: { sku: review.catItem.sku },
            skip: !review
        }
    );

    const [upVote, setUpVote] = useState(0);
    const [downVote, setDownVote] = useState(0);
    const [isReviewFlagged, setIsReviewFlagged] = useState(false);

    const handleUpVoteButtonClick = useCallback(() => {
        if (downVote === 1) {
            setDownVote(-1);
        }
        setUpVote(prevState => (prevState === 1 ? -1 : 1));
    }, [downVote]);

    const handleDownVoteButtonClick = useCallback(() => {
        if (upVote === 1) {
            setUpVote(-1);
        }
        setDownVote(prevState => (prevState === 1 ? -1 : 1));
    }, [upVote]);

    const handleFlagReview = useCallback(async () => {
        try {
            await turnToApi.flagReview({
                storeConfig,
                sku: review.catItem.sku,
                reviewId: review.id
            });

            setIsReviewFlagged(true);
        } catch (e) {
            console.error(e);
        }
    }, [review, storeConfig]);

    const updateVotesInStorage = useCallback((vote, name) => {
        if (vote === 1) {
            storage.setItem(name, 1, 31556952000);
        } else {
            storage.removeItem(name);
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (upVote !== 0 || downVote !== 0) {
                    const newVotes = {
                        down: downVote,
                        up: upVote
                    };

                    await turnToApi.updateTurnToReviewVotes({
                        storeConfig,
                        sku: review.catItem.sku,
                        reviewId: review.id,
                        newVotes
                    });

                    updateVotesInStorage(upVote, `rWasUpVoted_${review.id}`);
                    updateVotesInStorage(
                        downVote,
                        `rWasDownVoted_${review.id}`
                    );
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [
        upVote,
        downVote,
        review.catItem.sku,
        storeConfig,
        review,
        updateVotesInStorage
    ]);

    const productImageUrl = useMemo(() => {
        return productImageData?.products?.items[0]?.small_image.url;
    }, [productImageData]);

    const reviewMedia = useMemo(() => {
        return !review?.media?.length
            ? null
            : review.media.map(item => {
                  return {
                      url: item.imageId
                          ? `${imgBaseUrl}/${SITE_KEY ||
                                storeConfig.turnto_site_key}/${item.imageId}.${
                                item.imageType
                            }`
                          : item.thumbnailUrl,
                      text: item.text,
                      videoLink: item.providedLink || null
                  };
              });
    }, [review, storeConfig.turnto_site_key]);

    const userName = useMemo(() => {
        const lastNameInitial = review?.user?.lastName
            ? `${review?.user?.lastName[0]}.`
            : '';
        return (
            review?.user?.nickName ||
            `${review?.user?.firstName} ${lastNameInitial}`
        );
    }, [review]);

    const reviewText = useMemo(() => {
        return review.text
            .replaceAll('<mark>', '')
            .replaceAll('</mark>', '')
            .replaceAll('<br />', '\n');
    }, [review]);

    const reviewTitle = useMemo(() => {
        return review.title.replaceAll('<mark>', '').replaceAll('</mark>', '');
    }, [review]);

    useEffect(() => {
        const storedUpVote = storage.getItem(`rWasUpVoted_${review.id}`);
        const storedDownVote = storage.getItem(`rWasDownVoted_${review.id}`);

        storedUpVote && setUpVote(storedUpVote);
        storedDownVote && setDownVote(storedDownVote);
    }, [review]);

    const isVerifiedPurchaser = !!review.purchaseDateFormatted;

    const isReviewUpVoted = upVote === 1;

    const isReviewDownVoted = downVote === 1;

    // Normalize data for the component
    const reviewDetails = {
        productName: review.catItem.title,
        productImageUrl,
        title: reviewTitle,
        text: reviewText,
        rating: review.rating,
        createdAt: review.dateCreatedFormatted,
        location: review.profileAttributes.location,
        purchasedOn: review.purchaseDateFormatted,
        upVotes: review.upVotes,
        downVotes: review.downVotes,
        userName,
        isVerifiedPurchaser,
        reviewMedia
    };

    return {
        reviewDetails,
        isReviewUpVoted,
        isReviewDownVoted,
        isReviewFlagged,
        handleUpVoteButtonClick,
        handleDownVoteButtonClick,
        handleFlagReview
    };
};
