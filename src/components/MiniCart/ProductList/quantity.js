import { Form } from 'informed';
import { bool, func, number, shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';

import { Message } from '@app/components/Field';
import Icon from '@app/components/Icon';
import { Minus as MinusIcon, Plus as PlusIcon } from '@app/components/Icons';
import TextInput from '@app/components/TextInput';
import { useTailwindContext } from '@app/context/tailwind';

import defaultClasses from './quantity.module.css';
import { useQuantity } from './useQuantity';

export const QuantityFields = props => {
    const {
        disabled,
        initialValue,
        itemId,
        min,
        max,
        onChange,
        message,
        loading,
        configurableQty,
        isPaintFeeItem,
        timer
    } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const {
        isIncrementDisabled,
        isDecrementDisabled,
        handleBlur,
        handleDecrement,
        handleIncrement,
        maskInput,
        handlePressEnter,
        handleFocus
    } = useQuantity({
        initialValue,
        min,
        max,
        onChange,
        loading,
        timer
    });

    const windowSize = useWindowSize();
    const tailwind = useTailwindContext();
    const isMobile = windowSize.innerWidth <= tailwind.screens.lg;

    const errorMessage = message ? <Message>{message}</Message> : null;

    return (
        <Fragment>
            <div className={classes.root}>
                <button
                    aria-label="Decrease Quantity"
                    className={classes.button_decrement}
                    onClick={handleDecrement}
                    disabled={disabled || isDecrementDisabled || isPaintFeeItem}
                    type="button"
                >
                    <Icon src={MinusIcon} />
                </button>
                <TextInput
                    aria-label="Item Quantity"
                    classes={{ input: classes.input }}
                    field="quantity"
                    id={itemId}
                    inputMode="numeric"
                    readOnly={isMobile}
                    mask={maskInput}
                    onKeyUp={timer}
                    onKeyDown={handlePressEnter}
                    onBlur={handleBlur}
                    pattern="[0-9]*"
                    initialValue={configurableQty ? initialValue : null}
                    onFocus={handleFocus}
                    disabled={disabled || isPaintFeeItem}
                />
                <button
                    aria-label="Increase Quantity"
                    className={classes.button_increment}
                    disabled={disabled || isIncrementDisabled || isPaintFeeItem}
                    onClick={handleIncrement}
                    type="button"
                >
                    <Icon src={PlusIcon} />
                </button>
            </div>
            {errorMessage}
        </Fragment>
    );
};

const Quantity = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return props.configurableQty ? (
        <QuantityFields {...props} />
    ) : (
        <Form
            className={classes.form}
            initialValues={{
                quantity: props.initialValue
            }}
        >
            <QuantityFields {...props} />
        </Form>
    );
};

Quantity.propTypes = {
    initialValue: number,
    itemId: string,
    min: number,
    max: number,
    onChange: func.isRequired,
    message: string,
    classes: shape({
        formContainer: string
    }),
    loading: bool,
    configurableQty: bool,
    isPaintFeeItem: bool,
    timer: func
};

Quantity.defaultProps = {
    min: 0,
    initialValue: 1,
    onChange: () => {},
    configurableQty: false,
    isPaintFeeItem: false
};

QuantityFields.propTypes = {
    disabled: bool,
    initialValue: number,
    itemId: string,
    min: number,
    max: number,
    onChange: func,
    message: string,
    classes: shape({
        root: string,
        input: string,
        button_decrement: string,
        button_increment: string
    }),
    loading: bool,
    configurableQty: bool,
    isPaintFeeItem: bool,
    timer: func
};

QuantityFields.defaultProps = {
    min: 0,
    initialValue: 1,
    isPaintFeeItem: false,
    onChange: () => {},
    timer: () => {}
};

export default Quantity;
