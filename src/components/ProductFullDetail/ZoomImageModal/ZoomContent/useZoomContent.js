import { useRef, useState } from 'react';

const mathOperation = {
    increment: 'increment',
    decrement: 'decrement'
};

export const useZoomContent = ({ mediaGallery }) => {
    const galleryLength = mediaGallery.length;
    const [transformScale, setTransformScale] = useState(1);
    const [currentImage, setCurrentImage] = useState(mediaGallery[0]);
    const [showZoomDescription, setShowZoomDescription] = useState(null);
    const [isDisabledButton, setIsDisabledButton] = useState(false);
    const transformWrapperRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleSetCurrentImage = item => {
        if (currentImage.url === item.url) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowZoomDescription(null);
        transformWrapperRef.current.resetTransform(0);
        setTransformScale(1);
        setCurrentImage(item);
    };

    const getDecimalPart = num => {
        if (Number.isInteger(num)) {
            return 0;
        }

        const decimalStr = num.toString().split('.')[1];
        return Number(decimalStr);
    };

    const handleDisableButtons = value => {
        const decimal = getDecimalPart(value);

        if (decimal > 100) {
            setIsDisabledButton(true);
        } else {
            setIsDisabledButton(false);
        }
    };

    const handleTransformScale = (operation = mathOperation.increment, cb) => {
        if (
            (transformScale === 5 && operation === mathOperation.increment) ||
            (transformScale === 1 && operation === mathOperation.decrement)
        )
            return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const step = transformScale >= 3 ? 1 : transformScale >= 2 ? 0.5 : 0.25;
        setTransformScale(prev =>
            operation === 'decrement' ? prev - step : prev + step
        );

        cb(step);

        if (operation === mathOperation.increment) {
            setShowZoomDescription(true);
        } else {
            setShowZoomDescription(false);
        }

        timeoutRef.current = setTimeout(() => {
            setShowZoomDescription(null);
        }, 1000);
    };

    return {
        galleryLength,
        transformScale,
        handleTransformScale,
        currentImage,
        handleSetCurrentImage,
        showZoomDescription,
        transformWrapperRef,
        handleDisableButtons,
        isDisabledButton
    };
};
