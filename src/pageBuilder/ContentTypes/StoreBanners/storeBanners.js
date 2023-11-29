import { arrayOf, oneOfType, node } from 'prop-types';
import React, { Children } from 'react';

import { usePickupStoreContext } from '@app/context/PickupStore';

/**
 * Custom Page Builder component for store specific banners.
 */
const StoreBanners = ({ children }) => {
    const [{ id: pickupStoreId }] = usePickupStoreContext();

    /*
     * Filter out banner for the current store
     */
    let banner = null;
    Children.forEach(children, child => {
        const stores = child.props.data.storeSpecificBanner.split(',');
        /*
         * Set banner if it is a specific one for the current store.
         * Otherwise, if no banner is set yet, set a default banner
         */
        if (
            stores.includes(`${pickupStoreId}`) ||
            (!banner && stores.includes('default'))
        ) {
            banner = child;
        }
    });

    return <>{banner}</>;
};

StoreBanners.propTypes = {
    children: oneOfType([arrayOf(node), node])
};

export default StoreBanners;
