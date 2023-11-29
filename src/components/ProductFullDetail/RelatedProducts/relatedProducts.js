import { bool, string } from 'prop-types';
import React from 'react';

import ProductCard from '@app/components/ProductCard';
import {
    SnapSlider,
    SnapSliderWithPagination
} from '@app/components/ReactSnapSlider';

import classes from './relatedProducts.module.css';
import RelatedProductsShimmer from './relatedProducts.shimmer';
import { useRelatedProducts } from './useRelatedProducts';

const RelatedProducts = ({ urlKey, isMobile }) => {
    const { relatedProducts, isLoading, storeConfig } = useRelatedProducts({
        urlKey
    });

    const relatedProductCards = relatedProducts.map(product => (
        <div key={product.uid}>
            <ProductCard product={product} storeConfig={storeConfig} />
        </div>
    ));

    const SliderComponent = isMobile ? SnapSliderWithPagination : SnapSlider;
    const sliderGap = isMobile ? 5 : 20;

    return (
        <div className={classes.root}>
            {isLoading ? (
                <div className={classes.relatedShimmer}>
                    <RelatedProductsShimmer isMobile={isMobile} />
                </div>
            ) : (
                !!relatedProductCards.length && (
                    <section className={classes.related}>
                        <p className={classes.relatedTitle}>
                            People Also Bought
                        </p>
                        <SliderComponent
                            slidesGap={sliderGap}
                            arrowClasses={{
                                root: classes.arrowRoot,
                                disabled: classes.disabled,
                                root_isInverted: classes.root_isInverted,
                                disabled_isInverted: classes.disabled_isInverted
                            }}
                            threshold={0.99}
                        >
                            {relatedProductCards}
                        </SliderComponent>
                    </section>
                )
            )}
        </div>
    );
};

RelatedProducts.propTypes = {
    urlKey: string,
    isMobile: bool.isRequired
};

export default RelatedProducts;
