import { number, shape, string } from 'prop-types';
import React from 'react';

import classes from './infoWindow.module.css';

/**
 * Renders a map element with markers, marker cluster, and info windows.
 * Always 100% of parent width and height
 */
const InfoWindow = ({ location, currentStoreId, logo, name, primaryColor }) => {
    const { id, brand, city, region_code: state, address } = location || {};
    const brandUid = brand?.uid;
    const href = `/stores/${location.url_key}`;

    return (
        <div className={classes.root}>
            <div className={classes.imageContainer}>
                <img src={logo} alt={name} className={classes.image} />
            </div>
            <div className={classes.info}>
                <div className={classes.name}>
                    {city}, {state}
                </div>
                <div className={classes.address}>
                    {address}, {city}, {state}
                </div>
            </div>
            <a
                href={href}
                className={classes.link}
                style={{ color: primaryColor }}
                onClick={() => {
                    // EventingContext not available on InfoWindow
                    (globalThis.dataLayer || []).push({
                        event: 'storeFinderDetails'
                    });
                }}
            >
                Store Details
            </a>
            {id !== currentStoreId && (
                <button
                    id="makeMyStore"
                    data-store-id={id}
                    data-brand-id={brandUid}
                    className={classes.button}
                    style={{ backgroundColor: primaryColor }}
                    onClick={() => {
                        // EventingContext not available on InfoWindow
                        (globalThis.dataLayer || []).push({
                            event: 'storeFinderMakeMyStore'
                        });
                    }}
                >
                    Make My Store
                </button>
            )}
        </div>
    );
};

InfoWindow.propTypes = {
    location: shape({
        id: number,
        brand: shape({
            id: number
        }),
        city: string,
        region_code: string,
        address: string,
        url_key: string
    }),
    currentStoreId: number,
    logo: string,
    name: string,
    primaryColor: string
};

export default InfoWindow;
