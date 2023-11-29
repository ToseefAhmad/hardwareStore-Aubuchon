import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';

const SIZES = {
    small: { width: 13, height: 12 },
    large: { width: 16, height: 15 }
};

export const useRating = () => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;
    const reviewsStarSize = !isMobile ? SIZES.large : SIZES.small;

    return {
        isMobile,
        reviewsStarSize
    };
};
