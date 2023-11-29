import { bool } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import ProductCardShimmer from '@app/components/ProductCard/productCard.shimmer';
import { SnapSlider } from '@app/components/ReactSnapSlider';

import classes from './relatedProducts.module.css';

const RelatedProductsShimmer = ({ isMobile }) => {
    const relatedProductCards = Array.from({
        length: 6
    }).map((_, idx) => (
        <ProductCardShimmer
            key={idx}
            classes={{
                imageContainer: classes.relatedProductCardImageContainer
            }}
            imageHeight={isMobile ? 145 : 230}
        />
    ));

    return (
        <div className={classes.relatedShimmerRoot}>
            <div className={classes.relatedTitle}>
                <Shimmer
                    width="100%"
                    height={isMobile ? 2.25 : 3}
                    key="related"
                />
            </div>
            <SnapSlider slidesGap={isMobile ? 5 : 20}>
                {relatedProductCards}
            </SnapSlider>
        </div>
    );
};

RelatedProductsShimmer.propTypes = {
    isMobile: bool.isRequired
};

export default RelatedProductsShimmer;
