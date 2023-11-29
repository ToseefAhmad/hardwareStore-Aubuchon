import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useEventListener } from '@magento/peregrine';

import { useGoogleMapsContext } from '@app/components/GoogleMaps';
import { usePickupStoreContext } from '@app/context/PickupStore';
import { useStoreSwitcher } from '@app/hooks/useStoreSwitcher';

const ITEMS_PER_PAGE = 8;

export const useStoresList = ({
    storeList,
    onScroll,
    outerAnchorRef,
    outerListRef,
    activeSortMethod
}) => {
    const [
        { id: currentStoreId, isLoading, getPickupStoreError }
    ] = usePickupStoreContext();
    const { handleStoreSwitch: switchPickupStore } = useStoreSwitcher();
    const [{ googleMaps, currentLocation }] = useGoogleMapsContext();

    const listRef = useRef(null);
    const anchorRef = useRef(null);
    const currentAnchorRef = outerAnchorRef?.current || anchorRef.current;
    const observer = useRef(null);
    const currentListRef = outerListRef?.current || listRef.current;
    const listLength = useRef(0);
    const visibleListLength = useRef(0);
    const [visibleItemsData, setVisibleItemsData] = useState([]);
    const [visibleItemsCount, setVisibleItemsCount] = useState(ITEMS_PER_PAGE);

    const currentStoreDataIsLoaded = useMemo(
        () => !!currentStoreId && !isLoading && !getPickupStoreError,
        [currentStoreId, isLoading, getPickupStoreError]
    );

    useEffect(() => {
        if (!currentStoreDataIsLoaded || !storeList.length) {
            return;
        }

        const calculatedStoreList = storeList.map(store => {
            // Calculate distance to the store
            if (
                googleMaps &&
                (currentLocation?.latitude !== 0 &&
                    currentLocation?.longitude !== 0)
            ) {
                const destination = new googleMaps.LatLng(
                    store.latitude || store?.store?.latitude,
                    store.longitude || store?.store?.longitude
                );
                const origin = new googleMaps.LatLng(
                    currentLocation.latitude,
                    currentLocation.longitude
                );

                const computedDistance = googleMaps.geometry.spherical.computeDistanceBetween(
                    origin,
                    destination
                );

                return {
                    ...store,
                    distance: Math.round(computedDistance * 0.000621371)
                };
            }

            return {
                ...store
            };
        });

        if (googleMaps) {
            if (activeSortMethod === 'numberInStock') {
                calculatedStoreList.sort((a, b) => {
                    const aQty = a?.product?.pickup_store_inventory?.qty;
                    const bQty = b?.product?.pickup_store_inventory?.qty;

                    if (bQty !== aQty) {
                        return bQty - aQty;
                    } else {
                        return a.distance - b.distance;
                    }
                });
            } else {
                calculatedStoreList.sort((a, b) => a.distance - b.distance);
            }
        }

        // Move current store at the top of the list
        calculatedStoreList.sort((a, b) =>
            a.id === currentStoreId ? -1 : b.id === currentStoreId ? 1 : 0
        );

        listLength.current = calculatedStoreList.length;
        setVisibleItemsData(calculatedStoreList.slice(0, visibleItemsCount));
    }, [
        activeSortMethod,
        currentLocation.latitude,
        currentLocation.longitude,
        currentStoreDataIsLoaded,
        currentStoreId,
        googleMaps,
        storeList,
        visibleItemsCount
    ]);

    useEffect(() => {
        visibleListLength.current = visibleItemsData.length;
    }, [visibleItemsData.length]);

    useEffect(() => {
        const callback = ([anchorEntry], obs) => {
            if (!anchorEntry.isIntersecting) return;

            if (visibleListLength.current < listLength.current) {
                setVisibleItemsCount(prevState => prevState + ITEMS_PER_PAGE);
            } else {
                obs.disconnect();
            }
        };
        const options = {
            root: currentListRef,
            rootMargin: '25px',
            threshold: 0
        };

        const observer = new IntersectionObserver(callback, options);
        currentAnchorRef && observer.observe(currentAnchorRef);

        return () => observer.disconnect();
    }, [currentAnchorRef, visibleItemsData.length, currentListRef]);

    const lastChildrenRef = useCallback(
        node => {
            if (!node) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(
                ([anchorEntry], obs) => {
                    if (!anchorEntry.isIntersecting) return;
                    if (visibleListLength.current < listLength.current) {
                        setVisibleItemsCount(
                            prevState => prevState + ITEMS_PER_PAGE
                        );
                    } else {
                        obs.disconnect();
                    }
                },
                {
                    root: currentListRef,
                    rootMargin: '35px',
                    threshold: 0
                }
            );
            observer.current.observe(node);
        },
        [currentListRef]
    );

    useEventListener(currentListRef, 'scroll', () => {
        if (!onScroll) return;

        onScroll();
    });

    return {
        listRef,
        anchorRef,
        currentStoreId,
        visibleItemsData,
        switchPickupStore,
        lastChildrenRef
    };
};
