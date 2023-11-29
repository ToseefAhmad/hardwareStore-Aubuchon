import { useState } from 'react';

import { useEventListener } from '@magento/peregrine';

export const useScrollDirection = () => {
    const [scrollDir, setScrollDir] = useState(null);
    const [currentScroll, setCurrentScroll] = useState(null);
    const threshold = 0;
    let lastScrollY = globalThis.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
        const scrollY = globalThis.pageYOffset;

        if (Math.abs(scrollY - lastScrollY) < threshold) {
            ticking = false;
            return;
        }

        setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
        setCurrentScroll(scrollY);
        lastScrollY = scrollY > 0 ? scrollY : 0;
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            globalThis.requestAnimationFrame(updateScrollDir);
            ticking = true;
        }
    };

    useEventListener(globalThis, 'scroll', onScroll);

    return {
        scrollDir,
        currentScroll
    };
};
