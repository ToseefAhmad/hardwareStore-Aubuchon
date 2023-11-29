import { node } from 'prop-types';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';

import { usePickupStoreContext } from '@app/context/PickupStore';

const GoogleMapsContext = createContext();

export const GoogleMapsContextProvider = ({ children }) => {
    const [{ userLocation }] = usePickupStoreContext();

    const googleMaps = globalThis?.google?.maps;
    const mapRef = useRef();
    const geocodeRef = useRef();
    const userMarkerRef = useRef();
    const activeInfoWindowRef = useRef();

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0
    });

    const runGeocode = useCallback(
        (params, callback) => {
            if (!geocodeRef.current) {
                geocodeRef.current = new googleMaps.Geocoder();
            }

            if (activeInfoWindowRef.current) {
                activeInfoWindowRef.current.close();
                activeInfoWindowRef.current = null;
            }

            geocodeRef.current.geocode(params, (results, status) => {
                if (status === googleMaps.GeocoderStatus.OK) {
                    callback(results);
                } else {
                    // eslint-disable-next-line no-warning-comments
                    // TODO Toast message based on 'status'
                }
            });
        },
        [googleMaps]
    );

    useEffect(() => {
        if (userLocation.longitude && userLocation.latitude) {
            setCurrentLocation({
                latitude: Number(userLocation.latitude),
                longitude: Number(userLocation.longitude)
            });
        }
    }, [userLocation.latitude, userLocation.longitude]);

    const contextValue = [
        {
            googleMaps,
            mapRef,
            currentLocation,
            userMarkerRef,
            activeInfoWindowRef
        },
        { setCurrentLocation, runGeocode }
    ];

    return (
        <GoogleMapsContext.Provider value={contextValue}>
            {children}
        </GoogleMapsContext.Provider>
    );
};

GoogleMapsContextProvider.propTypes = {
    children: node.isRequired
};

/**
 * @typedef {Object} Location
 *
 * @property {number} latitude Location latitude
 * @property {number} longitude Location longitude
 */

/**
 * @typedef {Object} GoogleMapsSate
 *
 * @property {Object} googleMaps
 * @property {Object} mapRef
 * @property {Object} currentLocation
 * @property {Object} userMarkerRef
 * @property {Object} activeInfoWindowRef
 */

/**
 * @typedef {Object} GoogleMapsActions
 * @property {function} setCurrentLocation
 * @property {function} runGeocode
 *
 */

/**
 * @returns [GoogleMapsSate, GoogleMapsActions]
 */
export const useGoogleMapsContext = () => useContext(GoogleMapsContext);
