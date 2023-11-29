import classnames from 'classnames';
import { number, string, bool } from 'prop-types';
import React, { useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import Image from '@app/components/Image';
import RatingStars from '@app/components/ProductFullDetail/RatingStars';

import classes from './googleReviewCard.module.css';
import GoogleReviewCardModal from './googleReviewCardModal';

const MAXIMUM_TEXT_LENGTH = 215;

const GoogleReviewCard = props => {
    const { isStoreViewPage, ...review } = props;
    const isShowMoreButtonVisible =
        review.comment.length >= MAXIMUM_TEXT_LENGTH;
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const handleOpenModal = () => {
        toggleModal({
            identifier: 'googleReview' + review.reviewer
        });
    };
    const handleCloseModal = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    const googleCardWidth = isStoreViewPage
        ? classes.googleReviewWidthStorePage
        : classes.googleReviewWidth;
    return (
        <div className={classnames(classes.root, googleCardWidth)}>
            {isShowMoreButtonVisible && (
                <GoogleReviewCardModal
                    onClose={handleCloseModal}
                    review={review}
                />
            )}
            <div className={classes.info}>
                <div className={classes.image}>
                    <Image alt={review.reviewer} src={review.reviewer_image} />
                </div>
                <div className={classes.review}>
                    <p className={classes.reviewerName}>{review.reviewer}</p>
                    <div className={classes.reviewStars}>
                        <RatingStars
                            rating={review.rating}
                            hideReviewCount
                            classes={{
                                starColorFilled: classes.starColorFilled
                            }}
                        />
                        <p className={classes.createdAt}>{review.created_at}</p>
                    </div>
                </div>
            </div>
            <p className={classes.comment}>{review.comment}</p>
            <div className={classes.googleInfo}>
                {isShowMoreButtonVisible && (
                    <button
                        onClick={handleOpenModal}
                        className={classes.readMore}
                    >
                        Read More
                    </button>
                )}
                <div className={classes.posted}>
                    <img src="/assets/google.svg" alt="google" />
                    <p className={classes.postedText}>
                        Posted on <br /> Google
                    </p>
                </div>
            </div>
        </div>
    );
};

GoogleReviewCard.propTypes = {
    isStoreViewPage: bool,
    comment: string,
    created_at: string,
    rating: number,
    reviewer: string,
    reviewer_image: string
};

GoogleReviewCard.defaultProps = {
    isStoreViewPage: false
};

export default GoogleReviewCard;
