import { Form } from 'informed';
import { arrayOf, func, shape, string } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';

import Select from '@app/components/Select';
import StoreLocationSearch from '@app/components/StoreLocationSearch';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './filterBlock.module.css';

const FilterBlock = props => {
    const { sortOptions, onChange, onChangeReactSelect } = props;

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    return (
        <div className={classes.filtersBlock}>
            <StoreLocationSearch
                classes={{
                    root: classes.locationSearchRoot,
                    searchButton: classes.searchButton,
                    searchInput: classes.searchInput
                }}
            />
            {!isMobile && (
                <Form>
                    <Select
                        field="sort"
                        items={sortOptions}
                        placeholder={'Sort by'}
                        classes={{
                            input: classes.selectInput
                        }}
                        onChangeInformed={onChange}
                        onChangeReactSelect={onChangeReactSelect}
                        desktopHeight="3.125rem"
                    />
                </Form>
            )}
        </div>
    );
};

FilterBlock.propTypes = {
    sortOptions: arrayOf(
        shape({
            label: string,
            value: string
        })
    ).isRequired,
    onChange: func.isRequired,
    onChangeReactSelect: func.isRequired
};

export default FilterBlock;
