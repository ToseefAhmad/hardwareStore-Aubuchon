import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useTailwindContext } from '@app/context/tailwind';

import BaseCarousel from '../BaseCarousel';
import classes from './bestsellers.module.css';

const BestsellersShimmer = () => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Shimmer width="400px" height={isMobile ? '36px' : '51px'} />
            </div>
            <div className={classes.bestsellerCategories}>
                <Shimmer width="100%" height={isMobile ? '46px' : '52px'} />
            </div>
            <BaseCarousel items={[]} isLoading={true} />
        </div>
    );
};

export default BestsellersShimmer;
