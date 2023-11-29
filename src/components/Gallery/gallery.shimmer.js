import { bool, number, object, shape } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';

import OrderPaintBannerShimmer from '@app/components/Gallery/OrderPaintBanner/orderPaintBanner.shimmer';
import GalleryItemShimmer from '@app/components/ProductCard/productCard.shimmer';
import { useTailwindContext } from '@app/context/tailwind';

import { PAINT_SUPPLIES_URL_KEY } from './gallery';
import classes from './gallery.module.css';

const GalleryShimmer = ({ itemProps, size: propsSize, isTwoColumns }) => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const items = Array.from({ length: 12 }).fill(null);

    const size =
        innerWidth >= screens.lg
            ? propsSize.desktop
            : isTwoColumns
            ? propsSize.twoColumns
            : propsSize.mobile;

    return (
        <div className={classes.root} aria-live="polite" aria-busy="true">
            <div className={classes.items}>
                {items.map((item, index) => (
                    <div key={index} className={classes.rootColumns}>
                        <GalleryItemShimmer
                            {...itemProps}
                            isTwoColumns={isTwoColumns}
                            imageHeight={size.height}
                        />
                    </div>
                ))}
                {globalThis?.location?.pathname === PAINT_SUPPLIES_URL_KEY && (
                    <OrderPaintBannerShimmer
                        classes={{ root: classes.banner }}
                    />
                )}
            </div>
        </div>
    );
};

GalleryShimmer.defaultProps = {
    itemProps: {},
    size: {
        desktop: { width: 230, height: 230 },
        mobile: { width: 145, height: 145 },
        twoColumns: { width: 120, height: 120 }
    },
    isTwoColumns: true
};

GalleryShimmer.propTypes = {
    itemProps: shape({
        classes: object
    }),
    size: shape({
        desktop: shape({
            width: number,
            height: number
        }),
        mobile: shape({
            width: number,
            height: number
        }),
        twoColumns: shape({
            width: number,
            height: number
        })
    }),
    isTwoColumns: bool
};

export default GalleryShimmer;
