import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Section from '@app/components/Section';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './accountPage.module.css';

const AccountPageShimmer = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const isTablet = windowSize.innerWidth < tailwind.screens.xl;

    return (
        <div className={classes.root}>
            {isMobile && <Shimmer height="44px" borderRadius="5px" />}
            <Shimmer height={isTablet ? '220px' : '141px'} borderRadius="5px" />
            <Section>
                <Shimmer
                    height={isTablet ? '32px' : '44px'}
                    width={isTablet ? '100%' : '308px'}
                    style={{ marginTop: !isTablet && 18 }}
                    borderRadius="5px"
                />
                <div className={classes.cards}>
                    <Shimmer
                        height={isTablet ? '248px' : '286px'}
                        borderRadius="5px"
                    />
                </div>
            </Section>
            <Section>
                <Shimmer
                    height="68px"
                    width={isTablet ? '100%' : '232px'}
                    borderRadius="5px"
                />
                <div className={classes.cards}>
                    <Shimmer
                        height={isTablet ? '266px' : '364px'}
                        borderRadius="5px"
                    />
                    <Shimmer
                        height={isTablet ? '266px' : '364px'}
                        borderRadius="5px"
                    />
                </div>
            </Section>
            <Section>
                <Shimmer
                    height="68px"
                    width={isTablet ? '100%' : '164px'}
                    borderRadius="5px"
                />
                <Shimmer
                    height={isTablet ? '812px' : '298px'}
                    borderRadius="5px"
                />
            </Section>
            <Section>
                <Shimmer
                    height="68px"
                    width={isMobile ? '100%' : '164px'}
                    borderRadius="5px"
                />
                <Shimmer
                    height={isMobile ? '387px' : '296px'}
                    borderRadius="5px"
                />
            </Section>
        </div>
    );
};

export default AccountPageShimmer;
