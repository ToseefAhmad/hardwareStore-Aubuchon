import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

import { smoothScroll } from '@app/utils/smooth-scroll';

export const useSnapSlider = ({ threshold, children, resetDependency }) => {
    const sliderRef = useRef(null);
    const slideRefs = useRef([]);

    const leftVisibleIndex = useRef(0);
    const rightVisibleIndex = useRef(0);

    const [carouselWidth, setCarouselWidth] = useState(0);

    const [visibleIndexesCount, setVisibleIndexesCount] = useState(undefined);

    const [isScrolling, setIsScrolling] = useState(false);
    const [isVisibleFirst, setIsVisibleFirst] = useState(true);
    const [isVisibleLast, setIsVisibleLast] = useState(true);
    const [didMount, setDidMount] = useState(false);

    /**
     * Function for adding slide to refs collection
     */
    const addSlideRefNode = useCallback(({ node, idx }) => {
        slideRefs.current[idx] = node;
    }, []);
    /**
     * Function for program scrolling. As a parameter takes a number of how many elements to move
     */
    const moveTo = useCallback(
        async dir => {
            const targetEl =
                slideRefs.current[leftVisibleIndex.current + dir] ||
                (dir < 0
                    ? slideRefs.current[0]
                    : slideRefs.current[children.length - 1]);

            if (targetEl) {
                setIsScrolling(true);
                await smoothScroll({
                    container: sliderRef.current,
                    to: {
                        x: targetEl.offsetLeft,
                        y: 0
                    },
                    duration: 475
                });
                setIsScrolling(false);
            }
        },
        [children.length]
    );

    /**
     * Callback for the Intersection Observer
     */
    const intersectionCallback = useCallback(
        entries => {
            const totalLength = children.length - 1;
            const visibleIndexes = entries.reduce((acc, entry) => {
                if (entry.isIntersecting) {
                    return acc + 1;
                } else {
                    return acc;
                }
            }, 0);

            // Update visibleIndexesCount only after first render
            if (!visibleIndexesCount) {
                setVisibleIndexesCount(visibleIndexes - 1);
            }

            entries.map(entry => {
                const target = entry.target;
                const index = +target.dataset.indexNumber;

                if (index < leftVisibleIndex.current && entry.isIntersecting) {
                    leftVisibleIndex.current = index;
                } else if (
                    index === leftVisibleIndex.current &&
                    !entry.isIntersecting
                ) {
                    leftVisibleIndex.current = index + 1;
                }

                if (index > rightVisibleIndex.current && entry.isIntersecting) {
                    rightVisibleIndex.current = index;
                } else if (
                    index === rightVisibleIndex.current &&
                    !entry.isIntersecting
                ) {
                    rightVisibleIndex.current = index - 1;
                }

                if (index === 0) {
                    if (entry.isIntersecting) {
                        setIsVisibleFirst(true);
                    } else {
                        setIsVisibleFirst(false);
                    }
                } else if (index === totalLength) {
                    if (entry.isIntersecting) {
                        setIsVisibleLast(true);
                    } else {
                        setIsVisibleLast(false);
                    }
                }
            });
        },
        [children.length, visibleIndexesCount]
    );

    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, []);
    /**
     * Setting the observer on slides
     */
    useEffect(() => {
        if (!didMount) {
            return;
        }
        const observer = new IntersectionObserver(intersectionCallback, {
            root: sliderRef.current,
            rootMargin: '0px',
            threshold: threshold
        });

        for (const node of slideRefs.current) {
            node && observer.observe(node);
        }
        return () => observer.disconnect();
    }, [intersectionCallback, threshold, didMount, children]); // eslint-disable-line react-hooks/exhaustive-deps

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
     * when the button for scrolling on left and right is available and user choose specific category,
     * list with categories will be updated and as category slider is not rerender at PLP
     * on next category it will automatically scroll to the first element
     */
    useEffect(() => {
        const scrollToTarget = async () => {
            const targetEl = slideRefs.current[0];
            if (targetEl) {
                setIsScrolling(true);
                await smoothScroll({
                    container: sliderRef.current,
                    to: {
                        x: targetEl.offsetLeft,
                        y: 0
                    },
                    duration: 750
                });
                setIsScrolling(false);
            }
        };

        scrollToTarget();
    }, [resetDependency]); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Let the slider be draggable
     */
    const [dragging, setDragging] = useState(false);

    const relX = useRef(0);

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
        await moveTo(0);
        setDragging(false);
    }, [moveTo]);

    const handleMouseLeave = useCallback(async () => {
        if (!dragging) return;

        onStopDragging();
    }, [dragging, onStopDragging]);

    return {
        sliderRef,
        addSlideRefNode,
        isScrolling,
        isVisibleFirst,
        isVisibleLast,
        moveTo,
        carouselWidth,
        handleMouseDown,
        handleMouseMove,
        handleMouseLeave,
        dragging,
        handleMouseUp: onStopDragging,
        visibleIndexesCount
    };
};
