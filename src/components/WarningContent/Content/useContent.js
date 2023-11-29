import { useCallback, useMemo } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { useGoogleMapsContext } from '@app/components/GoogleMaps';
import { usePickupStoreContext } from '@app/context/PickupStore';
import { useStoreSwitcher } from '@app/hooks/useStoreSwitcher';

export const useContent = ({ handleAddToCart, onCancel }) => {
    const [
        {
            brand,
            city,
            region_code,
            schedule,
            specialDays,
            latitude,
            longitude,
            userLocation
        }
    ] = usePickupStoreContext();
    const [{ googleMaps }] = useGoogleMapsContext();
    const [
        { modal },
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const { switchStore } = useStoreSwitcher();

    const { pickupStoreId, brandUid } = modal?.props?.pickupStoreId
        ? modal?.props
        : {};

    const handleCancel = useCallback(() => {
        if (onCancel) {
            onCancel();
            return;
        }

        toggleModal();
    }, [onCancel, toggleModal]);

    const handleSubmit = useCallback(() => {
        if (handleAddToCart) {
            handleAddToCart();
            return;
        }

        switchStore(pickupStoreId, brandUid);
        toggleModal();
    }, [brandUid, pickupStoreId, switchStore, toggleModal, handleAddToCart]);

    const distance = useMemo(() => {
        if (userLocation) {
            const destination = new googleMaps.LatLng(latitude, longitude);
            const origin = new googleMaps.LatLng(
                userLocation.latitude,
                userLocation.longitude
            );

            const computedDistance = googleMaps.geometry.spherical.computeDistanceBetween(
                origin,
                destination
            );

            return Math.round(computedDistance * 0.000621371);
        }
    }, [
        googleMaps.LatLng,
        googleMaps.geometry.spherical,
        latitude,
        longitude,
        userLocation
    ]);

    return {
        data: {
            distance,
            brand,
            region_code,
            schedule,
            specialDays,
            city
        },
        handleSubmit,
        handleCancel
    };
};
