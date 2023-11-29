import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useTailwindContext } from '@app/context/tailwind';

import classes from './ourLocalStoresSlider.module.css';

const OurLocalStoresSliderShimmer = () => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    return (
        <>
            <div className={classes.title}>
                <Shimmer width="100%" height={isMobile ? '38px' : '46px'} />
            </div>
            <div className={classes.slider}>
                <Shimmer width="100%" height={isMobile ? '260px' : '100px'} />
            </div>
            <div className={classes.storeLinksShimmer}>
                <Shimmer width="100%" height={isMobile ? '490px' : '145px'} />
            </div>
        </>
    );
};

export default OurLocalStoresSliderShimmer;
