import { bool, func, string } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import {
    Remove as CloseIcon,
    Search as SearchIcon
} from '@app/components/Icons';
import TextInput from '@app/components/TextInput';
import { useSearchField } from '@app/talons/SearchBar';

import classes from './searchField.module.css';

const SearchField = props => {
    const {
        onChange,
        onFocus,
        hasResult,
        isAutoCompleteOpen,
        valid,
        isSearchBoxOpened,
        searchValue
    } = props;
    const { inputRef, handleErase } = useSearchField({
        isAutoCompleteOpen,
        hasResult,
        isSearchBoxOpened
    });

    const searchIconClassName = valid
        ? classes.searchIconActive
        : classes.searchIcon;

    const searchIconBoxClassName = valid
        ? classes.searchBoxActive
        : classes.searchBoxIcon;

    const searchIcon = (
        <button
            className={
                isSearchBoxOpened ? searchIconBoxClassName : searchIconClassName
            }
            disabled={!valid}
            aria-label="Search"
            type="submit"
        >
            <Icon src={SearchIcon} />
        </button>
    );

    const eraseButton = (
        <button
            className={classes.eraseButton}
            disabled={!valid}
            aria-label="Erase"
            onClick={handleErase}
        >
            <Icon src={CloseIcon} className={classes.eraseButtonIcon} />
        </button>
    );

    const iconClassName = valid ? classes.iconActive : null;
    const iconSearchClassName = valid
        ? classes.iconSearchActive
        : classes.iconSearchBox;
    return (
        <TextInput
            icon={searchIcon}
            secondIcon={isSearchBoxOpened && searchValue && eraseButton}
            placeholder={
                isSearchBoxOpened
                    ? 'Search'
                    : 'What can we help you find today?'
            }
            classes={{
                input: isSearchBoxOpened
                    ? classes.searchBoxInput
                    : classes.searchInput,
                root: classes.searchRoot,
                icon: isSearchBoxOpened ? iconSearchClassName : iconClassName
            }}
            field="search_query"
            onFocus={onFocus}
            onValueChange={onChange}
            forwardedRef={inputRef}
        />
    );
};

SearchField.propTypes = {
    onChange: func,
    onFocus: func,
    isSearchOpen: bool,
    hasResult: bool,
    isAutoCompleteOpen: bool,
    valid: bool,
    isSearchBoxOpened: bool,
    searchValue: string
};

export default SearchField;
