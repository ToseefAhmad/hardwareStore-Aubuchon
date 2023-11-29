import { useMemo } from 'react';

const MAX_STARS_AMOUNT = 5;

export const useStartRating = ({ rating }) => {
    const ratingPercentage = useMemo(() => {
        return `${(rating * 100) / MAX_STARS_AMOUNT}%`;
    }, [rating]);

    return {
        ratingPercentage
    };
};
