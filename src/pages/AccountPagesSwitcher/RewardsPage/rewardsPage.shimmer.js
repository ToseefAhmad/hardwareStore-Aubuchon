import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useTailwindContext } from '@app/context/tailwind';

import classes from './rewardsPage.module.css';

const RewardsPageShimmer = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.xl;

    return (
        <div className={classes.root}>
            <Shimmer height={isMobile ? '282px' : '200px'} borderRadius="5px" />
            <div className={classes.cards}>
                <Shimmer
                    height={isMobile ? '78px' : '82px'}
                    borderRadius="5px"
                />
                <Shimmer
                    height={isMobile ? '78px' : '82px'}
                    borderRadius="5px"
                />
                <Shimmer
                    height={isMobile ? '78px' : '82px'}
                    borderRadius="5px"
                />
            </div>
        </div>
    );
};

export default RewardsPageShimmer;
