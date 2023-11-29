import { shape, string, func, number } from 'prop-types';
import React from 'react';

import Image from '@app/components/Image';
import RatingStars from '@app/components/ProductFullDetail/RatingStars';
import SimpleModal from '@app/components/SimpleModal';

import classes from './googleReviewCardModal.module.css';

const GoogleReviewCardModal = ({ review, onClose }) => {
    return (
        <SimpleModal
            className={classes.modal}
            modalName={'googleReview' + review.reviewer}
        >
            <div className={classes.info}>
                <div className={classes.image}>
                    <Image alt={review.reviewer} src={review.reviewer_image} />
                </div>
                <div className={classes.review}>
                    <p>{review.reviewer}</p>
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
            <p className={classes.modalComment}>{review.comment}</p>
            <button onClick={onClose} className={classes.readMore}>
                Read Less
            </button>
            <div className={classes.posted}>
                <img src="/assets/google.svg" alt="google" />
                <p className={classes.postedText}>
                    Posted on <br /> Google
                </p>
            </div>
        </SimpleModal>
    );
};

GoogleReviewCardModal.propTypes = {
    review: shape({
        comment: string,
        created_at: string,
        rating: number,
        reviewer: string,
        reviewer_image: string
    }),
    onClose: func
};

GoogleReviewCardModal.defaultProps = {
    showLoading: false
};

export default GoogleReviewCardModal;
