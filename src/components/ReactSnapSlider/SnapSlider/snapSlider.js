import { any, bool, node, number, shape, string } from 'prop-types';
import React, { Children } from 'react';

import SnapSliderArrow from '../partials/Arrow';
import SnapSliderCarousel from '../partials/Carousel';
import SnapSliderContainer from '../partials/Container';
import SnapSliderSlide from '../partials/Slide';
import { useSnapSlider } from './useSnapSlider';

/**
 * A lightweight slider component for easy scrolling left and right.
 * Slides can be any width.
 * The maximum slide size is the width of the parent container, and it is adjusted automatically
 */
const SnapSlider = props => {
    const {
        children,
        carouselClasses,
        arrowClasses,
        slidesGap,
        isShownSideShadows,
        isInverted,
        threshold,
        resetDependency,
        isLocalStoresSlider
    } = props;

    const {
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
        handleMouseUp,
        visibleIndexesCount
    } = useSnapSlider({ threshold, children, resetDependency });

    return (
        <SnapSliderContainer
            isShownLeftSideShadow={isShownSideShadows && !isVisibleFirst}
            isShownRightSideShadow={isShownSideShadows && !isVisibleLast}
        >
            <SnapSliderCarousel
                ref={sliderRef}
                classes={carouselClasses}
                slidesGap={slidesGap}
                disabled={isScrolling}
                isShownSideShadows={isShownSideShadows}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                draggable={dragging}
                onMouseLeave={handleMouseLeave}
                isLocalStoresSlider={isLocalStoresSlider}
            >
                {Children.map(children, (child, idx) => (
                    <SnapSliderSlide
                        slideIndex={idx}
                        ref={node => {
                            addSlideRefNode({ node, idx });
                        }}
                        maxSlideWidth={carouselWidth}
                        isDraggable={dragging}
                    >
                        {child}
                    </SnapSliderSlide>
                ))}
            </SnapSliderCarousel>
            <SnapSliderArrow
                direction="left"
                visible={!isVisibleFirst}
                isInverted={isInverted}
                onPress={() => moveTo(-visibleIndexesCount)}
                disabled={isScrolling}
                classes={arrowClasses}
            />
            <SnapSliderArrow
                direction="right"
                visible={!isVisibleLast}
                isInverted={isInverted}
                onPress={() => moveTo(visibleIndexesCount)}
                disabled={isScrolling}
                classes={arrowClasses}
            />
        </SnapSliderContainer>
    );
};

SnapSlider.propTypes = {
    children: node,
    carouselClasses: shape({
        root: string
    }),
    arrowClasses: shape({
        root: string,
        disabled: string,
        root_isInverted: string,
        disabled_isInverted: string
    }),
    slidesGap: number,
    isShownSideShadows: bool,
    isInverted: bool,
    threshold: number,
    resetDependency: any,
    isLocalStoresSlider: bool
};

SnapSlider.defaultProps = {
    slidesGap: 20,
    carouselClasses: {},
    isShownSideShadows: false,
    isInverted: false,
    threshold: 0.75
};

export default SnapSlider;
