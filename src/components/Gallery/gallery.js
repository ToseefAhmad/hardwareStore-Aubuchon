import { string, shape, array } from 'prop-types';
import React, { useMemo, Suspense, lazy } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import ProductCard from '@app/components/ProductCard';

import defaultClasses from './gallery.module.css';
import OrderPaintBannerShimmer from './OrderPaintBanner/orderPaintBanner.shimmer';
import { useGallery } from './useGallery';

const OrderPaintBannerComponent = lazy(() => import('./OrderPaintBanner'));

export const PAINT_SUPPLIES_URL_KEY = '/paint';

/**
 * Renders a Gallery of items. If items is an array of nulls Gallery will render
 * a placeholder item for each.
 *
 * @params {Array} props.items an array of items to render
 */
const Gallery = props => {
    const { items, origin, categoryName, searchTerm } = props;

    const classes = useStyle(defaultClasses, props.classes);
    const { storeConfig } = useGallery();

    const galleryItems = useMemo(
        () =>
            items.map((item, index) => {
                return (
                    <ProductCard
                        key={index}
                        product={item}
                        storeConfig={storeConfig}
                        isTwoColumns={true}
                        origin={origin}
                        searchTerm={searchTerm}
                        category={categoryName}
                        position={index + 1}
                    />
                );
            }),
        [categoryName, items, origin, searchTerm, storeConfig]
    );

    const orderPainBanner = useMemo(
        () =>
            globalThis?.location?.pathname === PAINT_SUPPLIES_URL_KEY ? (
                <Suspense
                    fallback={
                        <OrderPaintBannerShimmer
                            classes={{ root: classes.banner }}
                        />
                    }
                >
                    <OrderPaintBannerComponent
                        classes={{ root: classes.banner }}
                    />
                </Suspense>
            ) : null,
        [classes]
    );

    return (
        <div className={classes.root} aria-live="polite" aria-busy="false">
            <div className={classes.items}>
                {galleryItems}
                {orderPainBanner}
            </div>
        </div>
    );
};

Gallery.propTypes = {
    classes: shape({
        filters: string,
        items: string,
        pagination: string,
        root: string
    }),
    items: array.isRequired,
    origin: string,
    searchTerm: string,
    categoryName: string
};

Gallery.defaultProps = {
    origin: 'plp',
    searchTerm: '',
    categoryName: ''
};

export default Gallery;
