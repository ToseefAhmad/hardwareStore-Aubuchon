import classnames from 'classnames';
import { arrayOf, bool, string } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';

import ProductCard from '@app/components/ProductCard';
import {
    SnapSlider,
    SnapSliderWithPagination
} from '@app/components/ReactSnapSlider';
import { useTailwindContext } from '@app/context/tailwind';
import { useStoreConfig } from '@app/hooks/useStoreConfig';
import ProductsShimmer from '@app/pageBuilder/ContentTypes/Products/products.shimmer';

import classes from './baseCarousel.module.css';

const BaseCarousel = ({ title, items, isLoading, showOnlySmallThumbnails }) => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const { storeConfig } = useStoreConfig({
        fields: ['product_url_suffix']
    });

    if (isLoading) {
        return <ProductsShimmer />;
    } else if (!items.length) {
        return null;
    }

    const isMobile = innerWidth < screens.lg;
    const SliderComponent = isMobile ? SnapSliderWithPagination : SnapSlider;
    const sliderGap = isMobile ? 5 : 20;

    return (
        <div
            className={classnames({
                [classes.productsCarousel]: !showOnlySmallThumbnails,
                [classes.smallThumbnails]: showOnlySmallThumbnails
            })}
        >
            {!!title && (
                <div
                    className={classnames({
                        [classes.title]: !showOnlySmallThumbnails,
                        [classes.smallTitle]: showOnlySmallThumbnails
                    })}
                >
                    <span>{title}</span>
                </div>
            )}
            <SliderComponent
                slidesGap={sliderGap}
                arrowClasses={{
                    root: classes.sliderRoot,
                    disabled: classes.sliderDisabled,
                    root_isInverted: classes.sliderRoot_isInverted,
                    disabled_isInverted: classes.sliderDisabled_isInverted
                }}
                threshold={1}
                isPaginationVisible={!showOnlySmallThumbnails}
            >
                {items.map((item, index) => (
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

BaseCarousel.propTypes = {
    title: string,
    items: arrayOf(ProductCard.propTypes.product),
    isLoading: bool,
    showOnlySmallThumbnails: bool
};

BaseCarousel.defaultProps = {
    isLoading: false
};

export default BaseCarousel;
