import { lazy } from 'react';

import { ContentShimmer } from '@app/components/WarningContent/Content';

export const TYPES = {
    warning: 'WARNING',
    specialOrder: 'SPECIAL_ORDER'
};

export const CONTENT_COMPONENTS = {
    [TYPES.warning]: {
        Component: lazy(() => import('@app/components/WarningContent')),
        Shimmer: ContentShimmer
    },
    [TYPES.specialOrder]: {
        Component: lazy(() => import('./SpecialOrderContent')),
        Shimmer: ContentShimmer
    }
};
