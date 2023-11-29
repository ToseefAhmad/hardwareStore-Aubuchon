import { bool, node, number } from 'prop-types';
import React, { Children } from 'react';

import SnapSliderArrow from '../partials/Arrow';
import SnapSliderCarousel from '../partials/Carousel';
import SnapSliderContainer from '../partials/Container';
import SnapSliderPagination from '../partials/Pagination';
import SnapSliderSlide from '../partials/Slide';
import { useSnapSliderWithPagination } from './useSnapSliderWithPagination';

/**
 * Slider component with page pagination support.
 * The mandatory requirement for its use is that the slides are the same width.
 * Otherwise, the component will not work properly.
 * This is necessary for more flexible control of slides on the page
 * at different screen widths for those who will use this component.
 * The maximum slide size is the width of the parent container, and it is adjusted automatically.
 */
const SnapSliderWithPagination = props => {
    const {
        children,
        slidesGap,
        isShownSideShadows,
        isInverted,
        isPaginationVisible
    } = props;
    const {
        sliderRef,
        carouselWidth,
        isProgramScrolling,
        pages,
        activePage,
        isFirstPage,
        isLastPage,
        addSlideRefNode,
        handleScroll,
        moveToPage,
        handleMouseDown,
        handleMouseMove,
        handleMouseLeave,
        dragging,
        handleMouseUp
    } = useSnapSliderWithPagination();

    return (
        <SnapSliderContainer
            isShownLeftSideShadow={isShownSideShadows && !isFirstPage}
            isShownRightSideShadow={isShownSideShadows && !isLastPage}
        >
            <SnapSliderCarousel
                ref={sliderRef}
                slidesGap={slidesGap}
                disabled={isProgramScrolling}
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                draggable={dragging}
                onMouseLeave={handleMouseLeave}
            >
                {Children.map(children, (child, idx) => (
                    <SnapSliderSlide
                        slideIndex={idx}
                        ref={node => {
                            addSlideRefNode({ node, idx });
                        }}
                        maxSlideWidth={carouselWidth}
                    >
                        {child}
                    </SnapSliderSlide>
                ))}
            </SnapSliderCarousel>
            <SnapSliderArrow
                direction="left"
                visible={!isFirstPage}
                isInverted={isInverted}
                onPress={() => moveToPage(activePage - 1)}
                disabled={isProgramScrolling}
            />
            <SnapSliderArrow
                direction="right"
                visible={!isLastPage}
                isInverted={isInverted}
                onPress={() => moveToPage(activePage + 1)}
                disabled={isProgramScrolling}
            />
            {isPaginationVisible && (
                <SnapSliderPagination
                    pages={pages.length}
                    activePage={activePage}
                    moveToPage={moveToPage}
                    disabled={isProgramScrolling}
                />
            )}
        </SnapSliderContainer>
    );
};

SnapSliderWithPagination.propTypes = {
    children: node,
    slidesGap: number,
    isShownSideShadows: bool,
    isInverted: bool,
    isPaginationVisible: bool
};

SnapSliderWithPagination.defaultProps = {
    slidesGap: 20,
    isShownSideShadows: false,
    isInverted: false,
    isPaginationVisible: true
};

export default SnapSliderWithPagination;
