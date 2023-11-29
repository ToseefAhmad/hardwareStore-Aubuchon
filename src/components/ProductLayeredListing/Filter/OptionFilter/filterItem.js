import { func, number, oneOfType, shape, string } from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import setValidator from '@magento/peregrine/lib/validators/set';

import FilterDefault from './filterDefault';

const FilterItem = ({ filterApi, filterState, group, item, onApply }) => {
    const { toggleItem } = filterApi;
    const { title, value, count } = item;
    const isSelected =
        filterState &&
        Array.from(filterState).some(item => item.value === value);

    const tileItem = useMemo(
        () => ({
            count: count,
            label: title,
            value_index: value
        }),
        [count, title, value]
    );

    const handleClick = useCallback(
        e => {
            if (e.button !== 0) return;

            toggleItem({ group, item });

            if (typeof onApply === 'function') {
                onApply(group, item);
            }
        },
        [group, item, toggleItem, onApply]
    );

    const handleKeyDown = useCallback(
        e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleItem({ group, item });

                if (typeof onApply === 'function') {
                    onApply(group, item);
                }
            }
        },
        [group, item, onApply, toggleItem]
    );

    return (
        <FilterDefault
            isSelected={isSelected}
            item={tileItem}
            onMouseDown={handleClick}
            onKeyDown={handleKeyDown}
            title={title}
            value={value}
            group={group}
        />
    );
};

FilterItem.propTypes = {
    filterApi: shape({
        toggleItem: func.isRequired
    }).isRequired,
    filterState: setValidator,
    group: string.isRequired,
    item: shape({
        count: number,
        title: string.isRequired,
        value: oneOfType([number, string]).isRequired
    }).isRequired,
    onApply: func
};

export default FilterItem;
