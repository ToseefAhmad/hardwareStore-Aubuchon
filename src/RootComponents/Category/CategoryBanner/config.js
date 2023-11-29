import { lazy } from 'react';

import InteriorPaintBannerShimmer from './InteriorPaintBanner/interiorPaintBanner.shimmer';

// This config is meant to be used for banners that would be listed at the top of the page.
// Key should be a URL key from a category.
export const CATEGORY_BANNER_CONFIG = {
    paint: {
        Component: lazy(() =>
            import('./InteriorPaintBanner/interiorPaintBanner')
        ),
        ComponentShimmer: InteriorPaintBannerShimmer
    },
    'paint/interior-exterior-paint': {
        Component: lazy(() =>
            import('./InteriorPaintBanner/interiorPaintBanner')
        ),
        ComponentShimmer: InteriorPaintBannerShimmer
    }
};
