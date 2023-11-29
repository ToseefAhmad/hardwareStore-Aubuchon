import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import LinkSlider from '@app/components/LinkSlider';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './topCategoriesSlider.module.css';

const TopCategoriesSliderShimmer = () => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    return (
        <div className={classes.sliderRoot}>
            <div className={classes.sliderTitle}>
                <Shimmer width="200px" height={isMobile ? '38px' : '46px'} />
            </div>
            <LinkSlider isLoading={true} />
        </div>
    );
};

export default TopCategoriesSliderShimmer;
