import { func, node, string, bool, any } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './imageZoom.module.css';

const ImageZoom = ({
    lensRef,
    moveLens,
    lensSize,
    zooming,
    children,
    setZooming,
    onLensClick,
    ...props
}) => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <>
            <div
                ref={lensRef}
                id="lens"
                className={
                    zooming ? classes.zoomLensActive : classes.zoomLensHidden
                }
                onMouseMove={e => {
                    moveLens(e);
                    setZooming(true);
                }}
                onMouseEnter={() => setZooming(true)}
                onMouseLeave={() => setZooming(false)}
                style={{
                    width: zooming ? lensSize : '100%',
                    height: zooming ? lensSize : '100%'
                }}
                onClick={onLensClick}
                role="button"
                onKeyDown={() => undefined}
                tabIndex={0}
            />
            {children}
        </>
    );
};

ImageZoom.propTypes = {
    lensRef: any,
    moveLens: func.isRequired,
    children: node,
    lensSize: string.isRequired,
    setZooming: func,
    zooming: bool,
    onLensClick: func,
    classes: string
};

export default ImageZoom;
