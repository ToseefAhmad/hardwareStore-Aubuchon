import { string, object, shape } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Cart } from '@app/components/Icons';
import Quantity from '@app/components/MiniCart/ProductList/quantity';

import classes from './addToCartButton.module.css';
import { useAddToCartButton } from './useAddToCartButton';

const AddToCartButton = ({ variant, selectedColor }) => {
    const {
        cartItem,
        isQuantityVisible,
        updateItemQuantity,
        addToCartIsLoading,
        showQuantityInput,
        handleAddToCart,
        quantity,
        timer
    } = useAddToCartButton({
        variant,
        selectedColor
    });

    const showAddToCartButton = !cartItem.quantity && !isQuantityVisible;
    const showQtyButton = !isQuantityVisible;

    const rootClass = showAddToCartButton
        ? classes.rootAddToCart
        : showQtyButton
        ? classes.rootQty
        : classes.rootFull;

    return (
        <div className={rootClass}>
            {showAddToCartButton ? (
                <Button
                    aria-label="Add to Cart"
                    className={classes.addToCartButton}
                    onPress={handleAddToCart}
                    isShort={true}
                    isLoading={addToCartIsLoading}
                    priority="high"
                    type="button"
                >
                    <Icon src={Cart} />
                    <span>Add</span>
                </Button>
            ) : showQtyButton ? (
                <button
                    className={classes.quantityButtonRoot}
                    onClick={showQuantityInput}
                    onKeyPress={showQuantityInput}
                >
                    <span>
                        {cartItem.quantity || (cartItem.quantity || 0) + 1}
                    </span>
                </button>
            ) : (
                <Quantity
                    itemId={variant.product.uid}
                    initialValue={quantity}
                    classes={{
                        button: classes.button,
                        button_decrement: classes.button_decrement,
                        button_increment: classes.button_increment,
                        input: classes.input
                    }}
                    max={
                        variant?.product?.pickup_store_inventory?.qty ||
                        undefined
                    }
                    onChange={updateItemQuantity}
                    configurableQty={true}
                    timer={timer}
                />
            )}
        </div>
    );
};

AddToCartButton.propTypes = {
    variant: object,
    selectedColor: shape({
        label: string,
        hex: string
    })
};

export default AddToCartButton;
