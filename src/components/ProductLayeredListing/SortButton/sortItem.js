import { bool, func, shape, string, object } from 'prop-types';
import React, { useCallback } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon/icon';
import { Checkmark } from '@app/components/Icons';

import defaultClasses from './sortItem.module.css';

const SortItem = props => {
    const { active, onClick, sortItem } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const handleClick = useCallback(
        e => {
            // use only left click for selection
            if (e.button === 0) {
                onClick(sortItem);
            }
        },
        [sortItem, onClick]
    );

    const handleKeyDown = useCallback(
        e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(sortItem);
            }
        },
        [onClick, sortItem]
    );

    return (
        <button
            className={classes.root}
            onMouseDown={handleClick}
            onKeyDown={handleKeyDown}
        >
            <span className={classes.content}>
                <span className={classes.text}>{sortItem.text}</span>
                {active && (
                    <span className={classes.icon}>
                        <Icon src={Checkmark} />
                    </span>
                )}
            </span>
        </button>
    );
};

SortItem.propTypes = {
    active: bool,
    classes: shape({
        content: string,
        root: string,
        text: string
    }),
    onClick: func,
    sortItem: object
};

export default SortItem;
