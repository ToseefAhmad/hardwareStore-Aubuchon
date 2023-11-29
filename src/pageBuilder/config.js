import React from 'react';

import blockConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Block/configAggregator';
import ButtonItem from '@magento/pagebuilder/lib/ContentTypes/ButtonItem';
import buttonItemConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/ButtonItem/configAggregator';
import Buttons from '@magento/pagebuilder/lib/ContentTypes/Buttons';
import buttonsConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Buttons/configAggregator';
import Column from '@magento/pagebuilder/lib/ContentTypes/Column';
import columnConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Column/configAggregator';
import ColumnGroup from '@magento/pagebuilder/lib/ContentTypes/ColumnGroup';
import columnGroupConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/ColumnGroup/configAggregator';
import Divider from '@magento/pagebuilder/lib/ContentTypes/Divider';
import dividerConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Divider/configAggregator';
import { DynamicBlockShimmer } from '@magento/pagebuilder/lib/ContentTypes/DynamicBlock';
import dynamicBlockConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/DynamicBlock/configAggregator';
import Heading from '@magento/pagebuilder/lib/ContentTypes/Heading';
import headingConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Heading/configAggregator';
import htmlConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Html/configAggregator';
import { ImageShimmer } from '@magento/pagebuilder/lib/ContentTypes/Image';
import imageConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Image/configAggregator';
import mapConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Map/configAggregator';
import productsConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Products/configAggregator';
import Row from '@magento/pagebuilder/lib/ContentTypes/Row';
import rowConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Row/configAggregator';
import { SliderShimmer } from '@magento/pagebuilder/lib/ContentTypes/Slider';
import sliderConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Slider/configAggregator';
import tabItemConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/TabItem/configAggregator';
import tabsConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Tabs/configAggregator';
import Text from '@magento/pagebuilder/lib/ContentTypes/Text';
import textConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Text/configAggregator';
import videoConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Video/configAggregator';

import OurLocalStoresSliderShimmer from '@app/pageBuilder/ContentTypes/OurLocalStoresSlider/ourLocalStoresSlider.shimmer';
import { SignInBannerShimmer } from '@app/pageBuilder/ContentTypes/SignInBanner';

import { BannerShimmer, bannerConfigAggregator } from './ContentTypes/Banner';
import {
    GoogleReviewsCarouselConfigAggregator,
    GoogleReviewsCarouselShimmer
} from './ContentTypes/GoogleReviewsCarousel';
import HeadingShimmer from './ContentTypes/Heading/heading.shimmer';
import { ProductCarouselShimmer } from './ContentTypes/ProductCarousel';
import productCarouselConfigAggregator from './ContentTypes/ProductCarousel/configAggregator';
import ProductsShimmer from './ContentTypes/Products/products.shimmer';
import StoreBanners from './ContentTypes/StoreBanners';
import {
    TopCategoriesConfigAggregator,
    TopCategoriesSliderShimmer
} from './ContentTypes/TopCategoriesSlider';

