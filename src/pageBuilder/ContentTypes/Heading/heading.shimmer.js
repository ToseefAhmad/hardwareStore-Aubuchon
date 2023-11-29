import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useTailwindContext } from '@app/context/tailwind';

/**
 * Page Builder Products Shimmer component.
 *
 * @typedef ProductsShimmer
 * @kind functional component
 *
 * @returns {React.Element} A React component that displays a Products Shimmer.
 */
const HeadingShimmer = () => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.md;

    return <Shimmer width="100%" height={isMobile ? '38px' : '46px'} />;
};

export default HeadingShimmer;
