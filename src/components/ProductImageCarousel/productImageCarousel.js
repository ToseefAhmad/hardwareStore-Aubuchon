import classnames from 'classnames';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import React, { forwardRef, Fragment, useMemo } from 'react';
import Slider from 'react-slick';

import { useWindowSize } from '@magento/peregrine';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Image from '@app/components/ImageZoom';
import { useTailwindContext } from '@app/context/tailwind';

import defaultClasses from './productImageCarousel.module.css';
import Thumbnail from './thumbnail';
import { useProductImageCarousel } from './useProductImageCarousel';

const IMAGE_WIDTH = 670;

const ProductImageCarousel = forwardRef((props, ref) => {
    const { images, bgColor, isConfigurableProduct, ...rest } = props;
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.xl;

    const {
        currentImage,
        activeItemIndex,
        altText,
        handleThumbnailClick,
        sortedImages
    } = useProductImageCarousel({
        images,
        imageWidth: IMAGE_WIDTH
    });
    // create thumbnail image component for every images in sorted order
    const thumbnails = useMemo(
        () =>
            sortedImages.map((item, index) => (
                <Thumbnail
                    key={item.url}
                    item={item}
                    itemIndex={index}
                    isActive={activeItemIndex === index}
                    onClickHandler={handleThumbnailClick}
                    isDisplayed={isMobile ? false : true}
                />
            )),
        [activeItemIndex, handleThumbnailClick, sortedImages, isMobile]
    );

    const isMoreThanOne = sortedImages.length > 1;

    const classes = useStyle(defaultClasses, props.classes);

    let image;
    if (currentImage.url) {
        image = (
            <Image
                alt={altText}
                {...rest}
                classes={{
                    image: classes.currentImage,
                    root: classes.imageContainer
                }}
                resource={currentImage.url}
                width={IMAGE_WIDTH}
            />
        );
    } else {
        image = (
            <Image
                alt={altText}
                {...rest}
                classes={{
                    image: classes.currentImage_placeholder,
                    root: classes.imageContainer
                }}
                src={transparentPlaceholder}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classnames({ [classes.showGrid]: isMoreThanOne })}>
                {isMobile ? (
                    <div className={classes.carouselContainer}>
                        {bgColor && (
                            <div
                                className={classes.backgroundPlaceholder}
                                style={{
                                    backgroundColor: bgColor || 'transparent'
                                }}
                            />
                        )}
                        {isConfigurableProduct ? (
                            image
                        ) : (
                            <Slider
                                dots={true}
                                arrows={false}
                                infinite={true}
                                speed={500}
                                slidesToShow={1}
                                slidesToScroll={1}
                                dotsClass={classes.sliderDots}
                                className={classes.slider}
                            >
                                {sortedImages.map(image => (
                                    <div key={image.url}>
                                        <Image
                                            alt={image.label || ''}
                                            classes={{
                                                image: classes.currentImage,
                                                root: classes.imageContainer
                                            }}
                                            resource={image.url}
                                            {...rest}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                ) : (
                    <Fragment>
                        <div ref={ref}>
                            <div className={classes.carouselContainer}>
                                {bgColor && (
                                    <div
                                        className={
                                            classes.backgroundPlaceholder
                                        }
                                        style={{ backgroundColor: bgColor }}
                                    />
                                )}
                                {image}
                            </div>
                        </div>
                        {isMoreThanOne && !isConfigurableProduct && (
                            <div className={classes.thumbnailList}>
                                {thumbnails}
                            </div>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    );
});

ProductImageCarousel.propTypes = {
    classes: shape({
        carouselContainer: string,
        currentImage: string,
        currentImage_placeholder: string,
        imageContainer: string,
        root: string,
        backgroundPlaceholder: string
    }),
    images: arrayOf(
        shape({
            label: string,
            position: number,
            disabled: bool,
            url: string.isRequired
        })
    ).isRequired,
    bgColor: string,
    isConfigurableProduct: bool
};

export default ProductImageCarousel;
