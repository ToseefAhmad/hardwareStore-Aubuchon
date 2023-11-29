import { func, number, string } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { ChevronRight } from '@app/components/Icons';

import classes from './filterList.module.css';

const FilterList = ({ name, activeAmount, handleClick }) => {
    return (
        <li className={classes.root} aria-label={`Filter products by ${name}`}>
            <button
                className={classes.trigger}
                onClick={() => handleClick()}
                type="button"
            >
                <span className={classes.header}>
                    <span className={classes.name}>
                        {name}
                        {activeAmount > 0 && (
                            <span>
                                {' '}
                                -{' '}
                                <b className={classes.number}>{activeAmount}</b>
                            </span>
                        )}
                    </span>
                    <span className={classes.icon}>
                        <Icon src={ChevronRight} />
                    </span>
                </span>
            </button>
        </li>
    );
};

FilterList.propTypes = {
    name: string,
    activeAmount: number,
    handleClick: func
};

export default FilterList;
