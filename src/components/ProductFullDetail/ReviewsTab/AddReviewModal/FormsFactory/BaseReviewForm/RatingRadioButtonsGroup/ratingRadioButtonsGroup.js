import { Radio } from 'informed';
import { number, func } from 'prop-types';
import React from 'react';

import RatingStars from '../../../../../RatingStars';

import Icon from '@app/components/Icon';
import { Star as StarIcon } from '@app/components/Icons';
import RadioGroup from '@app/components/RadioGroup';
import { isRequired } from '@app/overrides/venia-ui/util/formValidators';

import classes from './ratingRadioButtonsGroup.module.css';

const radioButtonItems = [
    { value: 1, id: 'oneStar' },
    { value: 2, id: 'twoStars' },
    { value: 3, id: 'threeStars' },
    { value: 4, id: 'fourStars' },
    { value: 5, id: 'fiveStars' }
];

const RatingRadioButtonsGroup = ({ rating, setRating }) => {
    return (
        <>
            <RadioGroup
                field="rating"
                validate={value => isRequired(value)}
                onChange={e => setRating(Number(e.target.value))}
            >
                <div className={classes.ratingRadioButtons}>
                    {radioButtonItems.map(item => (
                        <label
                            className={classes.ratingRadioOption}
                            htmlFor={item.id}
                            key={item.id}
                        >
                            <Icon src={StarIcon} />
                            <Radio
                                value={item.value}
                                className={classes.ratingRadioButton}
                                id={item.id}
                            />
                        </label>
                    ))}
                </div>
            </RadioGroup>
            <div className={classes.overallRatingStarsFilled}>
                <RatingStars
                    rating={rating}
                    hideReviewCount={true}
                    isSmall={false}
                />
            </div>
        </>
    );
};

RatingRadioButtonsGroup.propTypes = {
    rating: number,
    setRating: func.isRequired
};

RatingRadioButtonsGroup.defaultProps = {
    rating: 0
};

export default RatingRadioButtonsGroup;
