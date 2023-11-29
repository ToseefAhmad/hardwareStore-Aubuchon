import classnames from 'classnames';
import { bool, shape, string, func } from 'prop-types';
import React, { Fragment, useEffect, useRef } from 'react';
import { AlertCircle as AlertCircleIcon } from 'react-feather';

import { useToasts, useWindowSize } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';

import BonusRewards from '@app/components/BonusRewards';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import {
    Close as CloseIcon,
    ShoppingBagLarge as ShoppingBagLargeIcon,
    Info as InfoIcon,
    ChevronDown as ArrowDownIcon,
    ChevronUpSmall as ArrowUpIcon
} from '@app/components/Icons';
import Price from '@app/components/Price';
import StockStatusMessage from '@app/components/StockStatusMessage';
import { useTailwindContext } from '@app/context/tailwind';
import { useId } from '@app/hooks/useId';

import CouponCode from './couponCode';
import defaultClasses from './miniCart.module.css';
import ProductList from './ProductList';
import ProductPreview from './productPreview';
import { useMiniCart } from './useMiniCart';

const errorIcon = <Icon src={AlertCircleIcon} />;

/**
 * The MiniCart component shows a limited view of the user's cart.
 *
 * @param {Boolean} props.isOpen - Whether or not the MiniCart should be displayed.
 * @param {Function} props.setIsOpen - Function to toggle mini cart
 */

