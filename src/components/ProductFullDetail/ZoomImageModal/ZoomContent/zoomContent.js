import { array, func, string } from 'prop-types';
import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import Icon from '@app/components/Icon';
import { Close } from '@app/components/Icons';
import Thumbnail from '@app/components/ProductImageCarousel/thumbnail';
import { SnapSlider } from '@app/components/ReactSnapSlider';

import ZoomIcons from '../ZoomIcons';
import { useZoomContent } from './useZoomContent';
import classes from './zoomContent.module.css';

const ZoomContent = ({ handleCloseModal, productName, mediaGallery }) => {
    const {
        galleryLength,
        transformScale,
        handleTransformScale,
        currentImage,
        handleSetCurrentImage,
        handleDisableButtons,
        showZoomDescription,
        isDisabledButton,
        transformWrapperRef
    } = useZoomContent({ mediaGallery });

    const thumbnail = (
        <div className={classes.thumbnailList}>
            {mediaGallery.map((item, index) => (
                <Thumbnail
                    key={item.url}
                    item={{
                        url: item.url,
                        label: `thumbnail image ${index + 1}`
                    }}
                    itemIndex={index}
                    isActive={item.url === currentImage.url}
                    onClickHandler={() => handleSetCurrentImage(item)}
                    classes={{
                        rootSelected: classes.thumbnaiSelected,
                        root: classes.thumbnaiSelectedRoot
                    }}
                    displayOnMobile
                />
            ))}
        </div>
    );

    const slider = (
        <SnapSlider
            slidesGap={20}
            threshold={0.2}
            arrowClasses={{
                root: classes.sliderArrows,
                left: classes.sliderArrowLeft,
                right: classes.sliderArrowRight
            }}
            carouselClasses={{
                root: classes.sliderRoot
            }}
        >
            {mediaGallery.map((item, index) => (
                <div
                    key={index}
                    className={
                        item.url === currentImage.url
                            ? classes.activeImageSlider
                            : classes.imageSlider
                    }
                    onClick={() => handleSetCurrentImage(item)}
                    role="button"
                    tabIndex={0}
                    onKeyUp={() => handleSetCurrentImage(item)}
                >
                    <img
                        alt={item.label}
                        src={item.url}
                        className={classes.sliderImage}
                    />
                </div>
            ))}
        </SnapSlider>
    );

    return (
        <div className={classes.modalWrapper}>
            <div className={classes.zoomTop}>
                <h4 className={classes.title}>{productName}</h4>
                <div className={classes.closeIcon}>
                    <Icon src={Close} onClick={handleCloseModal} />
                </div>
            </div>
            <div>
                <div className={classes.zoomWraper}>
                    <TransformWrapper
                        initialScale={1}
                        maxScale={5}
                        centerZoomedOut
                        doubleClick={{
                            disabled: true
                        }}
                        onTransformed={(e, state) => {
                            handleDisableButtons(state.scale);
                        }}
                        ref={transformWrapperRef}
                    >
                        {({ zoomIn, zoomOut }) => (
                            <>
                                <div className="tools">
                                    <ZoomIcons
                                        showZoomDescription={
                                            showZoomDescription
                                        }
                                        handleTransformScale={
                                            handleTransformScale
                                        }
                                        transformScale={transformScale}
                                        zoomIn={zoomIn}
                                        zoomOut={zoomOut}
                                        isDisabledButton={isDisabledButton}
                                    />
                                </div>
                                <TransformComponent
                                    wrapperClass={classes.imageWrapperZoom}
                                >
                                    <img
                                        src={currentImage.url}
                                        alt={currentImage.label}
                                    />
                                </TransformComponent>
                            </>
                        )}
                    </TransformWrapper>
                </div>
                {galleryLength === 1
                    ? null
                    : galleryLength < 5
                    ? thumbnail
                    : slider}
            </div>
        </div>
    );
};

ZoomContent.propTypes = {
    handleCloseModal: func,
    productName: string,
    mediaGallery: array
};

export default ZoomContent;
