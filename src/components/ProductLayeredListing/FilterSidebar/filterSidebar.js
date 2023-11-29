import { bool, number } from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import AvailabilityFilter from '../Filter/AvailabilityFilter';
import { useProductLayeredListingContext } from '../ProductLayeredListingContext';
import FilterBlock from './filterBlock';
import classes from './filterSidebar.module.css';

const FilterSidebar = ({ isLoading, filterCountToOpen }) => {
    const {
        handleApply,
        filterApi,
        filterState,
        filterNames,
        filterItems
    } = useProductLayeredListingContext();

    const handleApplyFilter = useCallback(
        (...args) => {
            handleApply(...args);
        },
        [handleApply]
    );

    const availabilityFilter = useMemo(() => {
        const stockAggregation =
            !isLoading &&
            Array.from(filterItems).find(([group]) => group === 'stock_info');
        return (
            <li
                className={classes.listItem}
                aria-label={`Filter products by Availability`}
            >
                <AvailabilityFilter
                    filterProps={
                        stockAggregation
                            ? {
                                  filterApi,
                                  filterState: filterState.get(
                                      stockAggregation[0]
                                  ),
                                  group: stockAggregation[0],
                                  items: stockAggregation[1],
                                  name: filterNames.get(stockAggregation[0]),
                                  onApply: handleApplyFilter
                              }
                            : undefined
                    }
                />
                {isLoading && (
                    <Shimmer
                        width="95%"
                        height="70vh"
                        style={{ marginBottom: 25 }}
                    />
                )}
            </li>
        );
    }, [
        filterApi,
        filterItems,
        filterNames,
        filterState,
        handleApplyFilter,
        isLoading
    ]);

    const filtersList = useMemo(
        () =>
            Array.from(filterItems, ([group, items], iteration) => {
                const blockState = filterState.get(group);
                const groupName = filterNames.get(group);

                if (group === 'stock_info') {
                    return null;
                }

                return (
                    <FilterBlock
                        key={group}
                        filterApi={filterApi}
                        filterState={blockState}
                        group={group}
                        items={items}
                        name={groupName}
                        onApply={handleApplyFilter}
                        initialOpen={iteration < filterCountToOpen}
                    />
                );
            }),
        [
            filterApi,
            filterItems,
            filterNames,
            filterState,
            filterCountToOpen,
            handleApplyFilter
        ]
    );

    return (
        <aside className={classes.root} aria-label="Filter sidebar">
            <div>
                <ul>
                    {availabilityFilter}
                    {filtersList}
                </ul>
            </div>
        </aside>
    );
};

FilterSidebar.propTypes = {
    isLoading: bool,
    filterCountToOpen: number
};

FilterSidebar.defaultProps = {
    isLoading: false,
    filterCountToOpen: 5
};

export default FilterSidebar;
