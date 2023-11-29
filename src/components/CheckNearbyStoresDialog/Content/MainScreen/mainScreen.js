import { arrayOf, func, shape } from 'prop-types';
import React from 'react';

import { IStoreListItem } from '../propTypes';
import FilterBlock from './FilterBlock';
import CheckNearbyStoresPopupList from './List';
import { useMainScreen } from './useMainScreen';

const MainScreen = props => {
    const { listData, onSubmit } = props;

    const {
        sortOptions,
        handleChangeFilter,
        handleReactSelectChangeFilter,
        activeSortMethod
    } = useMainScreen();

    return (
        <>
            <FilterBlock
                sortOptions={sortOptions}
                onChange={handleChangeFilter}
                onChangeReactSelect={handleReactSelectChangeFilter}
            />
            <CheckNearbyStoresPopupList
                listData={listData}
                onSubmit={onSubmit}
                activeSortMethod={activeSortMethod}
            />
        </>
    );
};

MainScreen.propTypes = {
    listData: arrayOf(shape(IStoreListItem)).isRequired,
    onSubmit: func.isRequired
};

export default MainScreen;
