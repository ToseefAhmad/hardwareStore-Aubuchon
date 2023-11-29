import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useTailwindContext } from '@app/context/tailwind';

import classes from './products.module.css';

/**
 * Page Builder Products Shimmer component.
 *
 * @typedef ProductsShimmer
 * @kind functional component
 *
 * @returns {React.Element} A React component that displays a Products Shimmer.
 */
const ProductsShimmer = () => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    return (
        <div className={classes.productsCarousel}>
            <Shimmer width="100%" height={isMobile ? '355px' : '448px'} />
        </div>
    );
};

export default ProductsShimmer;
