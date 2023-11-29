import classnames from 'classnames';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import storeItemClasses from '@app/components/StoresItem/storesItem.module.css';
import storeListClasses from '@app/components/StoresList/storesList.module.css';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './storeListPageContent.module.css';

const StoreListPageShimmer = () => {
    const { screens } = useTailwindContext();
    const { innerWidth } = useWindowSize();
    const isMobile = innerWidth < screens.lg;

    return (
        <div className={classes.root}>
            <div className={classes.title}>Store Locator</div>
            <div className={classes.search}>
                <Shimmer width={'100%'} height={isMobile ? '40px' : '50px'} />
            </div>
            <div className={classes.map}>
                <Shimmer width={'100%'} height={isMobile ? '500px' : '754px'} />
            </div>
            {!isMobile && (
                <div className={classes.list}>
                    <ul
                        className={classnames(
                            storeListClasses.root,
                            classes.storesListRoot
                        )}
                    >
                        {Array.from({ length: 4 })
                            .fill(null)
                            .map((item, idx) => (
                                <div
                                    key={idx}
                                    className={storeItemClasses.root}
                                >
                                    <div className={classes.imageContainer}>
                                        <div className={storeItemClasses.logo}>
                                            <Shimmer
                                                width="20%"
                                                height="100%"
                                            />
                                        </div>
                                    </div>
                                    <div className={classes.content}>
                                        <Shimmer width="100%" height="52px" />
                                    </div>
                                </div>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StoreListPageShimmer;
