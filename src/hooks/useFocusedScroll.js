import { useCallback, useEffect } from 'react';

import { useEventListener, useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';

import { useTailwindContext } from '@app/context/tailwind';

//  Hook is used on Category page to return user to previous position.
export const useFocusedScroll = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const [
        { isPageLoading, previousPlpScroll },
        {
            actions: { setPreviousPlpScroll }
        }
    ] = useAppContext();

    const body = document.body;
    const html = document.documentElement;

    /** This variable is used to check, if products are loaded on the category page
    and previous scroll position is smaller than total document or body height.
    If previous `y` value is bigger than total document height, it probably means,
    that products are not loaded or there are small amount of them, so no scrolling is isRequired. */
    const maxDocumentOrBodyHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );

    /** Default `y` position when category page should be scrolled to hide the header.
    Should be used when new category page is visited
    and `previousPlpScroll` is already mutated. */
    const defaultYPosition = 72;

    /** Page should be scrolled back in the following cases:
    1. If it's mobile or at least viewport has mobile sizes.
    2. If page isn't loading or loading is finished.
    3. If previous url `path+search` matches the current.
    4. If previous `y` position is smaller than current document or
    body height. It can be bigger in case, if no products are loaded
    due to error or some other reason. **/
    useEffect(() => {
        if (
            isMobile &&
            !isPageLoading &&
            previousPlpScroll.uri ===
                `${globalThis.location.pathname}${
                    globalThis.location.search
                }` &&
            previousPlpScroll.position.y < maxDocumentOrBodyHeight
        ) {
            globalThis.scrollTo({
                behavior: 'smooth',
                left: 0,
                top: previousPlpScroll.position.y
            });
        }

        /** In case, if the page is visited for the first time, than there are no previous values for it
        or there are value for another category page instead, so default scroll behavior should be done.
        Initial `y` value is set to 72, in order to hide the header. */
        if (
            isMobile &&
            !isPageLoading &&
            previousPlpScroll.uri !==
                `${globalThis.location.pathname}${globalThis.location.search}`
        ) {
            globalThis.scrollTo({
                behavior: 'smooth',
                left: 0,
                top: defaultYPosition
            });
        }
    }, [isMobile, isPageLoading, previousPlpScroll, maxDocumentOrBodyHeight]);

    const onClickOrTouchstart = useCallback(() => {
        if (
            isMobile &&
            previousPlpScroll.position.y > maxDocumentOrBodyHeight
        ) {
            return;
        }

        isMobile &&
            setPreviousPlpScroll({
                position: { x: 0, y: globalThis.scrollY },
                uri: `${globalThis.location.pathname}${
                    globalThis.location.search
                }`
            });
    }, [
        isMobile,
        maxDocumentOrBodyHeight,
        previousPlpScroll,
        setPreviousPlpScroll
    ]);

    useEventListener(globalThis, 'click', onClickOrTouchstart);
    useEventListener(globalThis, 'touchstart', onClickOrTouchstart);
};
