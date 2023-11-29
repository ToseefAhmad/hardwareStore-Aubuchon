import { lazy } from 'react';

import { detectAboutUsLinkParser } from '../CustomRow/AboutUsLinkParser';
import {
    detectAboutUsPageSliderBlock,
    AboutUsPageSliderBlockShimmer
} from '../CustomRow/AboutUsPageSliderBlock';
import { detectCreateAccountBlockContainer } from '../CustomRow/CreateAccountBlockContainer';

export const CUSTOM_ROW_CONFIG = [
    {
        detectFn: detectAboutUsPageSliderBlock,
        component: lazy(() => import('../CustomRow/AboutUsPageSliderBlock')),
        componentShimmer: AboutUsPageSliderBlockShimmer
    },
    {
        detectFn: detectCreateAccountBlockContainer,
        component: lazy(() =>
            import('../CustomRow/CreateAccountBlockContainer')
        )
    },
    {
        detectFn: detectAboutUsLinkParser,
        component: lazy(() => import('./AboutUsLinkParser'))
    }
];
