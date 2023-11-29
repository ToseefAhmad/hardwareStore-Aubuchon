import { Form } from 'informed';
import React from 'react';

import Autocomplete from '@app/components/Search/Autocomplete/autocomplete';
import classes from '@app/components/Search/search.module.css';
import SearchField from '@app/components/Search/SearchField/searchField';
import { useSearchBar } from '@app/talons/SearchBar';

const SearchModalDesktop = () => {
    const {
        containerRef,
        handleChange,
        handleSubmit,
        initialValues,
        isAutoCompleteOpen,
        setIsAutoCompleteOpen,
        hasResult,
        setHasResult,
        valid,
        handleOpenSearchDesktop
    } = useSearchBar();

    return (
        <div ref={containerRef} className={classes.container}>
            <Form
                autoComplete="off"
                className={classes.form}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <div className={classes.autocomplete}>
                    <Autocomplete
                        setVisible={setIsAutoCompleteOpen}
                        valid={valid}
                        visible={isAutoCompleteOpen}
                        hasResult={hasResult}
                        setHasResult={setHasResult}
                    />
                </div>
                <div className={classes.search}>
                    <SearchField
                        onChange={handleChange}
                        onFocus={handleOpenSearchDesktop}
                        hasResult={hasResult}
                        isAutoCompleteOpen={isAutoCompleteOpen}
                        valid={valid}
                    />
                </div>
            </Form>
        </div>
    );
};

export default SearchModalDesktop;
