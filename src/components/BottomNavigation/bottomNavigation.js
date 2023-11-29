import React, { Fragment, useEffect, useState } from 'react';

import { useWindowSize } from '@magento/peregrine';

import CartTrigger from '@app/components/Header/CartTrigger';
import StoreSwitcher from '@app/components/Header/StoreSwitcher';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './bottomNavigation.module.css';
import { useBottomNavigation } from './useBottomNavigation';

const BottomNavigation = () => {
    const {
        areSearchSuggestionsShown,
        isPLPageOrPDPage,
        isLoading
    } = useBottomNavigation();
    const [showNavigation, setShowNavigation] = useState(false);

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();

    const rootClass = areSearchSuggestionsShown
        ? classes.rootMasked
        : classes.root;
    const isDesktop = innerWidth >= screens.lg;

    useEffect(() => {
        // initially show on all pages except pdp and plp page
        if (!isLoading && !isPLPageOrPDPage) {
            setShowNavigation(true);
        }
        if (isDesktop) {
            return;
        }

        const handleScroll = () => {
            if (window.pageYOffset > 45) {
                setShowNavigation(true);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isDesktop, isPLPageOrPDPage, isLoading]);

    if (isDesktop) {
        return null;
    }

    return (
        <Fragment>
            <nav
                className={showNavigation ? classes.rootFadeIn : rootClass}
                aria-label="Lower screen navigation"
            >
                <CartTrigger showMobileCart={true} />
                <StoreSwitcher
                    classes={{
                        root: classes.storeSwitcherRoot,
                        mobileTrigger: classes.mobileTrigger,
                        name: classes.name,
                        info: classes.info
                    }}
                    showMobileSwitcher={true}
                />
            </nav>
        </Fragment>
    );
};

export default BottomNavigation;
