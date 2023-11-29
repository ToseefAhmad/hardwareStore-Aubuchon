import { bool, func, number, shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import { ChevronRightSmall } from '@app/components/Icons';

import defaultClasses from './categoryBranch.module.css';
import { useCategoryBranch } from './useCategoryBranch';

const Branch = ({
    classes: propsClasses,
    category,
    setCategoryId,
    isListElement
}) => {
    const { name } = category;
    const classes = useStyle(defaultClasses, propsClasses);

    const { exclude, handleClick } = useCategoryBranch({
        category,
        setCategoryId
    });

    if (exclude) {
        return null;
    }

    return (
        <Fragment>
            {isListElement ? (
                <li className={classes.root}>
                    <button
                        type="button"
                        onClick={handleClick}
                        aria-label={`Expand category "${name}"`}
                    >
                        <span className={classes.target}>
                            <span className={classes.text}>{name}</span>

                            <span className={classes.icon}>
                                <Icon src={ChevronRightSmall} />
                            </span>
                        </span>
                    </button>
                </li>
            ) : (
                <div className={classes.root}>
                    <button
                        type="button"
                        onClick={handleClick}
                        aria-label={`Expand category "${name}"`}
                    >
                        <span className={classes.target}>
                            <span className={classes.text}>{name}</span>

                            <span className={classes.icon}>
                                <Icon src={ChevronRightSmall} />
                            </span>
                        </span>
                    </button>
                </div>
            )}
        </Fragment>
    );
};

Branch.propTypes = {
    category: shape({
        uid: string.isRequired,
        include_in_menu: number,
        name: string.isRequired
    }).isRequired,
    classes: shape({
        root: string,
        target: string,
        text: string,
        icon: string
    }),
    setCategoryId: func.isRequired,
    isListElement: bool
};

Branch.defaultProps = {
    isListElement: true
};

export default Branch;
