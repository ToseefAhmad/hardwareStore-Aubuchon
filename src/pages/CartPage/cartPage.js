import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import classes from '@magento/venia-ui/lib/components/CartPage/cartPage.module.css';
import PriceAdjustments from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments';
import PriceSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import StockStatusMessage from '@magento/venia-ui/lib/components/StockStatusMessage';

import { useCartPage } from '@app/talons/CartPage/useCartPage';

import ProductListing from './ProductListing';

/**
 * Structural page component for the shopping cart.
 * This is the main component used in the `/cart` route in Venia.
 * It uses child components to render the different pieces of the cart page.
 */
const CartPage = () => {
    const { formatMessage } = useIntl();
    const {
        cartItems,
        hasItems,
        isCartUpdating,
        fetchCartDetails,
        setIsCartUpdating,
        shouldShowLoadingIndicator
    } = useCartPage();

    if (shouldShowLoadingIndicator) {
        return fullPageLoadingIndicator;
    }

    return (
        <>
            <StoreTitle>
                {formatMessage({
                    id: 'cartPage.title',
                    defaultMessage: 'Cart'
                })}
            </StoreTitle>
            <div className={classes.root}>
                <div className={classes.heading_container}>
                    <h1 className={classes.heading}>
                        <FormattedMessage
                            id="cartPage.heading"
                            defaultMessage="Cart"
                        />
                    </h1>
                    <div className={classes.stockStatusMessageContainer}>
                        <StockStatusMessage cartItems={cartItems} />
                    </div>
                </div>
                <div className={classes.body}>
                    <div className={classes.items_container}>
                        {hasItems ? (
                            <ProductListing
                                setIsCartUpdating={setIsCartUpdating}
                                fetchCartDetails={fetchCartDetails}
                            />
                        ) : (
                            <h3>
                                <FormattedMessage
                                    id="cartPage.emptyCart"
                                    defaultMessage="There are no items in your cart."
                                />
                            </h3>
                        )}
                    </div>
                    <div className={classes.price_adjustments_container}>
                        {hasItems && (
                            <PriceAdjustments
                                setIsCartUpdating={setIsCartUpdating}
                            />
                        )}
                    </div>
                    <div className={classes.summary_container}>
                        <div className={classes.summary_contents}>
                            {hasItems && (
                                <PriceSummary isUpdating={isCartUpdating} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
