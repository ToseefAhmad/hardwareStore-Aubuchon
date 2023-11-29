import { number } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { StarFilledSmall, StarSmall } from '@app/components/Icons';

import classes from './startRating.module.css';
import { useStartRating } from './useStartRating';

const StartRating = props => {
    const { rating } = props;
    const { ratingPercentage } = useStartRating({ rating });

    return (
        <div className={classes.root}>
            {[...Array(5)].map((_, i) => (
                <Icon key={i} src={StarSmall} />
            ))}
            <div
                className={classes.filledStars}
                style={{ width: ratingPercentage }}
            >
                {[...Array(5)].map((_, i) => (
                    <Icon key={i} src={StarFilledSmall} />
                ))}
            </div>
        </div>
    );
};

StartRating.propTypes = {
    rating: number.isRequired
};

export default StartRating;
