import { arrayOf, string } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';

import ProductCard from '@app/components/ProductCard';
import {
    SnapSlider,
    SnapSliderWithPagination
} from '@app/components/ReactSnapSlider';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './products.module.css';
import ProductsShimmer from './products.shimmer';
import { useProducts } from './useProducts';

/**
 * Sort products based on the original order
 *
 * @param {Array} products
 * @returns {Array}
 */

/**
 * Page Builder Products component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 *
 * @typedef Products
 * @kind functional component
 *
 * @param {props} pathNames React component props
 *
 * @returns {React.Element} A React component that displays a Products based on a number of products
 */

const Products = ({ pathNames }) => {
    const { items, data, storeConfig } = useProducts(pathNames);

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    if (!data) {
        return <ProductsShimmer />;
    }

    const SliderComponent = isMobile ? SnapSliderWithPagination : SnapSlider;
    const sliderGap = isMobile ? 5 : 20;

    return (
        <div className={classes.productsCarousel}>
            <SliderComponent
                slidesGap={sliderGap}
                arrowClasses={{
                    root: classes.root,
                    disabled: classes.disabled,
                    root_isInverted: classes.root_isInverted,
                    disabled_isInverted: classes.disabled_isInverted
                }}
                threshold={1}
            >
                {items.map((item, index) => (
                    <ProductCard
                        key={index}
                        product={item}
                        storeConfig={storeConfig}
                    />
                ))}
            </SliderComponent>
        </div>
    );
};

/**
 * Props for {@link Products}
 *
 * @typedef props
 *
 * @property {Array} pathNames List of Url path names to load into product list
 */

Products.propTypes = {
    pathNames: arrayOf(string)
};

Products.defaultProps = {
    pathNames: []
};

export default Products;
