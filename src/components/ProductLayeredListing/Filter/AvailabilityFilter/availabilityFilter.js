import { Form } from 'informed';
import { shape } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import RadioGroup, { Radio } from '@app/components/RadioGroup';

import { filterPropTypes } from '../filterPropTypes';
import { OptionList } from '../OptionFilter';
import classes from './availabilityFilter.module.css';
import ChangeStoreButton from './changeStoreButton';
import { useAvailabilityFilter } from './useAvailabilityFilter';

export const INITIAL_STOCK_FORM = {
    inStockRadio: '1',
    value: 'in-stock-items'
};

const AvailabilityFilter = ({ filterProps }) => {
    const {
        isMobile,
        pickupStore,
        inStockField,
        outOfStockFields
    } = useAvailabilityFilter({
        filterProps
    });

    return (
        <Form initialValues={INITIAL_STOCK_FORM} className={classes.storeRoot}>
            {pickupStore && (
                <div className={classes.imageContainer}>
                    <img
                        src={pickupStore.imageUrl}
                        alt={pickupStore.storeName}
                        className={classes.image}
                    />
                </div>
            )}
            {!pickupStore && (
                <div className={classes.imageContainerShimmer}>
                    <Shimmer height="100%" width="100%" />
                </div>
            )}
            <div className={classes.radio}>
                <RadioGroup field={'inStockRadio'}>
                    <Radio
                        key={INITIAL_STOCK_FORM.value}
                        id={INITIAL_STOCK_FORM.value}
                        value="1"
                        classes={{
                            root: classes.radioRoot
                        }}
                    >
                        {pickupStore ? (
                            <span className={classes.title}>
                                In Stock{' '}
                                <span className={classes.info}>
                                    <span className={classes.name}>
                                        {pickupStore.storeName}{' '}
                                    </span>{' '}
                                    <strong>{inStockField?.count || 0}</strong>
                                </span>
                            </span>
                        ) : (
                            <span className={classes.titleShimmer}>
                                <Shimmer width="100%" height="100%" />
                            </span>
                        )}
                    </Radio>
                </RadioGroup>
            </div>
            {filterProps && outOfStockFields && (
                <>
                    <OptionList {...filterProps} items={outOfStockFields} />
                    {!isMobile && (
                        <div className={classes.storeButton}>
                            <ChangeStoreButton />
                        </div>
                    )}
                </>
            )}
        </Form>
    );
};

AvailabilityFilter.propTypes = {
    filterProps: shape(filterPropTypes)
};

export default AvailabilityFilter;
