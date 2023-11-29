import { bool, func } from 'prop-types';
import React from 'react';

import { useAutocomplete } from '@app/talons/SearchBar';

import Loader from '../Loader';
import Suggestions from '../Suggestions';
import classes from './autocomplete.module.css';

const Autocomplete = ({
    setVisible,
    valid,
    visible,
    hasResult,
    setHasResult,
    handleCloseSearchBox,
    isAutoCompleteOpen
}) => {
    const {
        autocomplete,
        categories,
        popularSearchTerms,
        defaultProducts,
        products,
        value,
        isLoading
    } = useAutocomplete({
        valid,
        visible,
        hasResult,
        setHasResult
    });

    const rootClassName =
        visible || isLoading ? classes.root_visible : classes.root_hidden;

    return (
        <div className={rootClassName}>
            {isLoading ? (
                <div className={classes.loader}>
                    <Loader />
                </div>
            ) : (
                <div className={classes.suggestions}>
                    <Suggestions
                        autocomplete={autocomplete}
                        popularSearchTerms={popularSearchTerms}
                        categories={categories}
                        defaultProducts={defaultProducts}
                        products={products}
                        searchValue={value}
                        setVisible={setVisible}
                        visible={visible}
                        valid={valid}
                        handleCloseSearchBox={handleCloseSearchBox}
                        isAutoCompleteOpen={isAutoCompleteOpen}
                    />
                </div>
            )}
        </div>
    );
};

Autocomplete.propTypes = {
    setVisible: func,
    visible: bool,
    valid: bool,
    hasResult: bool,
    setHasResult: func,
    handleCloseSearchBox: func,
    isAutoCompleteOpen: bool
};

export default Autocomplete;
