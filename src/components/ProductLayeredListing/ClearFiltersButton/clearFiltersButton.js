import React from 'react';

import Button from '@app/components/Button';

import { useProductLayeredListingContext } from '../ProductLayeredListingContext';
import classes from './clearFiltersButton.module.css';

const ClearFiltersButton = () => {
    const { filterState, handleReset } = useProductLayeredListingContext();

    return (
        filterState.size !== 0 && (
            <Button
                type="button"
                priority="low"
                classes={{
                    secondary: classes.secondary
                }}
                onClick={handleReset}
                isShort={true}
            >
                Clear All Filters
            </Button>
        )
    );
};

export default ClearFiltersButton;
