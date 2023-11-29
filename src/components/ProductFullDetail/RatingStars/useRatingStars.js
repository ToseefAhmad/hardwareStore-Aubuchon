import { useMemo } from 'react';

export const useRatingStars = ({ rating, MAX_STARS_AMOUNT }) => {
    const ratingPercentage = useMemo(() => {
        return `${(rating * 100) / MAX_STARS_AMOUNT}%`;
    }, [rating, MAX_STARS_AMOUNT]);

    return {
        ratingPercentage
    };
};
