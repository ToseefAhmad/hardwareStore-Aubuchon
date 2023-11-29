import { arrayOf, func, number, oneOfType } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { Minus as MinusIcon, Plus as PlusIcon } from '@app/components/Icons';
import TextInput from '@app/components/TextInput';

import classes from './quantity.module.css';
import { useQuantity } from './useQuantity';

const Quantity = props => {
    const { maxValue, initialValue, id, validate, minValue } = props;

    const {
        isDisabledDecrease,
        isDisabledIncrease,
        handleDecrease,
        handleIncrease
    } = useQuantity({
        maxValue,
        initialValue,
        minValue
    });

    return (
        <div className={classes.root}>
            <button
                type="button"
                className={classes.btn}
                onClick={handleDecrease}
                disabled={isDisabledDecrease}
                aria-label="Decrease Quantity"
            >
                <Icon classes={{ icon: classes.icon }} src={MinusIcon} />
            </button>
            <TextInput
                aria-label="Item Quantity"
                classes={{
                    input: classes.input,
                    input_error: classes.error
                }}
                field="qty"
                id={id}
                inputMode="numeric"
                pattern="[1-9]*"
                validate={validate}
            />
            <button
                type="button"
                className={classes.btn}
                onClick={handleIncrease}
                disabled={isDisabledIncrease}
                aria-label="Increase Quantity"
            >
                <Icon classes={{ icon: classes.icon }} src={PlusIcon} />
            </button>
        </div>
    );
};

Quantity.propTypes = {
    maxValue: number.isRequired,
    validate: oneOfType([func, arrayOf(func)]),
    initialValue: number,
    id: number,
    minValue: number
};

Quantity.defaultProps = {
    validate: null,
    initialValue: 1
};

export default Quantity;
