import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';

import {
    getSearchFromState,
    getStateFromSearch,
    sortFiltersArray,
    stripHtml
} from './filterHelpers';
import { useFilterState } from './useFilterState';

export const useFilters = (filters, introspectionData) => {
    const [isApplying, setIsApplying] = useState(false);
    const [
        { modal },
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const [activeFilter, setActiveFilter] = useState('');
    const [filterState, filterApi] = useFilterState();
    const prevDrawer = useRef(null);
    const isOpen = modal.identifier === MODAL_NAMES.filter;

    const history = useHistory();
    const { pathname, search } = useLocation();

    const attributeCodes = useMemo(
        () => filters.map(({ attribute_code }) => attribute_code),
        [filters]
    );

    const isSearchPage = useMemo(() => pathname === '/search', [pathname]);

    // Create a set of disabled filters.
    const DISABLED_FILTERS = useMemo(() => {
        const disabled = new Set();
        // Disable category filtering when not on a search page.
        if (!isSearchPage) {
            disabled.add('category_uid');
        }

        if (isSearchPage) {
            disabled.add('subcategory_id');
        }

        return disabled;
    }, [isSearchPage]);

    // Get "allowed" filters by intersection of filter attribute codes and
    // schema input field types. This restricts the displayed filters to those
    // that the api will understand.
    const possibleFilters = useMemo(() => {
        const nextFilters = new Set();
        const inputFields = introspectionData
            ? introspectionData.__type.inputFields
            : [];

        // perform mapping and filtering in the same cycle
        for (const { name } of inputFields) {
            const isValid = attributeCodes.includes(name);
            const isEnabled = !DISABLED_FILTERS.has(name);

            if (isValid && isEnabled) {
                nextFilters.add(name);
            }
        }

        return nextFilters;
    }, [attributeCodes, introspectionData, DISABLED_FILTERS]);

    // iterate over filters once to set up all the collections we need
    const [filterNames, filterKeys, filterItems] = useMemo(() => {
        const names = new Map();
        const keys = new Set();
        const itemsByGroup = new Map();

        const sortedFilters = sortFiltersArray([...filters]);

        for (const filter of sortedFilters) {
            const { options, label: name, attribute_code: group } = filter;

            // If this aggregation is not a possible filter, just back out.
            if (possibleFilters.has(group)) {
                const items = [];

                // add filter name
                names.set(group, name);

                if (group === 'subcategory_id') {
                    names.delete(group);
                    names.set(group, 'Category');
                }

                if (group === 'stock_info') {
                    names.delete(group);
                    names.set(group, 'Availability');
                }

                // add filter key permutations
                keys.add(`${group}[filter]`);

                // add items
                for (const { count, label, value } of options) {
                    items.push({ count, title: stripHtml(label), value });
                }
                itemsByGroup.set(group, items);
            }
        }

        return [names, keys, itemsByGroup];
    }, [filters, possibleFilters]);

    // on apply, write filter state to location
    useEffect(() => {
        if (isApplying) {
            const nextSearch = getSearchFromState(
                search,
                filterKeys,
                filterState
            );

            // write filter state to history
            history.push({ pathname, search: nextSearch });

            // mark the operation as complete
            setIsApplying(false);
        }
    }, [filterKeys, filterState, history, isApplying, pathname, search]);

    const handleOpen = useCallback(() => {
        toggleModal({
            identifier: MODAL_NAMES.filter
        });
    }, [toggleModal]);

    const handleClose = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    const handleApply = useCallback(() => {
        setIsApplying(true);
        handleClose();
    }, [handleClose]);

    const handleReset = useCallback(() => {
        filterApi.clear();
        setIsApplying(true);
    }, [filterApi, setIsApplying]);

    const handleKeyDownActions = useCallback(
        event => {
            // do not handle keyboard actions when the modal is closed
            if (!isOpen) {
                return;
            }

            switch (event.keyCode) {
                // when "Esc" key fired -> close the modal
                case 27:
                    handleClose();
                    break;
            }
        },
        [isOpen, handleClose]
    );

    const handleBack = useCallback(() => {
        setActiveFilter('');
    }, [setActiveFilter]);

    useEffect(() => {
        const justOpened =
            prevDrawer.current === null &&
            modal.identifier === MODAL_NAMES.filter;
        const justClosed =
            prevDrawer.current === MODAL_NAMES.filter &&
            modal.identifier === null;

        // on drawer toggle, read filter state from location
        if (justOpened || justClosed) {
            const nextState = getStateFromSearch(
                search,
                filterKeys,
                filterItems
            );

            filterApi.setItems(nextState);
        }

        // on drawer close, update the modal visibility state
        if (justClosed) {
            handleClose();
        }

        prevDrawer.current = modal.identifier;
    }, [
        modal.identifier,
        filterApi,
        filterItems,
        filterKeys,
        search,
        handleClose
    ]);

    useEffect(() => {
        const nextState = getStateFromSearch(search, filterKeys, filterItems);

        filterApi.setItems(nextState);
    }, [filterApi, filterItems, filterKeys, search]);

    return {
        filterApi,
        filterItems,
        filterKeys,
        filterNames,
        filterState,
        handleApply,
        handleClose,
        handleKeyDownActions,
        handleOpen,
        handleReset,
        isApplying,
        isOpen,
        activeFilter,
        setActiveFilter,
        handleBack
    };
};
