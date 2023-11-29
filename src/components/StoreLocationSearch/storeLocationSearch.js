import { Form } from 'informed';
import { shape, string, bool } from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

import { useStyle } from '@magento/venia-ui/lib/classify';

import { useGoogleMapsContext } from '@app/components/GoogleMaps/googleMapsContext';
import Icon from '@app/components/Icon';
import { Search, Target } from '@app/components/Icons';
import {
    GEO_IP_COOKIES_COORDINATES_KEY,
    GEO_IP_COOKIES_MAX_AGE,
    GEO_IP_COOKIES_PATH
} from '@app/context/PickupStore';

import defaultClasses from './storeLocationSearch.module.css';

const StoreLocationSearch = ({ classes: propClasses, isPopup = false }) => {
    const [
        { googleMaps, mapRef, currentLocation, userMarkerRef },
        { setCurrentLocation, runGeocode }
    ] = useGoogleMapsContext();

    const classes = useStyle(defaultClasses, propClasses);
    const [, setCookie] = useCookies();

    const searchInputRef = useRef(null);

    const handleGeocode = useCallback(
        results => {
            if (mapRef.current) {
                if (userMarkerRef.current) {
                    userMarkerRef.current.setMap(null);
                }

                userMarkerRef.current = new googleMaps.Marker({
                    map: mapRef.current,
                    position: results[0].geometry.location
                });

                mapRef.current.setZoom(11);
                mapRef.current.setCenter(results[0].geometry.location);
            }

            const { lat, lng } = results[0].geometry?.location || {};
            setCurrentLocation({
                latitude: Number(lat()),
                longitude: Number(lng())
            });
        },
        [googleMaps, mapRef, setCurrentLocation, userMarkerRef]
    );

    const handleAddressSearch = useCallback(
        address => {
            if (googleMaps && address) {
                runGeocode({ address }, handleGeocode);
            }
        },
        [googleMaps, handleGeocode, runGeocode]
    );

    const handleSortByGeolocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setCookie(
                GEO_IP_COOKIES_COORDINATES_KEY,
                `${position.coords.latitude},${position.coords.longitude}`,
                {
                    maxAge: GEO_IP_COOKIES_MAX_AGE,
                    path: GEO_IP_COOKIES_PATH
                }
            );
            const latLng = new googleMaps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );
            runGeocode({ latLng }, handleGeocode);
        });
    }, [googleMaps.LatLng, handleGeocode, runGeocode, setCookie]);

    useEffect(() => {
        const searchInput = searchInputRef.current;
        const googleMapsEvent = googleMaps.event;

        const options = {
            componentRestrictions: { country: ['us', 'ca'] },
            fields: ['name']
        };

        const autocomplete = new googleMaps.places.Autocomplete(
            searchInput,
            options
        );

        googleMapsEvent.addListener(autocomplete, 'place_changed', () => {
            const address = autocomplete.getPlace().name;
            runGeocode({ address }, handleGeocode);
        });

        return () => {
            if (!googleMapsEvent) {
                return;
            }

            googleMapsEvent.clearListeners(searchInput, 'place_changed');
        };
    }, [googleMaps, handleGeocode, runGeocode]);

    useEffect(() => {
        // in case of no location when opening popup, ask for it
        if (
            currentLocation?.latitude === 0 &&
            currentLocation?.longitude === 0 &&
            isPopup
        ) {
            handleSortByGeolocation();
        }
    }, [currentLocation, handleSortByGeolocation, isPopup]);

    return (
        <Form className={classes.root}>
            <div className={classes.searchField}>
                <input
                    name="addressAutocomplete"
                    ref={searchInputRef}
                    placeholder="Search for store in your area"
                    className={classes.searchInput}
                />
                <div
                    aria-label="Search button"
                    className={classes.searchButton}
                    tabIndex="0"
                    onKeyDown={() =>
                        handleAddressSearch(searchInputRef.current.value)
                    }
                    role="button"
                    onClick={() =>
                        handleAddressSearch(searchInputRef.current.value)
                    }
                >
                    <Icon src={Search} />
                </div>
            </div>
            <span
                className={classes.button}
                aria-label="Locate address button"
                role="button"
            >
                <Icon src={Target} onClick={handleSortByGeolocation} />
            </span>
        </Form>
    );
};

StoreLocationSearch.propTypes = {
    classes: shape({
        root: string,
        searchButton: string,
        searchInput: string
    }),
    isPopup: bool
};

export default StoreLocationSearch;
