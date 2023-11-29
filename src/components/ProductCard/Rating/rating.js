import round from 'lodash/round';
import { string, number, shape } from 'prop-types';
import React, { Fragment } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import {
    StarSmall,
    StarFilledSmall,
    StarMobile,
    StarFilledMobile
} from '@app/components/Icons';
import { useTailwindContext } from '@app/context/tailwind';
import { useId } from '@app/hooks/useId';

import defaultClasses from './rating.module.css';
import { useRating } from './useRating';

const Rating = ({ classes: propClasses, rating }) => {
    const classes = useStyle(defaultClasses, propClasses);
    const { isMobile, reviewsStarSize } = useRating();
    const { colors } = useTailwindContext();
    const { id } = useId({ prefix: 'ratings' });

    const fiveStarRating = rating;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        const difference = fiveStarRating - i;

        // Filled star
        if (difference >= 0) {
            stars.push(
                <div className={classes.filledStar}>
                    <Icon src={isMobile ? StarFilledMobile : StarFilledSmall} />
                </div>
            );
        } else {
            // Empty star
            if (round(difference + 1, 1) <= 0) {
                stars.push(
                    <div className={classes.star}>
                        <Icon src={isMobile ? StarMobile : StarSmall} />
                    </div>
                );
            } else {
                // Partial star
                const percentage = (round(difference + 1, 1) * 100).toString();

                stars.push(
                    <div className={classes.star}>
                        <svg
                            height={reviewsStarSize.height}
                            viewBox="0 0 16 15"
                            width={reviewsStarSize.width}
                        >
                            <defs>
                                <linearGradient
                                    id={id`gradient${i}${percentage}`}
                                >
                                    <stop
                                        offset="0%"
                                        stopColor={colors.black}
                                    />
                                    <stop
                                        offset={`${percentage}%`}
                                        stopColor={colors.black}
                                    />
                                    <stop
                                        offset={`${percentage}%`}
                                        stopColor={colors.gray.light}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={colors.gray.light}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id={id`gradientFilled${i}${percentage}`}
                                >
                                    <stop
                                        offset="0%"
                                        stopColor={colors.black}
                                    />
                                    <stop
                                        offset={`${percentage}%`}
                                        stopColor={colors.black}
                                    />
                                    <stop
                                        offset={`${percentage}%`}
                                        stopColor={colors.white.DEFAULT}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={colors.white.DEFAULT}
                                    />
                                </linearGradient>
                            </defs>
                            <path
                                d="M8.00003 0C8.37721 0 8.72231 0.212227 8.89247 0.548841L10.8203 4.36233L15.1413 4.97901C15.5208 5.03317 15.8359 5.29948 15.9526 5.66462C16.0693 6.02975 15.9669 6.42945 15.6892 6.69361L12.5777 9.65269L13.311 13.827C13.3766 14.2009 13.2249 14.5798 12.9193 14.805C12.6137 15.0302 12.207 15.063 11.8692 14.8896L8.00003 12.9028L4.13082 14.8896C3.79311 15.063 3.38633 15.0302 3.08073 14.805C2.77514 14.5798 2.62343 14.2009 2.68911 13.827L3.42234 9.65269L0.31089 6.69361C0.0331253 6.42945 -0.0691937 6.02975 0.0474756 5.66462C0.164145 5.29948 0.479269 5.03317 0.858745 4.97901L5.17974 4.36233L7.10759 0.548841C7.27776 0.212227 7.62285 0 8.00003 0Z"
                                fill={`url('#${id`gradientFilled${i}${percentage}`}')`}
                            />
                            <path
                                d="M8.00003 0C8.37721 0 8.72231 0.212227 8.89247 0.548841L10.8203 4.36233L15.1413 4.97901C15.5208 5.03317 15.8359 5.29948 15.9526 5.66462C16.0693 6.02975 15.9669 6.42945 15.6892 6.69361L12.5777 9.65269L13.311 13.827C13.3766 14.2009 13.2249 14.5798 12.9193 14.805C12.6137 15.0302 12.207 15.063 11.8692 14.8896L8.00003 12.9028L4.13082 14.8896C3.79311 15.063 3.38633 15.0302 3.08073 14.805C2.77514 14.5798 2.62343 14.2009 2.68911 13.827L3.42234 9.65269L0.31089 6.69361C0.0331253 6.42945 -0.0691937 6.02975 0.0474756 5.66462C0.164145 5.29948 0.479269 5.03317 0.858745 4.97901L5.17974 4.36233L7.10759 0.548841C7.27776 0.212227 7.62285 0 8.00003 0ZM8.00003 3.21651L6.72947 5.72981C6.58211 6.02131 6.30167 6.22247 5.97832 6.26862L3.18532 6.66723L5.18917 8.57295C5.43186 8.80376 5.54289 9.14072 5.48495 9.47059L5.00703 12.1914L7.54324 10.8891C7.82997 10.7418 8.17009 10.7418 8.45682 10.8891L10.993 12.1914L10.5151 9.47059C10.4572 9.14072 10.5682 8.80376 10.8109 8.57295L12.8147 6.66723L10.0217 6.26862C9.69839 6.22247 9.41795 6.02131 9.27059 5.72981L8.00003 3.21651Z"
                                fill={`url('#${id`gradient${i}${percentage}`}')`}
                            />
                        </svg>
                    </div>
                );
            }
        }
    }

    return (
        <div className={classes.root}>
            {stars.map((star, key) => (
                <Fragment key={`review-rating-star-${key}`}>{star}</Fragment>
            ))}
        </div>
    );
};

Rating.propTypes = {
    classes: shape({
        root: string,
        filledStar: string,
        star: string
    }),
    rating: number
};

export default Rating;
