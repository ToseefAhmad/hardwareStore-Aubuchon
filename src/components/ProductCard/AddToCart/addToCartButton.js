import classnames from 'classnames';
import { bool, string, number, shape } from 'prop-types';
import React, { Fragment } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { PlusAddToCart } from '@app/components/Icons';
import Quantity from '@app/components/MiniCart/ProductList/quantity';

import defaultClasses from './addToCartButton.module.css';
import { useAddToCartButton } from './useAddToCartButton';

const AddToCartButton = ({
    classes: propClasses,
    item,
    maxQty,
    urlSuffix,
    isLightened,
    isPaintFeeItem,
    isMiniCart,
    cartItemUid,
    quantityIsVisible,
    productTypeLocation
}) => {
    const {
        cartItem,
        handleAddToCart,
        isDisabled,
        isInStock,
        isQuantityVisible,
        productType,
        updateItemQuantity,
        showQuantityInput,
        addToCartIsLoading,
        timer,
        allow_pickup
    } = useAddToCartButton({
        item,
        urlSuffix,
        cartItemUid,
        quantityIsVisible,
        productTypeLocation
    });

    const classes = useStyle(defaultClasses, propClasses);

    const dimensionAttributes = {};
    const showAddToCartButton = !addToCartIsLoading && !cartItem.quantity;
    const showQtyButton = !isQuantityVisible && !addToCartIsLoading;

    const rootClass = showAddToCartButton
        ? classnames(classes.rootAddToCart, {
              [classes.rootLightened]: isLightened
          })
        : showQtyButton
        ? classes.rootQty
        : classes.rootFull;

    if (!isInStock || !allow_pickup) return null;

    return (
        <Fragment>
            {(isMiniCart || productType === 'SimpleProduct') && (
                <div className={rootClass} style={dimensionAttributes}>
                    {showAddToCartButton && !isMiniCart ? (
                        <Button
                            aria-label="Add to Cart"
                            className={classnames(classes.addToCartButton, {
                                [classes.addToCartButtonLightened]: isLightened
                            })}
                            disabled={isDisabled}
                            onClick={handleAddToCart} // onPress caused double click on mobile
                            isShort={true}
                            priority="high"
                            type="button"
                        >
                            <Icon src={PlusAddToCart} />
                            <span>Add</span>
                        </Button>
                    ) : showQtyButton ? (
                        isPaintFeeItem ? (
                            <span className={classes.quantityButtonRoot}>
                                <span>{cartItem.quantity}</span>
                            </span>
                        ) : (
                            <button
                                className={classes.quantityButtonRoot}
                                onClick={showQuantityInput}
                                onKeyPress={showQuantityInput}
                            >
                                <span>
                                    {cartItem.quantity ||
                                        (cartItem.quantity || 0) + 1}
                                </span>
                            </button>
                        )
                    ) : (
                        <Quantity
                            itemId={item.uid}
                            initialValue={cartItem.quantity}
                            classes={{
                                button: classes.button,
                                button_decrement: classes.button_decrement,
                                button_increment: classes.button_increment,
                                input: classes.input
                            }}
                            max={maxQty}
                            onChange={updateItemQuantity}
                            timer={timer}
                        />
                    )}
                </div>
            )}
            {!isMiniCart && productType === 'ConfigurableProduct' && (
                <Button
                    aria-label="Add to Cart"
                    className={classnames(classes.rootConfigure, {
                        [classes.rootConfigureLighted]: isLightened
                    })}
                    disabled={isDisabled}
                    onPress={handleAddToCart}
                    isShort={true}
                    priority="high"
                    type="button"
                >
                    <Fragment>
                        <span>Options</span>
                    </Fragment>
                </Button>
            )}
        </Fragment>
    );
};

AddToCartButton.defaultProps = {
    isLightened: false,
    isPaintFeeItem: false,
    quantityIsVisible: false,
    productTypeLocation: ''
};

AddToCartButton.propTypes = {
    classes: shape({
        addToCartButton: string,
        button: string,
        button_decrement: string,
        button_increment: string,
        input: string,
        root: string,
        rootAddToCart: string,
        rootConfigure: string,
        rootFull: string,
        rootQty: string,
        quantityButtonRoot: string
    }),
    item: shape({
        id: number.isRequired,
        uid: string.isRequired,
        name: string.isRequired,
        stock_status: string.isRequired,
        __typename: string.isRequired,
        url_key: string.isRequired,
        sku: string.isRequired
    }),
    maxQty: number,
    urlSuffix: string,
    isLightened: bool,
    isPaintFeeItem: bool,
    isMiniCart: bool,
    cartItemUid: string,
    quantityIsVisible: bool,
    productTypeLocation: string
};

export default AddToCartButton;
