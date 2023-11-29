import { useState } from 'react';

const SORT_METHODS = {
    none: 'none',
    distance: 'distance',
    numberInStock: 'numberInStock'
};

const SORT_OPTIONS = [
    {
        label: 'Distance',
        value: SORT_METHODS.distance
    },
    {
        label: 'Number in stock',
        value: SORT_METHODS.numberInStock
    }
];

export const useMainScreen = () => {
    const [activeSortMethod, setActiveSortMethod] = useState(SORT_METHODS.none);

    const handleReactSelectChangeFilter = value => {
        setActiveSortMethod(value);
    };

    const handleInformedChangeFilter = e => {
        setActiveSortMethod(e.target.value);
    };

    return {
        sortOptions: SORT_OPTIONS,
        handleChangeFilter: handleInformedChangeFilter,
        handleReactSelectChangeFilter,
        activeSortMethod
    };
};