/* istanbul ignore next */
export const contentTypesConfig = {
    row: {
        configAggregator: rowConfigAggregator,
        component: Row
    },
    column: {
        configAggregator: columnConfigAggregator,
        component: Column
    },
    'column-group': {
        configAggregator: columnGroupConfigAggregator,
        component: ColumnGroup
    },
    image: {
        configAggregator: imageConfigAggregator,
        component: React.lazy(() => import('./ContentTypes/Image')),
        componentShimmer: ImageShimmer
    },
    heading: {
        configAggregator: headingConfigAggregator,
        component: Heading,
        componentShimmer: HeadingShimmer
    },
    text: {
        configAggregator: textConfigAggregator,
        component: Text
    },
    tabs: {
        configAggregator: tabsConfigAggregator,
        component: React.lazy(() =>
            import('@magento/pagebuilder/lib/ContentTypes/Tabs')
        )
    },
    'tab-item': {
        configAggregator: tabItemConfigAggregator,
        component: React.lazy(() =>
            import('@magento/pagebuilder/lib/ContentTypes/TabItem')
        )
    },
    buttons: {
        configAggregator: buttonsConfigAggregator,
        component: Buttons
    },
    'button-item': {
        configAggregator: buttonItemConfigAggregator,
        component: ButtonItem
    },
    block: {
        configAggregator: blockConfigAggregator,
        component: React.lazy(() =>
            import('@magento/pagebuilder/lib/ContentTypes/Block')
        )
    },
    dynamic_block: {
        configAggregator: dynamicBlockConfigAggregator,
        component: React.lazy(() =>
            import('@magento/pagebuilder/lib/ContentTypes/DynamicBlock')
        ),
        componentShimmer: DynamicBlockShimmer
    },
    products: {
        configAggregator: productsConfigAggregator,
        component: React.lazy(() => import('./ContentTypes/Products')),
        componentShimmer: ProductsShimmer
    },
    html: {
        configAggregator: htmlConfigAggregator,
        component: React.lazy(() =>
            import('@magento/pagebuilder/lib/ContentTypes/Html')
        )
    },
    divider: {
        configAggregator: dividerConfigAggregator,
        component: Divider
    },
    video: {
        configAggregator: videoConfigAggregator,
        component: React.lazy(() =>
            import('@magento/pagebuilder/lib/ContentTypes/Video')
        )
    },
    map: {
        configAggregator: mapConfigAggregator,
        component: React.lazy(() =>
            import('@magento/pagebuilder/lib/ContentTypes/Map')
        )
    },
    banner: {
        configAggregator: bannerConfigAggregator,
        component: React.lazy(() => import('./ContentTypes/Banner')),
        componentShimmer: BannerShimmer
    },
    slider: {
        configAggregator: sliderConfigAggregator,
        component: React.lazy(() =>
            import('@magento/pagebuilder/lib/ContentTypes/Slider')
        ),
        componentShimmer: SliderShimmer
    },
    // Slide is just a banner wrapped inside a slider
    slide: {
        configAggregator: bannerConfigAggregator,
        component: React.lazy(() => import('./ContentTypes/Banner')),
        componentShimmer: BannerShimmer
    },
    hardwareStore_storeBanner: {
        configAggregator: bannerConfigAggregator,
        component: React.lazy(() => import('./ContentTypes/Banner')),
        componentShimmer: BannerShimmer
    },
    hardwareStore_storeBanners: {
        component: StoreBanners
    },
    hardwareStore_product_carousel: {
        configAggregator: productCarouselConfigAggregator,
        component: React.lazy(() => import('./ContentTypes/ProductCarousel')),
        componentShimmer: ProductCarouselShimmer
    },
    magebit_signInBanner: {
        component: React.lazy(() => import('./ContentTypes/SignInBanner')),
        componentShimmer: SignInBannerShimmer
    },
    magebit_ourLocalStoresSlider: {
        component: React.lazy(() =>
            import('./ContentTypes/OurLocalStoresSlider')
        ),
        componentShimmer: OurLocalStoresSliderShimmer
    },
    hardwareStore_top_categories_slider: {
        configAggregator: TopCategoriesConfigAggregator,
        component: React.lazy(() =>
            import('./ContentTypes/TopCategoriesSlider')
        ),
        componentShimmer: TopCategoriesSliderShimmer
    },
    hardwareStore_google_reviews_carousel: {
        configAggregator: GoogleReviewsCarouselConfigAggregator,
        component: React.lazy(() =>
            import('./ContentTypes/GoogleReviewsCarousel')
        ),
        componentShimmer: GoogleReviewsCarouselShimmer
    }
};

/**
 * Retrieve a content types configuration
 *
 * @param {string} contentType
 * @returns {*}
 */

export const getContentTypeConfig = contentType => {
    if (contentTypesConfig[contentType]) {
        return contentTypesConfig[contentType];
    }
};

/**
 * Set content types configuration with new one
 *
 * @param {string} contentType
 * @param {*} config
 * @returns {*}
 */

export const setContentTypeConfig = (contentType, config) => {
    return (contentTypesConfig[contentType] = config);
};
