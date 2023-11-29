import { Input } from 'informed';
import Nouislider from 'nouislider-react';
import React, { useEffect } from 'react';
import 'nouislider/distribute/nouislider.css';

import { filterPropTypes } from '../filterPropTypes';
import classes from './priceFilter.module.css';
import sliderStyles from './sliderStyles.css';
import { usePriceFilter } from './usePriceFilter';

const PriceFilter = ({ filterApi, filterState, group, items, onApply }) => {
    const {
        defaultValues,
        initialPrice,
        handleChange,
        price,
        inputHandler,
        preventCharacterTypo,
        currency,
        sliderRef
    } = usePriceFilter(filterApi, filterState, group, items, onApply);

    useEffect(() => {
        sliderRef.current
            ?.querySelectorAll('[role="slider"]')
            ?.forEach((slider, idx) => {
                slider.ariaLabel = `${idx === 0 ? 'Min' : 'Max'} price slider`;
            });
    }, [sliderRef]);

    return (
        <>
            <div className={classes.sliderContainer}>
                <Nouislider
                    range={{ min: defaultValues[0], max: defaultValues[1] }}
                    start={price}
                    connect
                    onChange={handleChange}
                    style={sliderStyles}
                    instanceRef={sliderRef}
                    accessibility
                />
            </div>
            <div className={classes.inputsContainer}>
                <div className={classes.inputLabel}>
                    <span>{currency}&nbsp;</span>
                    <Input
                        field="min"
                        aria-label="Min price"
                        type="text"
                        className={classes.input}
                        onChange={inputHandler}
                        initialValue={initialPrice[0]}
                        onKeyPress={event => preventCharacterTypo(event)}
                    />
                </div>
                <p>-</p>
                <div className={classes.inputLabel}>
                    <span>{currency}&nbsp;</span>
                    <Input
                        field="max"
                        aria-label="Max price"
                        type="text"
                        className={classes.input}
                        onChange={inputHandler}
                        initialValue={initialPrice[1]}
                        onKeyPress={event => preventCharacterTypo(event)}
                    />
                </div>
            </div>
        </>
    );
};

PriceFilter.propTypes = filterPropTypes;

export default PriceFilter;
