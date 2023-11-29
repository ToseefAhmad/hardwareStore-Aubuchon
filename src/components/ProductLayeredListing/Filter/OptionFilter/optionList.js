import classnames from 'classnames';
import React, { useMemo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';

import { filterPropTypes } from '../filterPropTypes';
import FilterItem from './filterItem';
import classes from './optionList.module.css';

const REVIEW_FILTER_ID = 'turnto_average_rating';

const OptionList = ({
    filterApi,
    filterState,
    group,
    items,
    name,
    onApply
}) => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const itemSize = isMobile ? 55 : 31;

    const filteredArray = useMemo(
        () =>
            items.filter(
                item => item.title !== '0' && item.count && item.value !== '0'
            ),
        [items]
    );

    const isVirtualize = useMemo(() => filteredArray?.length > 30, [
        filteredArray?.length
    ]);

    // memoize item creation
    // search value is not referenced, so this array is stable
    const itemElements = useMemo(
        () =>
            filteredArray.map(item => {
                const { value } = item;
                const key = `item-${group}-${value}`;

                return (
                    <li
                        key={key}
                        className={classnames(classes.item, {
                            [classes.itemReverse]: group === REVIEW_FILTER_ID,
                            [classes.itemDefault]: !isVirtualize
                        })}
                    >
                        <FilterItem
                            filterApi={filterApi}
                            filterState={filterState}
                            group={group}
                            item={item}
                            onApply={onApply}
                        />
                    </li>
                );
            }),
        [filterApi, filterState, group, filteredArray, onApply, isVirtualize]
    );

    return (
        <div className={classes.root}>
            {isVirtualize ? (
                <div className={classes.items}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <FixedSizeList
                                height={height}
                                itemCount={filteredArray.length}
                                itemSize={itemSize}
                                width={width}
                            >
                                {({ index, style }) => {
                                    const item = filteredArray[index];

                                    return (
                                        <div
                                            key={`${item.value}-${index}`}
                                            className={classes.item}
                                            style={style}
                                        >
                                            <FilterItem
                                                filterApi={filterApi}
                                                filterState={filterState}
                                                group={group}
                                                name={name}
                                                item={item}
                                                onApply={onApply}
                                            />
                                        </div>
                                    );
                                }}
                            </FixedSizeList>
                        )}
                    </AutoSizer>
                </div>
            ) : (
                <ul
                    className={classnames({
                        [classes.itemsListReverse]: group === REVIEW_FILTER_ID,
                        [classes.itemsList]: group !== REVIEW_FILTER_ID
                    })}
                >
                    {itemElements}
                </ul>
            )}
        </div>
    );
};

OptionList.propTypes = filterPropTypes;

export default OptionList;