const MiniCart = props => {
    const miniCartContentRef = useRef();
    const {
        handleCloseMiniCart,
        isOpen,
        errorMessage,
        handleProceedToCheckout,
        handleRemoveItem,
        handleUpdateItemQuantity,
        loading,
        productList,
        isIncludeNotAvailableProducts,
        hasOutOfStockItem,
        bossAvailableDate,
        grandTotal,
        subTotalWithoutSale,
        youSave,
        totalQuantity,
        configurableThumbnailSource,
        storeUrlSuffix,
        isMobileDetailed,
        toggleMobileDetailed,
        isPromoCodeInputVisible,
        togglePromoCodeInputVisible,
        setIsCartUpdating,
        storeConfig,
        isPickupStoreDataIsLoaded,
        pickupStoreData,
        sortedDiscounts
    } = useMiniCart({ miniCartContentRef });
    const { id } = useId({ prefix: 'minicart' });

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    const isCartEmpty = !(productList && productList.length);
    const hiddenItemsCount =
        productList?.length <= 3 ? null : productList?.length - 3;

    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = isOpen ? classes.root_open : classes.root;
    const contentsClass = isOpen
        ? isCartEmpty
            ? classes.contents_open_empty
            : classes.contents_open
        : classes.contents;
    const priceClass = loading ? classes.price_loading : classes.price;
    const promoCodeArrowClasses = isPromoCodeInputVisible
        ? classes.promoCodeArrow_open
        : classes.promoCodeArrow;

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (errorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: errorMessage,
                dismissable: true,
                timeout: 7000
            });
        }
    }, [addToast, errorMessage]);

    const totalQuantityMessage =
        totalQuantity === 1 ? (
            <span>{totalQuantity} item</span>
        ) : (
            <span>{totalQuantity} items</span>
        );

    const pickupStore =
        !isCartEmpty && isPickupStoreDataIsLoaded ? (
            <div className={classes.pickupStore}>
                Pickup store:{' '}
                <span className={classes.pickupStoreName}>
                    {pickupStoreData.city}, {pickupStoreData.regionCode}
                </span>
            </div>
        ) : null;

    const productListComponent = (
        <ProductList
            items={productList}
            loading={loading}
            handleRemoveItem={handleRemoveItem}
            handleUpdateItemQuantity={handleUpdateItemQuantity}
            closeMiniCart={handleCloseMiniCart}
            configurableThumbnailSource={configurableThumbnailSource}
            storeUrlSuffix={storeUrlSuffix}
            storeConfig={storeConfig}
        />
    );

    // first 3 items' thumbnails on mobile
    const cartItemsPreview = (
        <Fragment>
            <div className={classes.itemsShortView}>
                {productList?.slice(0, 3).map(item => {
                    return (
                        <ProductPreview
                            key={item.uid}
                            {...item}
                            storeUrlSuffix={storeUrlSuffix}
                            configurableThumbnailSource={
                                configurableThumbnailSource
                            }
                        />
                    );
                })}
                {hiddenItemsCount && (
                    <div className={classes.itemsShortViewLastItem}>
                        +{hiddenItemsCount}
                    </div>
                )}
            </div>
            <Button onClick={toggleMobileDetailed} isShort>
                View all items
                <span className={classes.expandItemsButtonIcon}>
                    <Icon src={ArrowDownIcon} />
                </span>
            </Button>
        </Fragment>
    );

    const discountsComponent = sortedDiscounts?.map((discount, index) => {
        return (
            <div key={index} className={priceClass}>
                <span>
                    {' '}
                    {discount.is_promo_code && 'Promo Code: '}
                    <span
                        className={classnames({
                            [classes.discount]: discount.is_promo_code
                        })}
                    >
                        {discount.label}
                    </span>
                </span>
                <span className={classes.discount}>
                    <Price
                        currencyCode={discount.amount.currency}
                        value={-discount.amount.value}
                    />
                </span>
            </div>
        );
    });

    const unavailabilityNotice = isIncludeNotAvailableProducts ? (
        <div className={classes.unavailabilityNotice}>
            <span className={classes.unavailabilityNoticeIcon}>
                <Icon src={InfoIcon} />
            </span>
            <p className={classes.unavailabilityNoticeText}>
                Some of the selected products are not in this store.
                {bossAvailableDate && (
                    <>
                        {' '}
                        Pickup/Curbside will be available in{' '}
                        <span className={classes.unavailabilityNoticeDate}>
                            {bossAvailableDate}
                        </span>
                        .
                    </>
                )}
            </p>
        </div>
    ) : null;

    const headerContents = (
        <Fragment>
            <div className={classes.headingWrapper}>
                <h3 id={id`title`}>
                    {isCartEmpty ? (
                        'Cart'
                    ) : (
                        <Fragment>
                            Cart -{' '}
                            <span className={classes.totalQuantity}>
                                {totalQuantityMessage}
                            </span>
                        </Fragment>
                    )}
                </h3>
                <button
                    className={classes.closeButton}
                    onClick={handleCloseMiniCart}
                    aria-label="Close minicart"
                >
                    <Icon src={CloseIcon} />
                </button>
            </div>
            <div className={classes.stockStatusMessageContainer}>
                <StockStatusMessage hasOutOfStockItem={hasOutOfStockItem} />
            </div>
            {pickupStore}
        </Fragment>
    );

    const body = isCartEmpty ? (
        <div className={classes.bodyEmpty}>
            <div className={classes.emptyCart}>
                <span className={classes.emptyCartIcon}>
                    <Icon src={ShoppingBagLargeIcon} />
                </span>
                <h5>Your shopping cart is empty</h5>
            </div>
        </div>
    ) : (
        <div className={classes.body}>
            {isMobile ? (
                isMobileDetailed ? (
                    <Fragment>
                        {productListComponent}
                        <div className={classes.hideItemsButton}>
                            <Button onClick={toggleMobileDetailed} isShort>
                                Hide all items
                                <span className={classes.expandItemsButtonIcon}>
                                    <Icon src={ArrowUpIcon} />
                                </span>
                            </Button>
                        </div>
                    </Fragment>
                ) : (
                    cartItemsPreview
                )
            ) : (
                productListComponent
            )}
        </div>
    );

    const footerContents = isCartEmpty ? null : (
        <div className={classes.footerContents}>
            {unavailabilityNotice}
            <div className={classes.pricingWrapper}>
                <div className={classes.priceClassSubTotal}>
                    <span className={classes.priceText}>
                        Subtotal (excluding tax){' '}
                    </span>
                    <span>
                        <Price
                            currencyCode={subTotalWithoutSale.currency}
                            value={subTotalWithoutSale.value}
                        />
                    </span>
                </div>
                <div className={priceClass}>
                    <span>Store Pickup</span>
                    <span className={classes.discount}>FREE</span>
                </div>
                {!!youSave.value && (
                    <div className={priceClass}>
                        <span>Sale Savings</span>
                        <span className={classes.discount}>
                            <Price
                                currencyCode={youSave.currency}
                                value={-youSave.value}
                            />
                        </span>
                    </div>
                )}
                {discountsComponent}
                <span className={classes.borderLine} />
                <div className={priceClass}>
                    <button
                        className={classes.promoCodeToggle}
                        onClick={togglePromoCodeInputVisible}
                    >
                        Promo code
                        <span className={promoCodeArrowClasses}>
                            {isPromoCodeInputVisible ? (
                                <Icon src={ArrowUpIcon} />
                            ) : (
                                <Icon src={ArrowDownIcon} />
                            )}
                        </span>
                    </button>
                </div>
            </div>
            {isPromoCodeInputVisible && (
                <div className={classes.promoCodeInputWrapper}>
                    <CouponCode setIsCartUpdating={setIsCartUpdating} />
                </div>
            )}
            <BonusRewards grandTotal={grandTotal?.value} />
        </div>
    );

    const checkoutButton = isCartEmpty ? null : (
        <div className={classes.checkoutButtonWrapper}>
            <Button
                onClick={handleProceedToCheckout}
                priority="high"
                disabled={
                    loading || !pickupStoreData.allowPickup || hasOutOfStockItem
                }
            >
                <span className={classes.checkoutPrice}>
                    <span className={classes.checkoutText}>Checkout</span>{' '}
                    <Price
                        currencyCode={grandTotal.currency}
                        value={grandTotal.value}
                    />
                </span>
            </Button>
        </div>
    );

    return (
        <Fragment>
            <div
                className={rootClass}
                id="minicart"
                role="dialog"
                aria-modal={true}
                aria-labelledby={id`title`}
            >
                <div className={contentsClass} ref={miniCartContentRef}>
                    <div>{headerContents}</div>
                    {body}
                    <div className={classes.footer}>
                        {footerContents}
                        {!isMobile && checkoutButton}
                    </div>
                </div>
                {isMobile && !isCartEmpty && checkoutButton}
            </div>
        </Fragment>
    );
};

MiniCart.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        contents: string,
        contents_open: string,
        header: string,
        body: string,
        footer: string,
        checkoutButton: string,
        editCartButton: string,
        emptyCart: string,
        emptyMessage: string,
        stockStatusMessageContainer: string
    }),
    isOpen: bool,
    setIsOpen: func
};

export default MiniCart;
