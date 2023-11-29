import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

import { smoothScroll } from '@app/utils/smooth-scroll';

/**
 * Helper function for calculating virtual pagination
 *
 * @param {number} slidesCount
 * @param {number} perPage
 * @param {function} callback
 */
const calcVirtualNavigation = ({ slidesCount, perPage, callback }) => {
    const virtualPagination = [];
    const total = [...Array(slidesCount).keys()];

    if (perPage) {
        let page = 0;

        while (total.length) {
            virtualPagination[page] = [...total.splice(0, perPage)];

            page++;
        }
    }

    callback(virtualPagination);
};

export const useSnapSliderWithPagination = () => {
    const sliderRef = useRef(null);
    const slideRefs = useRef([]);
    const visibleSlidesIndexes = useRef([]);
    const relX = useRef(0);

    const [isActive, setIsActive] = useState(false);
    const [carouselWidth, setCarouselWidth] = useState(0);
    const [isProgramScrolling, setIsProgramScrolling] = useState(false);
    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [dragging, setDragging] = useState(false);

    const isFirstPage = useMemo(() => activePage === 0, [activePage]);
    const isLastPage = useMemo(() => activePage === pages.length - 1, [
        activePage,
        pages
    ]);

    /**
     * Function for adding slide to refs collection
     */
    const addSlideRefNode = useCallback(({ node, idx }) => {
        slideRefs.current[idx] = node;
    }, []);

    /**
     * Carousel scroll handler (Used for calc active slide index)
     */
    const handleScroll = useCallback(() => {
        visibleSlidesIndexes.current.length &&
            setActiveIndex(visibleSlidesIndexes.current[0]);
    }, []);

    /**
     * Debounced ref for original carousel scroll handler func
     */
    const debouncedHandleScroll = useRef(debounce(handleScroll, 40));

    /**
     * Pagination calculation after slider initialization
     */
    useEffect(() => {
        isActive &&
            calcVirtualNavigation({
                slidesCount: slideRefs.current.length,
                perPage: visibleSlidesIndexes.current.length,
                callback: setPages
            });
    }, [isActive]);

    /**
     * Pagination calculation after window resizing
     */
    useEffect(() => {
        const callback = debounce(() => {
            calcVirtualNavigation({
                slidesCount: slideRefs.current.length,
                perPage: visibleSlidesIndexes.current.length,
                callback: setPages
            });
        }, 500);

        window.addEventListener('resize', callback);

        return () => {
            callback.cancel();
            window.removeEventListener('resize', callback);
        };
    }, []);

    /**
     *  Calculation active page after change slide activeIndex
     */
    useEffect(() => {
        if (pages.length) {
            const isLast = visibleSlidesIndexes.current.includes(
                slideRefs.current.length - 1
            );
            const updatedActivePage = isLast
                ? pages.length - 1
                : pages.findIndex(i => i.includes(activeIndex));

            setActivePage(updatedActivePage);
        }
    }, [activeIndex, pages]);

    /**
     * Callback for the Intersection Observer
     */
    const intersectionCallback = useCallback(entries => {
        for (let i = 0; i < entries.length; i++) {
            const target = entries[i].target;
            const index = +target.dataset.indexNumber;

            if (entries[i].isIntersecting) {
                if (!visibleSlidesIndexes.current.includes(index)) {
                    visibleSlidesIndexes.current.push(index);
                    visibleSlidesIndexes.current.sort((a, b) => a - b);
                }
            } else {
                visibleSlidesIndexes.current = visibleSlidesIndexes.current.filter(
                    item => item !== index
                );
            }
        }

        setIsActive(true);
    }, []);

    /**
     * Setting the observer on slides
     */
    useEffect(() => {
        const observer = new IntersectionObserver(intersectionCallback, {
            root: sliderRef.current,
            rootMargin: '0px',
            threshold: 0.99
        });

        for (const node of slideRefs.current) {
            node && observer.observe(node);
        }
        return () => observer.disconnect();
    }, [intersectionCallback]);

    /**
     * Set the maximum width of the slide
     */
    useEffect(() => {
        const observerCallback = ([sliderEntry]) => {
            const { contentRect } = sliderEntry;

            setCarouselWidth(contentRect.width);
        };
        const debounced = debounce(observerCallback, 300);
        const observer = new ResizeObserver(debounced);

        observer.observe(sliderRef.current);

        return () => {
            debounced.cancel();
            observer.disconnect();
        };
    }, []);

    /**
     * Function for navigating through pages or slides by dragging
     */

    const moveToIndex = useCallback(async index => {
        setIsProgramScrolling(true);

        await smoothScroll({
            container: sliderRef.current,
            to: {
                x: slideRefs.current[index].offsetLeft,
                y: 0
            },
            duration: 500
        });
        setIsProgramScrolling(false);
    }, []);

    const moveToPage = useCallback(
        page => {
            const [firstPageSlideIndex] = pages[page];
            moveToIndex(firstPageSlideIndex);
        },
        [moveToIndex, pages]
    );

    const handleMouseDown = useCallback(e => {
        setDragging(true);
        relX.current = e.pageX;
    }, []);

    const handleMouseMove = useCallback(
        e => {
            if (!dragging) return;

            e.preventDefault();

            const diff = e.pageX - relX.current;

            sliderRef.current.scrollLeft =
                sliderRef.current.scrollLeft - diff * 2;

            relX.current = e.pageX;
        },
        [dragging, sliderRef]
    );

    const onStopDragging = useCallback(async () => {
        await moveToIndex(activeIndex);
        setDragging(false);
    }, [activeIndex, moveToIndex]);

    const handleMouseLeave = useCallback(() => {
        if (!dragging) return;
        onStopDragging();
    }, [dragging, onStopDragging]);

    return {
        sliderRef,
        carouselWidth,
        isProgramScrolling,
        pages,
        activePage,
        isFirstPage,
        isLastPage,
        addSlideRefNode,
        handleScroll: debouncedHandleScroll.current,
        moveToPage,
        handleMouseDown,
        handleMouseMove,
        handleMouseLeave,
        dragging,
        handleMouseUp: onStopDragging
    };
};
