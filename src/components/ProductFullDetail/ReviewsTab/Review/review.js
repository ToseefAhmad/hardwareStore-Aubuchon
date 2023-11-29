import { number, shape, string, bool } from 'prop-types';
import React from 'react';

import Image from '@magento/venia-ui/lib/components/Image';

import RatingStars from '../../RatingStars';

import Icon from '@app/components/Icon';
import {
    Checkmark as CheckmarkIcon,
    Like as LikeIcon,
    Dislike as DislikeIcon,
    Flag as FlagIcon
} from '@app/components/Icons';

import classes from './review.module.css';
import { useReview } from './useReview';

const Review = ({ review, storeConfig, smallImage }) => {
    const {
        reviewDetails,
        handleUpVoteButtonClick,
        handleDownVoteButtonClick,
        isReviewUpVoted,
        isReviewDownVoted,
        isReviewFlagged,
        handleFlagReview
    } = useReview({
        review,
        storeConfig
    });
    const productImage = reviewDetails?.productImageUrl || smallImage;

    return (
        <div className={classes.root}>
            <div className={classes.productInfo}>
                <div className={classes.imageContainer}>
                    {productImage && (
                        <Image
                            classes={{
                                root: classes.imageRoot,
                                image: classes.image
                            }}
                            alt={reviewDetails.productName}
                            src={productImage}
                            width={60}
                            height={60}
                            ratio={1}
                        />
                    )}
                </div>
                <div>
                    <p className={classes.aboutTitle}>About</p>
                    <p className={classes.productName}>
                        {reviewDetails.productName}
                    </p>
                </div>
            </div>
            <div className={classes.reviewInfo}>
                <div>
                    <div className={classes.authorAndDateWrapper}>
                        <div>
                            <span className={classes.authorName}>
                                {reviewDetails.userName}
                            </span>
                            {reviewDetails.isVerifiedPurchaser && (
                                <span className={classes.verifiedPurchaserText}>
                                    <Icon
                                        src={CheckmarkIcon}
                                        className={
                                            classes.verifiedPurchaserIcon
                                        }
                                    />{' '}
                                    VERIFIED PURCHASER
                                </span>
                            )}
                        </div>
                        <span className={classes.createDate}>
                            {reviewDetails.createdAt}
                        </span>
                    </div>
                    <RatingStars
                        rating={reviewDetails.rating}
                        hideReviewCount={true}
                    />
                    <p className={classes.title}>{reviewDetails.title}</p>
                    {reviewDetails.reviewMedia && (
                        <div className={classes.reviewMedia}>
                            {reviewDetails.reviewMedia.map(item => {
                                return (
                                    <a
                                        className={classes.imageContainer}
                                        key={item.url}
                                        href={item.videoLink || item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            classes={{
                                                root: classes.imageRoot,
                                                image: classes.image
                                            }}
                                            alt={
                                                item.text || 'Review media item'
                                            }
                                            src={item.url}
                                            width={60}
                                            height={60}
                                            ratio={1}
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                    <p className={classes.text}>{reviewDetails.text}</p>
                    <div className={classes.locationAndPurchasedOnContainer}>
                        {reviewDetails.location && (
                            <div>
                                <span className={classes.detailsKey}>
                                    Location:{' '}
                                </span>
                                <span>{reviewDetails.location}</span>
                            </div>
                        )}
                        {reviewDetails.purchasedOn && (
                            <div>
                                <span className={classes.detailsKey}>
                                    Purchased on:{' '}
                                </span>
                                <span>{reviewDetails.purchasedOn}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className={classes.voting}>
                    <span className={classes.wasThisHelpful}>
                        Was this helpful?
                    </span>
                    <div className={classes.votingButtons}>
                        <div className={classes.votes}>
                            <button
                                className={
                                    isReviewUpVoted
                                        ? classes.votingButtonActivated
                                        : classes.votingButton
                                }
                                onClick={handleUpVoteButtonClick}
                                type="button"
                            >
                                <Icon
                                    src={LikeIcon}
                                    className={classes.upVoteIcon}
                                />
                            </button>
                            {isReviewUpVoted
                                ? reviewDetails.upVotes + 1
                                : reviewDetails.upVotes}
                        </div>
                        <div className={classes.downVotes}>
                            <button
                                className={
                                    isReviewDownVoted
                                        ? classes.votingButtonActivated
                                        : classes.votingButton
                                }
                                onClick={handleDownVoteButtonClick}
                                type="button"
                            >
                                <Icon
                                    src={DislikeIcon}
                                    className={classes.downVoteIcon}
                                />
                            </button>
                            {isReviewDownVoted
                                ? reviewDetails.downVotes + 1
                                : reviewDetails.downVotes}
                        </div>
                    </div>
                    <div className={classes.flagButtonWrapper}>
                        <button
                            onClick={handleFlagReview}
                            type="button"
                            className={classes.flagButton}
                        >
                            <Icon
                                src={FlagIcon}
                                className={
                                    isReviewFlagged
                                        ? classes.flagIconActivated
                                        : classes.flagIcon
                                }
                            />
                            <span>Flag</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Review.propTypes = {
    review: shape({
        catItem: shape({
            title: string.isRequired
        }),
        user: shape({
            nickName: string,
            firstName: string,
            lastName: string
        }),
        dateCreatedFormatted: string.isRequired,
        rating: number.isRequired,
        title: string.isRequired,
        text: string.isRequired,
        profileAttributes: shape({
            location: string
        }),
        purchaseDateFormatted: string
    }),
    storeConfig: shape({
        turnto_review_url: string.isRequired,
        turnto_site_key: string.isRequired,
        turnto_reviews_enabled: bool.isRequired
    }).isRequired,
    smallImage: string
};

export default Review;
