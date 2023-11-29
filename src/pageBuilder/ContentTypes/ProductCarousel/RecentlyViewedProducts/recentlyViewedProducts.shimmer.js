import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useRecentlyViewedContext } from '@app/context/recentlyViewedProducts';
import { useTailwindContext } from '@app/context/tailwind';

/**
 * Page Builder Products Shimmer component.
 *
 * @typedef RecentlyViewedProductsShimmer
 * @kind functional component
 *
 * @returns {React.Element} A React component that displays a Products Shimmer.
 */
const RecentlyViewedProductsShimmer = () => {
    const [recentlyViewedProducts] = useRecentlyViewedContext();

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    return (
        <>
            {!!recentlyViewedProducts.length && (
                <Shimmer width="100%" height={isMobile ? '428px' : '544px'} />
            )}
        </>
    );
};

export default RecentlyViewedProductsShimmer;
