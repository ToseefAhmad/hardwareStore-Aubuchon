import { func, string } from 'prop-types';
import React from 'react';

import Link from '@app/components/Link';

import classes from './suggestedAutocompleteItem.module.css';
import { useSuggestedAutocompleteItem } from './useSuggestedAutocompleteItem';

const SuggestedAutocompleteItem = props => {
    const { label, onNavigate, value, handleCloseSearchBox } = props;
    const { item, destination, handleClick } = useSuggestedAutocompleteItem({
        label,
        onNavigate,
        handleCloseSearchBox
    });

    return (
        <Link to={destination} onClick={handleClick}>
            {item.label.split(' ').map(word => (
                <span
                    key={word}
                    className={
                        value &&
                        value.toLowerCase().includes(word.toLowerCase())
                            ? null
                            : classes.suggestedWord
                    }
                >
                    {word}{' '}
                </span>
            ))}
        </Link>
    );
};

SuggestedAutocompleteItem.propTypes = {
    label: string.isRequired,
    onNavigate: func,
    value: string,
    handleCloseSearchBox: func
};

SuggestedAutocompleteItem.defaultProps = {
    onNavigate: () => {}
};

export default SuggestedAutocompleteItem;
