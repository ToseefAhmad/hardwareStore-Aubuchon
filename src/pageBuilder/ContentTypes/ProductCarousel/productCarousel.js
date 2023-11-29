import { bool, string } from 'prop-types';
import React from 'react';

import { useProductCarousel } from './useProductCarousel';

const ProductCarousel = ({
    productCarouselType,
    productCarouselTitle,
    showOnlySmallThumbnails
}) => {
    const { items, isLoading, CarouselComponent } = useProductCarousel(
        productCarouselType
    );

    return (
        <CarouselComponent
            items={items}
            title={productCarouselTitle}
            isLoading={isLoading}
            showOnlySmallThumbnails={showOnlySmallThumbnails}
        />
    );
};

/**
 * Props for {@link ProductCarousel}
 *
 * @typedef props
 *
 * @property {String} productCarouselType Product carousel type (curbside_favorites)
 */

ProductCarousel.propTypes = {
    productCarouselType: string,
    productCarouselTitle: string,
    showOnlySmallThumbnails: bool
};

ProductCarousel.defaultProps = {
    productCarouselType: '',
    productCarouselTitle: ''
};

export default ProductCarousel;
