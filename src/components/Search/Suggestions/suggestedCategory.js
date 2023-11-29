import { func, string } from 'prop-types';
import React from 'react';

import Link from '@app/components/Link';

import { useSuggestedCategory } from './useSuggestedCategory';

const SuggestedCategory = props => {
    const { label, path, onNavigate } = props;
    const talonProps = useSuggestedCategory({
        onNavigate,
        path
    });
    const { destination, handleClick } = talonProps;

    return (
        <Link to={destination} onClick={handleClick}>
            {label}
        </Link>
    );
};

SuggestedCategory.propTypes = {
    label: string.isRequired,
    path: string.isRequired,
    onNavigate: func
};

export default SuggestedCategory;
