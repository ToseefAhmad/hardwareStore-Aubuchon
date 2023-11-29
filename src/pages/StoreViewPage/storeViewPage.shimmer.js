import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { BreadcrumbShimmer } from '@app/components/Breadcrumbs';
import { StoreDetailsShimmer } from '@app/components/StoreDetails';
import { useTailwindContext } from '@app/context/tailwind';

import ManagersShimmer from './Managers/managers.shimmer';
import ServicesShimmer from './Services/services.shimmer';
import classes from './storeViewPage.module.css';

const StoreViewPageShimmer = () => {
    const { screens } = useTailwindContext();
    const { innerWidth } = useWindowSize();
    const isMobile = innerWidth < screens.lg;

    return (
        <>
            <BreadcrumbShimmer />
            <div className={classes.root}>
                <div className={classes.storeBlock}>
                    <StoreDetailsShimmer isMobile={isMobile} />
                    {!isMobile && <ManagersShimmer />}
                </div>
                <div className={classes.mapBlock}>
                    <div className={classes.map}>
                        <Shimmer
                            width="100%"
                            height="100%"
                            borderRadius={isMobile ? '0' : '5px'}
                        />
                    </div>
                    {isMobile && <ManagersShimmer />}
                    <ServicesShimmer isMobile={isMobile} />
                </div>
            </div>
        </>
    );
};

export default StoreViewPageShimmer;
