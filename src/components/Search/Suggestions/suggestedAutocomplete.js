import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { ChevronRightSmall } from '@app/components/Icons';

import SuggestedAutocompleteItem from './SuggestedAutocompleteItem';

const SuggestedAutocomplete = props => {
    const {
        autocomplete,
        limit,
        onNavigate,
        value,
        classes,
        handleCloseSearchBox,
        isAutoCompleteOpen
    } = props;

    const items = autocomplete.slice(0, limit).map(item => (
        <li key={item} className={classes.listItem}>
            <SuggestedAutocompleteItem
                label={item}
                onNavigate={onNavigate}
                value={value}
                handleCloseSearchBox={handleCloseSearchBox}
            />
            {isAutoCompleteOpen && (
                <span className={classes.suggestedIcon}>
                    <Icon src={ChevronRightSmall} />
                </span>
            )}
        </li>
    ));

    return <ul className={classes.root}>{items}</ul>;
};

SuggestedAutocomplete.propTypes = {
    autocomplete: arrayOf(string).isRequired,
    classes: shape({
        root: string
    }),
    limit: number.isRequired,
    onNavigate: func,
    value: string,
    handleCloseSearchBox: func,
    isAutoCompleteOpen: bool
};

SuggestedAutocomplete.defaultProps = {
    limit: 5
};

export default SuggestedAutocomplete;
