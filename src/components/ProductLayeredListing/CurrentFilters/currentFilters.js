import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import ClearFiltersButton from '@app/components/ProductLayeredListing/ClearFiltersButton';

import { useProductLayeredListingContext } from '../ProductLayeredListingContext';
import CurrentFilter from './currentFilter';
import classes from './currentFilters.module.css';

const CurrentFilters = () => {
    const {
        filterApi,
        filterState,
        filterNames,
        handleApply
    } = useProductLayeredListingContext();

    const onRemove = useCallback(
        (...args) => {
            handleApply(...args);
        },
        [handleApply]
    );

    const { removeItem } = filterApi;

    const { formatMessage } = useIntl();

    // create elements and params at the same time for efficiency
    const filterElements = useMemo(() => {
        const elements = [];
        for (const [group, items] of filterState) {
            const groupName = filterNames.get(group);

            for (const item of items) {
                if (item.value !== 'in-stock-items') {
                    const { title, value } = item || {};
                    const key = `${group}::${title}_${value}`;

                    elements.push(
                        <li key={key}>
                            <CurrentFilter
                                group={group}
                                item={item}
                                name={groupName}
                                removeItem={removeItem}
                                onRemove={onRemove}
                            />
                        </li>
                    );
                }
            }
        }

        return elements;
    }, [filterNames, filterState, removeItem, onRemove]);

    const currentFiltersAriaLabel = formatMessage({
        id: 'filterModal.currentFilters.ariaLabel',
        defaultMessage: 'Current Filters'
    });

    return (
        <ul className={classes.root} aria-label={currentFiltersAriaLabel}>
            {filterElements}
            <ClearFiltersButton />
        </ul>
    );
};

export default CurrentFilters;
