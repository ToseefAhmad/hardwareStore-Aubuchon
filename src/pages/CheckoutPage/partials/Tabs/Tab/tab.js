import classnames from 'classnames';
import { bool, func, number, string } from 'prop-types';
import React from 'react';

import classes from './tab.module.css';

const Tab = props => {
    const { idx, label, isAllowed, isActive, onTabClick } = props;

    return (
        <li
            className={classnames(classes.container, {
                [classes.allowedTab]: isAllowed,
                [classes.activeTab]: isActive
            })}
        >
            <button
                className={classes.tabButton}
                type="button"
                onClick={onTabClick}
            >
                <span className={classes.num}>{idx}.</span> {label}
            </button>
        </li>
    );
};

Tab.propTypes = {
    idx: number.isRequired,
    label: string.isRequired,
    isAllowed: bool.isRequired,
    isActive: bool.isRequired,
    onTabClick: func.isRequired
};

export default Tab;
