import { object, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './imageZoom.module.css';

const ResultZoom = ({ mainImageRef, titleRef, resultRef, ...props }) => {
    const classes = useStyle(defaultClasses, props.classes);

    // make a width a little more, so that edge of green button isn't visible
    const width = titleRef.current?.clientWidth + 1;
    return (
        <div
            style={{
                height: `${mainImageRef.current?.clientHeight}px`,
                width: `${width}px`
            }}
            ref={resultRef}
            id="zoomResult"
            className={classes.zoomResult}
        />
    );
};

ResultZoom.propTypes = {
    resultRef: object.isRequired,
    classes: string,
    mainImageRef: shape({ current: object }),
    titleRef: shape({ current: object })
};

export default ResultZoom;
