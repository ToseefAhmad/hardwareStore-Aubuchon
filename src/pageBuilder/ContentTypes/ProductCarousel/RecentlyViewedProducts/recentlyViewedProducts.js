import classnames from 'classnames';
import { bool, string } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';

import ProductCard from '@app/components/ProductCard';
import {
    SnapSlider,
    SnapSliderWithPagination
} from '@app/components/ReactSnapSlider';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './recentlyViewedProducts.module.css';
import RecentlyViewedProductsShimmer from './recentlyViewedProducts.shimmer';
import { useRecentlyViewedProducts } from './useRecentlyViewedProducts';

const RecentlyViewedProducts = ({
    title,
    isLoading,
    showOnlySmallThumbnails
}) => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    const {
        itemsList,
        storeConfig,
        recentlyViewedProducts
    } = useRecentlyViewedProducts();

    if (isLoading) {
        return <RecentlyViewedProductsShimmer />;
    }

    const galleryTitle =
        itemsList && !showOnlySmallThumbnails ? (
            <div className={classes.title}>{title}</div>
        ) : null;

    const SliderComponent = isMobile ? SnapSliderWithPagination : SnapSlider;
    const sliderGap = isMobile ? 5 : 20;

    return (
        <div
            className={classnames({
                [classes.productsCarousel]: !showOnlySmallThumbnails,
                [classes.smallThumbnails]: showOnlySmallThumbnails
            })}
        >
            {!!recentlyViewedProducts.length && galleryTitle}
            <SliderComponent
                slidesGap={sliderGap}
                arrowClasses={{
                    root: classes.root,
                    disabled: classes.disabled,
                    root_isInverted: classes.root_isInverted,
                    disabled_isInverted: classes.disabled_isInverted
                }}
                threshold={1}
                isPaginationVisible={!showOnlySmallThumbnails}
            >
                {itemsList.map((item, index) => (
                    <ProductCard
                        key={index}
                        product={item}
                        storeConfig={storeConfig}
                        showOnlySmallThumbnails={showOnlySmallThumbnails}
                    />
                ))}
            </SliderComponent>
        </div>
    );
};

RecentlyViewedProducts.propTypes = {
    isLoading: bool,
    title: string,
    showOnlySmallThumbnails: bool
};

export default RecentlyViewedProducts;
