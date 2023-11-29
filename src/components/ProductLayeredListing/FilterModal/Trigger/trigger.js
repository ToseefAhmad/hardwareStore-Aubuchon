import { bool } from 'prop-types';
import React from 'react';

import { useProductLayeredListingContext } from '../../ProductLayeredListingContext';

import Button from '@app/components/Button';

import classes from './trigger.module.css';

const Trigger = ({ disabled }) => {
    const { filterState, handleOpen } = useProductLayeredListingContext();
    const activeFiltersAmount = filterState.size;

    return (
        <Button
            priority={'low'}
            classes={{
                root_lowPriority: classes.filterButton
            }}
            onPress={handleOpen}
            type="button"
            aria-live="polite"
            aria-busy="false"
            isShort={true}
            disabled={disabled}
        >
            <span className={classes.inner}>
                Filters
                {!!activeFiltersAmount && (
                    <span className={classes.amount}>
                        {activeFiltersAmount}
                    </span>
                )}
            </span>
        </Button>
    );
};

Trigger.propTypes = {
    disabled: bool
};

export default Trigger;
