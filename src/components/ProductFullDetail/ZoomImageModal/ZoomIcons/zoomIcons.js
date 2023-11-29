import { bool, func, number } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { ZoomIn, ZoomOut } from '@app/components/Icons';

import classes from './zoomIcons.module.css';

const ZoomIcons = ({
    transformScale,
    handleTransformScale,
    showZoomDescription,
    zoomIn,
    zoomOut,
    isDisabledButton
}) => {
    return (
        <div className={classes.zoomIconsWrapper}>
            <div className={classes.zoomWraper}>
                <span
                    className={
                        showZoomDescription
                            ? classes.zoomDescriptionActive
                            : classes.zoomDescription
                    }
                >
                    {transformScale * 100}% zoom
                </span>
                <button
                    className={classes.zoomIconInWrapper}
                    onClick={() => {
                        handleTransformScale('increment', zoomIn);
                    }}
                    disabled={isDisabledButton}
                >
                    <Icon src={ZoomIn} />
                </button>
            </div>
            <div className={classes.zoomWraper}>
                <span
                    className={
                        showZoomDescription === false
                            ? classes.zoomDescriptionActive
                            : classes.zoomDescription
                    }
                >
                    {transformScale * 100}% zoom
                </span>
                <button
                    className={classes.zoomIconOutWrapper}
                    onClick={() => {
                        handleTransformScale('decrement', zoomOut);
                    }}
                    disabled={isDisabledButton}
                >
                    <Icon src={ZoomOut} />
                </button>
            </div>
        </div>
    );
};

ZoomIcons.propTypes = {
    handleTransformScale: func,
    zoomIn: func,
    zoomOut: func,
    showZoomDescription: bool,
    transformScale: number,
    isDisabledButton: bool
};

export default ZoomIcons;
