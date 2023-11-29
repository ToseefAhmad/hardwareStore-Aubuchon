import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useTailwindContext } from '@app/context/tailwind';

import classes from './savedPaymentsPage.module.css';

const SavedPaymentsPageShimmer = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.xl;

    return (
        <div className={classes.root}>
            <div className={classes.cardsShimmer}>
                {!isMobile && <Shimmer height="60px" borderRadius="5px" />}
                <Shimmer
                    height={isMobile ? '173px' : '79px'}
                    borderRadius="5px"
                />
                <Shimmer
                    height={isMobile ? '173px' : '79px'}
                    borderRadius="5px"
                />
                <Shimmer
                    height={isMobile ? '173px' : '79px'}
                    borderRadius="5px"
                />
            </div>
        </div>
    );
};

export default SavedPaymentsPageShimmer;
