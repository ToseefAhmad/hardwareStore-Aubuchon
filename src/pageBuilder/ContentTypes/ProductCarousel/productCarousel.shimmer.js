import { string } from 'prop-types';
import React from 'react';

import { ProductsShimmer } from '../../ContentTypes/Products';

import { BestsellersShimmer } from './Bestsellers';

export const ProductCarouselShimmer = ({ productCarouselType }) => {
    if (productCarouselType === 'bestsellers') {
        return <BestsellersShimmer />;
    }

    return <ProductsShimmer />;
};

ProductCarouselShimmer.propTypes = {
    productCarouselType: string
};

export default ProductCarouselShimmer;
