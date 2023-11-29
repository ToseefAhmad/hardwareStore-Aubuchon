import { bool, shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';

import Icon from '@app/components/Icon';
import {
    CartLarge as ShoppingCartIcon,
    Cart as ShoppingCartIconSmall,
    ChevronDown
} from '@app/components/Icons';

import defaultClasses from './cartTrigger.module.css';
import { useCartTrigger } from './useCartTrigger';

const CartTrigger = ({ classes: propsClasses, showMobileCart }) => {
    const {
        itemCount,
        hideCartTrigger,
        handleOpenMiniCart,
        isAubuchonBrand,
        isOpen
    } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

    const classes = useStyle(defaultClasses, propsClasses);

    const amountClassName = isAubuchonBrand
        ? classes.amountAubuchon
        : classes.amount;
    const buttonAriaLabel = `Toggle mini cart. You have ${itemCount} items in your cart.`;
    const itemCountDisplay = itemCount > 99 ? '99+' : itemCount;

    const counterText = itemCount === 1 ? 'product' : 'products';

    const cartIconWithItemCount = (
        <div className={classes.mobileCart}>
            <div className={classes.mobileIcon}>
                <Icon src={ShoppingCartIconSmall} />
            </div>
            {!itemCount ? null : (
                <span className={classes.mobileAmount}>{itemCountDisplay}</span>
            )}
        </div>
    );

    const cartTrigger = hideCartTrigger ? null : showMobileCart ? (
        <div className={classes.rootMobileContainer}>
            <button
                className={classes.rootMobile}
                aria-label={buttonAriaLabel}
                onClick={handleOpenMiniCart}
                aria-expanded={isOpen}
                aria-controls="minicart"
            >
                {cartIconWithItemCount}
            </button>
        </div>
    ) : (
        <div className={classes.root}>
            <button
                className={classes.trigger}
                onClick={handleOpenMiniCart}
                aria-expanded={isOpen}
                aria-controls="minicart"
            >
                <div className={classes.icon}>
                    <Icon src={ShoppingCartIcon} />
                </div>
                <div className={classes.info}>
                    <span className={classes.text}>Cart</span>
                    <div className={classes.amountWrapper}>
                        <p className={classes.statusTextWrapper}>
                            <span className={amountClassName}>
                                {itemCountDisplay}
                            </span>
                            &nbsp;
                            {counterText}
                        </p>
                        <div className={classes.chevronIcon}>
                            <Icon src={ChevronDown} />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );

    return <Fragment>{cartTrigger}</Fragment>;
};

CartTrigger.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        trigger: string,
        amountWrapper: string,
        icon: string,
        chevronIcon: string,
        mobileIcon: string,
        info: string,
        mobileCart: string,
        text: string,
        amount: string,
        rootMobile: string,
        mobileAmount: string,
        statusTextWrapper: string
    }),
    showMobileCart: bool
};

CartTrigger.defaultProps = {
    showMobileCart: false
};

export default CartTrigger;
