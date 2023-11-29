import classnames from 'classnames';
import { array, bool } from 'prop-types';
import React from 'react';

import mapStyles from './mapStyles';
import classes from './storeMap.module.css';
import useStoreMap from './useStoreMap';

/**
 * Renders a map element with markers, marker cluster, and info windows.
 * Always 100% of parent width and height
 */
const StoreMap = ({
    locations,
    zoomOnInit,
    locateOnInit,
    cssClasses,
    isFullBleed,
    showInfoWindow,
    infoIsOpened,
    ...mapOptions
}) => {
    const { mapElement } = useStoreMap({
        mapOptions,
        locations,
        zoomOnInit,
        locateOnInit,
        showInfoWindow,
        infoIsOpened
    });

    return (
        <div
            ref={mapElement}
            id="map"
            className={classnames(classes.root, cssClasses, {
                [classes.fullBleed]: isFullBleed
            })}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex="0"
        />
    );
};

StoreMap.propTypes = {
    locations: array,
    zoomOnInit: bool,
    locateOnInit: bool,
    cssClasses: array,
    // Google Map options below.
    styles: array,
    disableDefaultUI: bool,
    zoomControl: bool,
    draggable: bool,
    clickableIcons: bool,
    isFullBleed: bool,
    showInfoWindow: bool,
    infoIsOpened: bool
};

StoreMap.defaultProps = {
    locations: [],
    zoomOnInit: true,
    locateOnInit: false,
    cssClasses: [],
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    draggable: true,
    clickableIcons: false,
    isFullBleed: false,
    showInfoWindow: true,
    infoIsOpened: false
};

export default StoreMap;
