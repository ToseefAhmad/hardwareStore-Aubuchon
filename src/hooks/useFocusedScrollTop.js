import { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useEventListener, useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';

import { useTailwindContext } from '@app/context/tailwind';

const HIDE_SEARCH = 1; /** Hide search will remove it and after sroll down and scroll back to top it will return back */
const HIDE_HEADER = 2; /** Hide header will scroll down to the start of content hiding logo and search */

/**
 * On page change, on certain pages we want to scroll into a view where header can't be seen
 */
export const useFocusedScrollTop = type => {
    const headerOffset = type === HIDE_HEADER ? 152 : 72;
    const hideSearch = type === HIDE_SEARCH;

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const [
        { isSearchHidden, scrollOnTopOffset },
        {
            actions: { setScrollOnTopOffset, setIsSearchHidden }
        }
    ] = useAppContext();

    const history = useHistory();

    useEffect(() => {
        if (
            !globalThis.scrollTo ||
            scrollOnTopOffset === 0 ||
            history.action === 'POP'
        )
            return;

        setTimeout(() => {
            globalThis.scrollTo({
                behavior: 'smooth',
                left: 0,
                top: scrollOnTopOffset
            });
        }, 0);

        setScrollOnTopOffset(0);
    }, [scrollOnTopOffset, setScrollOnTopOffset, history]);

    useEffect(() => {
        if (isMobile) {
            setIsSearchHidden(hideSearch);
            setScrollOnTopOffset(headerOffset);
        }
    }, [
        isMobile,
        setIsSearchHidden,
        setScrollOnTopOffset,
        hideSearch,
        headerOffset
    ]);

    const prevScrollRef = useRef(globalThis && globalThis.scrollY);
    const onScroll = useCallback(() => {
        if (!globalThis.scrollY || !isSearchHidden) return;
        const prevScroll = prevScrollRef.current;

        if (prevScroll >= headerOffset && globalThis.scrollY < prevScroll) {
            setIsSearchHidden(false);
        }
        prevScrollRef.current = globalThis.scrollY;
    }, [headerOffset, isSearchHidden, setIsSearchHidden]);

    // Show Search bar on scroll up
    useEventListener(globalThis, 'scroll', onScroll);
};
