import classnames from 'classnames';
import { arrayOf, number, shape, string, func, bool } from 'prop-types';
import React from 'react';

import setValidator from '@magento/peregrine/lib/validators/set';

import Icon from '@app/components/Icon';
import { ChevronRight, Minimize, Maximize } from '@app/components/Icons';

import Filter from '../Filter';
import classes from './filterBlock.module.css';
import { useFilterBlock } from './useFilterBlock';

const FilterBlock = ({
    filterApi,
    filterState,
    group,
    items,
    name,
    onApply,
    initialOpen,
    setActiveFilter
}) => {
    const { isExpanded, isMobile, handleClick } = useFilterBlock({
        filterState,
        items,
        initialOpen,
        setActiveFilter
    });

    const iconSrc = isMobile ? ChevronRight : isExpanded ? Minimize : Maximize;

    return (
        <li className={classes.root} aria-label={`Filter products by ${name}`}>
            <button
                className={classnames(classes.trigger, {
                    [classes.triggerCollapsed]: isExpanded
                })}
                onClick={() => handleClick(group)}
                type="button"
                aria-expanded={!!isExpanded}
                aria-label={
                    isExpanded
                        ? `Hide ${name} filter item options.`
                        : `Show ${name} filter item options.`
                }
            >
                <span className={classes.header}>
                    <span className={classes.name}>{name}</span>
                    <span
                        className={classnames({
                            [classes.iconActive]: !isExpanded,
                            [classes.icon]: !!isExpanded
                        })}
                    >
                        <Icon src={iconSrc} />
                    </span>
                </span>
            </button>
            {isExpanded && (
                <Filter
                    filterApi={filterApi}
                    filterState={filterState}
                    group={group}
                    items={items}
                    onApply={onApply}
                />
            )}
        </li>
    );
};

FilterBlock.propTypes = {
    filterApi: shape({
        toggleItem: func.isRequired
    }).isRequired,
    filterState: setValidator,
    group: string.isRequired,
    items: arrayOf(
        shape({
            count: number,
            title: string,
            value: string
        })
    ),
    name: string.isRequired,
    onApply: func,
    initialOpen: bool,
    setActiveFilter: func
};

FilterBlock.defaultProps = {
    onApply: () => {},
    initialOpen: false,
    setActiveFilter: () => {}
};

export default FilterBlock;
