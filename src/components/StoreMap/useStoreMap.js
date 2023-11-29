import { MarkerClusterer } from '@googlemaps/markerclusterer';
import React, { useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { renderToString } from 'react-dom/server';

import clusterIcon from '/assets/map/cluster.svg';

import { useGoogleMapsContext } from '@app/components/GoogleMaps/googleMapsContext';
import { useBrandContext } from '@app/context/Brand';
import {
    usePickupStoreContext,
    GEO_IP_COOKIES_COORDINATES_KEY,
    GEO_IP_COOKIES_MAX_AGE,
    GEO_IP_COOKIES_PATH
} from '@app/context/PickupStore';
import { useStoreSwitcher } from '@app/hooks/useStoreSwitcher';

import InfoWindow from './InfoWindow';

const getMarkerIcon = color => {
    return (
        <svg
            width="22"
            height="34"
            viewBox="0 0 22 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="10" y="21" width="2" height="13" fill="#1D201F" />
            <circle cx="11" cy="11" r="11" fill={color} />
            <circle cx="11" cy="11" r="3" fill="white" />
        </svg>
    );
};

/**
 * Defines info window content.
 *
 * @params {Object} related to specific location info
 */

const useStoreMap = ({
    mapOptions,
    locations,
    zoomOnInit,
    locateOnInit,
    showInfoWindow,
    infoIsOpened
}) => {
    const [
        { googleMaps, mapRef, userMarkerRef, activeInfoWindowRef }
    ] = useGoogleMapsContext();
    const [currentStore] = usePickupStoreContext();
    const [, { getBrandFromList }] = useBrandContext();
    const { handleStoreSwitch } = useStoreSwitcher();
    const [, setCookie] = useCookies();
    const mapElement = useRef(null);

    useEffect(() => {
        let googleMapsEvent;
        const mapOverlayInstances = [];

        if (
            googleMaps &&
            mapElement.current &&
            !mapRef.current &&
            !!locations.length &&
            !currentStore.isLoading
        ) {
            const googleMap = new googleMaps.Map(
                mapElement.current,
                mapOptions
            );
            mapRef.current = googleMap;
            googleMapsEvent = googleMaps.event;

            const positions = [];
            const markers = [];

            locations.forEach(location => {
                const position = new googleMaps.LatLng(
                    location.latitude,
                    location.longitude
                );
                positions.push(position);
                const { primary_color, logo, name } = getBrandFromList(
                    location?.brand?.uid
                );
                const marker = new googleMaps.Marker({
                    googleMap,
                    position,
                    title: location.name,
                    icon: {
                        url:
                            'data:image/svg+xml;charset=UTF-8,' +
                            encodeURIComponent(
                                renderToString(getMarkerIcon(primary_color))
                            )
                    }
                });
                const infoWindow = new googleMaps.InfoWindow({
                    content: renderToString(
                        <InfoWindow
                            location={location}
                            currentStoreId={currentStore.id}
                            logo={logo}
                            name={name}
                            primaryColor={primary_color}
                        />
                    )
                });

                marker.addListener('click', () => {
                    // close other open info window if present
                    if (!showInfoWindow) return;
                    if (activeInfoWindowRef.current) {
                        activeInfoWindowRef.current.close();
                        activeInfoWindowRef.current = null;
                    }

                    infoWindow.open(googleMap, marker);
                    activeInfoWindowRef.current = infoWindow;
                });

                if (infoIsOpened) {
                    infoWindow.open(googleMap, marker);
                }

                markers.push(marker);

                googleMapsEvent.addListener(infoWindow, 'domready', () => {
                    const infoButton = document.getElementById('makeMyStore');
                    if (infoButton) {
                        googleMapsEvent.addDomListener(
                            infoButton,
                            'click',
                            () => {
                                handleStoreSwitch(
                                    infoButton.dataset.storeId,
                                    infoButton.dataset.brandId
                                );
                            }
                        );
                    }
                });

                mapOverlayInstances.push(marker);
                mapOverlayInstances.push(infoWindow);
            });

            // Set the bounds of the map to the perimeter of the furthest locations in either direction
            const boundsFurthestLocations = extendedBoundLatLng => {
                const latitudeLongitudeBounds = new googleMaps.LatLngBounds();
                positions.forEach(position => {
                    latitudeLongitudeBounds.extend(position);
                });
                if (extendedBoundLatLng) {
                    latitudeLongitudeBounds.extend(extendedBoundLatLng);
                }
                googleMap.fitBounds(latitudeLongitudeBounds);
            };

            // Create a new customer marked on map based on position
            const createCustomerMarker = (lat, lng) => {
                const customerLatLng = new googleMaps.LatLng(lat, lng);
                if (
                    customerLatLng.lat() !== currentStore.latitude &&
                    customerLatLng.lng() !== currentStore.longitude
                ) {
                    // hide the previous marker
                    if (userMarkerRef.current)
                        userMarkerRef.current.visible = false;

                    // create a new marker
                    userMarkerRef.current = new googleMaps.Marker({
                        map: googleMap,
                        position: customerLatLng
                    });
                }
                return customerLatLng;
            };

            if (zoomOnInit) {
                // Render customer location marker based on the location
                if (locateOnInit) {
                    const customerLatLng = createCustomerMarker(
                        currentStore.userLocation.latitude,
                        currentStore.userLocation.longitude
                    );
                    boundsFurthestLocations(customerLatLng);

                    // If the location is not available -> try to get the position from navigator and update geo ip cookies
                    if (
                        currentStore.userLocation.latitude === 0 &&
                        currentStore.userLocation.longitude === 0
                    ) {
                        navigator.geolocation.getCurrentPosition(position => {
                            const customerLatLng = createCustomerMarker(
                                position.coords.latitude,
                                position.coords.longitude
                            );
                            boundsFurthestLocations(customerLatLng);
                            setCookie(
                                GEO_IP_COOKIES_COORDINATES_KEY,
                                `${position.coords.latitude},${
                                    position.coords.longitude
                                }`,
                                {
                                    maxAge: GEO_IP_COOKIES_MAX_AGE,
                                    path: GEO_IP_COOKIES_PATH
                                }
                            );
                        });
                    }
                } else {
                    // If no need to locate the customer's location -> zoom into store marker
                    googleMap.setCenter(
                        new googleMaps.LatLng(
                            locations[0].latitude,
                            locations[0].longitude
                        )
                    );
                    googleMap.setZoom(locations[0].zoom_level || 16);
                }
            } else if (positions.length > 1) {
                boundsFurthestLocations();
            }

            const renderer = {
                render({ count, position }) {
                    return new googleMaps.Marker({
                        label: {
                            text: String(count),
                            color: 'white',
                            fontSize: '14px'
                        },
                        position,
                        icon: clusterIcon
                    });
                }
            };

            new MarkerClusterer({ markers, map: googleMap, renderer });
        }
    }, [
        currentStore,
        googleMaps,
        handleStoreSwitch,
        locateOnInit,
        locations,
        mapOptions,
        mapRef,
        userMarkerRef,
        activeInfoWindowRef,
        zoomOnInit,
        getBrandFromList,
        showInfoWindow,
        setCookie,
        infoIsOpened
    ]);

    return {
        mapElement
    };
};

export default useStoreMap;
