import { bool, func, number, string } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';

import { ChangeStoreButton } from '../Filter/AvailabilityFilter';
import classes from './footer.module.css';

const Footer = ({
    applyFilters,
    hasFilters,
    handleBack,
    handleReset,
    number,
    activeFilter
}) => {
    return (
        <div className={classes.root}>
            {hasFilters && !activeFilter && (
                // Use onClick instead onPress, because onPress fires event twice
                <Button type="button" onClick={handleReset}>
                    Clear all filters
                </Button>
            )}
            {!activeFilter ? (
                <Button
                    onPress={applyFilters}
                    aria-label="Apply Filters"
                    priority="high"
                >
                    <span className={classes.rootApplyText}>
                        Apply Filters{' '}
                        {!!number && (
                            <span className={classes.number}>{number}</span>
                        )}
                    </span>
                </Button>
            ) : (
                <>
                    {activeFilter === 'stock_info' && <ChangeStoreButton />}
                    <Button onPress={handleBack} priority="high">
                        Apply Filter
                    </Button>
                </>
            )}
        </div>
    );
};

Footer.propTypes = {
    applyFilters: func.isRequired,
    hasFilters: bool,
    activeFilter: string,
    handleBack: func,
    handleReset: func,
    number: number
};

export default Footer;
