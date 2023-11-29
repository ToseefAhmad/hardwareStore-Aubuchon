import { arrayOf, func, number, shape, string } from 'prop-types';
import React from 'react';

import SuggestedCategory from './suggestedCategory';

const SuggestedCategories = props => {
    const { categories, limit, onNavigate, classes } = props;

    const items = categories.slice(0, limit).map(({ id, name, url }) => {
        return (
            <li key={id}>
                <SuggestedCategory
                    label={name}
                    path={new URL(url).pathname}
                    onNavigate={onNavigate}
                />
            </li>
        );
    });

    return <ul className={classes.root}>{items}</ul>;
};

SuggestedCategories.propTypes = {
    categories: arrayOf(
        shape({
            name: string.isRequired,
            id: string.isRequired
        })
    ).isRequired,
    classes: shape({
        root: string
    }),
    limit: number.isRequired,
    onNavigate: func
};

SuggestedCategories.defaultProps = {
    limit: 3
};

export default SuggestedCategories;
