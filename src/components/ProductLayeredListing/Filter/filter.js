import React, { useMemo } from 'react';

import AvailabilityFilter from './AvailabilityFilter';
import { filterPropTypes } from './filterPropTypes';
import OptionFilter from './OptionFilter';
import PriceFilter from './PriceFilter';

const Filter = ({ filterApi, filterState, group, items, onApply }) => {
    const filter = useMemo(() => {
        let content;
        switch (group) {
            case 'stock_info': {
                content = (
                    <AvailabilityFilter
                        filterProps={{
                            filterApi,
                            filterState,
                            group,
                            items,
                            onApply
                        }}
                    />
                );
                break;
            }
            case 'price': {
                content = (
                    <PriceFilter
                        filterApi={filterApi}
                        filterState={filterState}
                        group={group}
                        items={items}
                        onApply={onApply}
                    />
                );
                break;
            }
            default: {
                content = (
                    <OptionFilter
                        filterApi={filterApi}
                        filterState={filterState}
                        group={group}
                        items={items}
                        onApply={onApply}
                    />
                );
                break;
            }
        }
        return content;
    }, [filterApi, filterState, group, items, onApply]);

    return <>{filter}</>;
};

Filter.propTypes = filterPropTypes;

Filter.defaultProps = {
    onApply: () => {}
};

export default Filter;
