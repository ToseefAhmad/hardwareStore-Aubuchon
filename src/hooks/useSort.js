import { useState } from 'react';

const defaultSort = {
    CATEGORY: {
        sortText: 'Best Sellers',
        sortId: 'sortItem.popularity',
        sortAttribute: 'popularity',
        sortDirection: 'ASC'
    },
    SEARCH: {
        sortText: 'Relevance',
        sortId: 'sortItem.relevance',
        sortAttribute: 'relevance',
        sortDirection: 'DESC'
    }
};

/**
 *
 * @param props
 * @returns {[{sortDirection: string, sortAttribute: string, sortText: string}, React.Dispatch<React.SetStateAction<{sortDirection: string, sortAttribute: string, sortText: string}>>]}
 */
export const useSort = (props = {}) => {
    let defaultSortMethod = defaultSort.CATEGORY;
    if (props.sortFromSearch === true) {
        defaultSortMethod = defaultSort.SEARCH;
    }
    return useState(() => Object.assign({}, defaultSortMethod, props));
};
