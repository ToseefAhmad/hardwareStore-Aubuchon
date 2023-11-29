import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Section from '@app/components/Section';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './addressBookPage.module.css';

const AddressBookPageShimmer = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.xl;

    return (
        <section className={classes.root}>
            <Section>
                <Shimmer
                    height={isMobile ? '32px' : '44px'}
                    width={isMobile ? '100%' : '284px'}
                    borderRadius="5px"
                />
                <div className={classes.cards}>
                    <Shimmer
                        height={isMobile ? '266px' : '364px'}
                        borderRadius="5px"
                    />
                    <Shimmer
                        height={isMobile ? '266px' : '364px'}
                        borderRadius="5px"
                    />
                </div>
            </Section>
            <Section>
                <Shimmer
                    height="68px"
                    width={isMobile ? '100%' : '378px'}
                    borderRadius="5px"
                />
                <Shimmer
                    height={isMobile ? '976px' : '428px'}
                    borderRadius="5px"
                />
            </Section>
        </section>
    );
};

export default AddressBookPageShimmer;
