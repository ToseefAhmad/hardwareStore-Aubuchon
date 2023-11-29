import classnames from 'classnames';
import { number, bool, shape, string } from 'prop-types';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import {
    StarFilledSmall as StarFilledSmallIcon,
    StarSmall as StarSmallIcon,
    Star as StarIcon,
    StarFilled as StarFilledIcon
} from '@app/components/Icons';

import defaultClasses from './ratingStars.module.css';
import { useRatingStars } from './useRatingStars';

const MAX_STARS_AMOUNT = 5;

const RatingStars = ({
    rating,
    reviewCount,
    hideReviewCount,
    isSmall,
    classes: propClasses
}) => {
    const classes = useStyle(defaultClasses, propClasses);
    const { formatMessage } = useIntl();
    const { ratingPercentage } = useRatingStars({ rating, MAX_STARS_AMOUNT });
    const starRatingClassName = isSmall
        ? classes.starRatingSmall
        : classes.starRatingRegular;

    const emptyStars = useMemo(
        () =>
            Array.from(Array(MAX_STARS_AMOUNT)).map((_, idx) => (
                <Icon key={idx} src={isSmall ? StarSmallIcon : StarIcon} />
            )),
        [isSmall]
    );

    const filledStars = useMemo(
        () =>
            Array.from(Array(MAX_STARS_AMOUNT)).map((_, idx) => (
                <Icon
                    key={idx}
                    src={isSmall ? StarFilledSmallIcon : StarFilledIcon}
                />
            )),
        [isSmall]
    );
    return (
        <div className={classes.root}>
            <div className={starRatingClassName}>
                {emptyStars}
                <div
                    className={classnames(
                        classes.starRatingFilled,
                        classes.starColorFilled
                    )}
                    style={{ width: ratingPercentage }}
                >
                    {filledStars}
                </div>
            </div>
            {!hideReviewCount && (
                <span>
                    {formatMessage(
                        {
                            id: 'rating.count',
                            defaultMessage: `{count, plural,
                                =0 {0 reviews}
                                =1 {1 review}
                            other {# reviews}}`
                        },
                        {
                            count: reviewCount
                        }
                    )}
                </span>
            )}
        </div>
    );
};

RatingStars.propTypes = {
    rating: number,
    reviewCount: number,
    hideReviewCount: bool,
    isSmall: bool,
    classes: shape({
        starColorFilled: string
    })
};

RatingStars.defaultProps = {
    rating: 0,
    hideReviewCount: false,
    isSmall: true
};

export default RatingStars;
