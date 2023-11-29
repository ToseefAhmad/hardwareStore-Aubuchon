import { arrayOf, func, shape, string } from 'prop-types';
import React from 'react';

import { IStoreListItem } from '../../propTypes';

import { useGoogleMapsContext } from '@app/components/GoogleMaps';
import { useStoresList } from '@app/hooks/useStoresList';

import classes from './list.module.css';
import CheckNearbyStoresPopupListItem from './ListItem';

const CheckNearbyStoresPopupList = props => {
    const { listData, onSubmit, activeSortMethod } = props;

    const [{ currentLocation }] = useGoogleMapsContext();
    const { listRef, anchorRef, visibleItemsData } = useStoresList({
        storeList: listData,
        mapLocation: currentLocation,
        onScroll: () => {},
        activeSortMethod
    });

    return (
        <ul className={classes.root} ref={listRef}>
            {visibleItemsData.map(itemData => (
                <CheckNearbyStoresPopupListItem
                    {...itemData}
                    onSubmit={onSubmit}
                    key={itemData.store.id}
                />
            ))}
            <span ref={anchorRef} />
        </ul>
    );
};

CheckNearbyStoresPopupList.propTypes = {
    listData: arrayOf(shape(IStoreListItem)).isRequired,
    onSubmit: func.isRequired,
    activeSortMethod: string.isRequired
};

export default CheckNearbyStoresPopupList;
