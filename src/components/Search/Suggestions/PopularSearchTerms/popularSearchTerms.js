import { arrayOf, func, number, shape, string } from 'prop-types';
import React from 'react';

import Link from '@app/components/Link';

import { usePopularSearchTerms } from './usePopularSearchTerms';

const PopularSearchTerms = ({ terms, onNavigate, limit, classes }) => {
    const { items } = usePopularSearchTerms({
        onNavigate,
        terms
    });

    return (
        <ul className={classes.root}>
            {items.slice(0, limit).map(item => (
                <li key={item.label}>
                    <Link to={item.destination} onClick={onNavigate}>
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

PopularSearchTerms.propTypes = {
    terms: arrayOf(string).isRequired,
    classes: shape({
        root: string
    }),
    limit: number.isRequired,
    onNavigate: func
};

PopularSearchTerms.defaultProps = {
    limit: 5
};

export default PopularSearchTerms;
