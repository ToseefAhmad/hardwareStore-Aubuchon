import parse from 'html-react-parser';
import {
    bool,
    string,
    number,
    shape,
    func,
    arrayOf,
    object,
    oneOf
} from 'prop-types';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Icon from '@app/components/Icon';
import { Trash as DeleteIcon, Info as InfoIcon } from '@app/components/Icons';
import Price from '@app/components/Price';
import ProductCard from '@app/components/ProductCard';
import { useTailwindContext } from '@app/context/tailwind';

import defaultClasses from './item.module.css';
import ItemOptions from './itemOptions';
import Quantity from './quantity';
import { useItem } from './useItem.js';

const Item = props => {
    const {
        loading,
        product,
        id,
        prices,
        quantity,
        uid,
        configurable_options,
        customizable_options,
        handleRemoveItem,
        handleUpdateItemQuantity,
        closeMiniCart,
        configurableThumbnailSource,
        storeUrlSuffix,
        storeConfig,
        is_paint_fee,
        quantityIsVisible,
        productTypeLocation
    } = props;

    const classes = useStyle(defaultClasses, props.classes);
    const itemLink = useMemo(
        () => resourceUrl(`/${product.url_key}${storeUrlSuffix || ''}`),
        [product.url_key, storeUrlSuffix]
    );

    const {
        isLoading,
        arePaintColorsLoading,
        removeItem,
        updateItemQuantity,
        totalPrice,
        totalPriceWithDiscount,
        isDiscount,
        maxQty,
        configured_variant,
        isOutOfStock
    } = useItem({
        loading,
        uid,
        prices,
        handleRemoveItem,
        handleUpdateItemQuantity,
        product,
        quantity,
        configurable_options,
        customizable_options,
        is_paint_fee
    });

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;
    const rootClass = isLoading ? classes.root_disabled : classes.root;
    const totalPriceClass = isDiscount
        ? classes.totalPrice_crossed
        : classes.totalPrice;

    const currency = prices.price.currency;

    const cartItemImageFragment = !isMobile && (
        <Image
            alt={product.name}
            classes={{
                root: classes.thumbnail,
                image: classes.image
            }}
            width={58}
            height={58}
            ratio={1}
            resource={
                configurableThumbnailSource === 'itself' && configured_variant
                    ? configured_variant.thumbnail.url
                    : product.thumbnail.url
            }
        />
    );

    return (
        <div className={rootClass}>
            {isMobile ? (
                <ProductCard
                    closeHandler={closeMiniCart}
                    configurableThumbnailSource={configurableThumbnailSource}
                    configuredVariant={configured_variant}
                    cartItemUid={uid}
                    isMiniCart={true}
                    isTwoColumns={true}
                    onlyImage={true}
                    isPaintFeeItem={is_paint_fee}
                    isPaintDataLoading={arePaintColorsLoading}
                    product={product}
                    storeConfig={storeConfig}
                    classes={{
                        button: classes.button,
                        rootCart: classes.rootCart,
                        addToCart: classes.addToCart,
                        imageContainer: classes.productCardImageContainer
                    }}
                    quantityIsVisible={quantityIsVisible}
                    size={{
                        desktop: { width: 120, height: 120 },
                        mobile: { width: 120, height: 120 },
                        twoColumns: { width: 120, height: 120 }
                    }}
                    ratio={1}
                    productTypeLocation={productTypeLocation}
                />
            ) : (
                <div className={classes.thumbnailWrapper}>
                    {arePaintColorsLoading ? (
                        <Shimmer height={'58px'} width={'58px'} />
                    ) : is_paint_fee ? (
                        cartItemImageFragment
                    ) : (
                        <Link
                            to={itemLink}
                            onClick={closeMiniCart}
                            title={product.name}
                        >
                            {cartItemImageFragment}
                        </Link>
                    )}
                </div>
            )}
            {arePaintColorsLoading ? (
                <Shimmer height={'100%'} />
            ) : (
                <div className={classes.details}>
                    {isOutOfStock && (
                        <div className={classes.outOfStockNotice}>
                            <span>OUT OF STOCK</span>
                        </div>
                    )}
                    <div className={classes.nameWrapper}>
                        {product.pickup_store_inventory.qty === 0 &&
                            !is_paint_fee && (
                                <Icon
                                    classes={{ icon: classes.notAvailableIcon }}
                                    src={InfoIcon}
                                />
                            )}
                        {is_paint_fee ? (
                            <span className={classes.name}>
                                {parse(product.name)}
                            </span>
                        ) : (
                            <Link
                                className={classes.name}
                                to={itemLink}
                                onClick={closeMiniCart}
                            >
                                {parse(product.name)}
                            </Link>
                        )}
                    </div>
                    {configured_variant && (
                        <ItemOptions
                            configurableOptions={configurable_options}
                            customizableOptions={customizable_options}
                        />
                    )}
                    <div className={classes.contentWrapper}>
                        <div className={classes.content}>
                            {!isMobile && (
                                <div className={classes.quantity}>
                                    <Quantity
                                        itemId={id}
                                        initialValue={quantity}
                                        max={is_paint_fee ? 1000 : maxQty}
                                        onChange={updateItemQuantity}
                                        isPaintFeeItem={is_paint_fee}
                                        disabled={isLoading}
                                    />
                                </div>
                            )}
                            <div>
                                {isDiscount && (
                                    <span className={classes.priceWithDiscount}>
                                        <Price
                                            currencyCode={currency}
                                            value={totalPriceWithDiscount}
                                        />{' '}
                                    </span>
                                )}
                                <span className={totalPriceClass}>
                                    <Price
                                        currencyCode={currency}
                                        value={totalPrice}
                                    />
                                </span>
                            </div>
                        </div>
                        {!is_paint_fee && (
                            <button
                                onClick={removeItem}
                                type="button"
                                className={classes.deleteButton}
                                disabled={isLoading || is_paint_fee}
                                aria-label={`Remove product "${
                                    product.name
                                }" from cart`}
                            >
                                <Icon src={DeleteIcon} />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

Item.propTypes = {
    classes: shape({
        root: string,
        thumbnail: string,
        name: string,
        options: string,
        quantity: string,
        price: string,
        editButton: string,
        editIcon: string
    }),
    loading: bool,
    product: shape({
        name: string,
        thumbnail: shape({
            url: string
        }),
        pickup_store_inventory: shape({
            boss_eligible: bool,
            boss_qty: number,
            qty: number.isRequired
        }).isRequired,
        price_range: shape({
            maximum_price: shape({
                regular_price: shape({
                    value: number,
                    currency: string
                })
            })
        })
    }),
    id: string,
    uid: string,
    quantity: number,
    is_paint_fee: bool,
    storeUrlSuffix: string,
    storeConfig: object,
    configurable_options: arrayOf(
        shape({
            id: number,
            option_label: string,
            value_id: number,
            value_label: string
        })
    ),
    customizable_options: arrayOf(
        shape({
            label: string,
            values: arrayOf(
                shape({
                    value: string
                })
            )
        })
    ),
    prices: shape({
        price: shape({
            currency: string,
            value: number
        }),
        total_item_discount: shape({
            value: number
        })
    }),
    handleRemoveItem: func,
    handleUpdateItemQuantity: func,
    closeMiniCart: func,
    configurableThumbnailSource: oneOf(['parent', 'itself']),
    quantityIsVisible: bool,
    productTypeLocation: string
};

Item.defaultProps = {
    quantityIsVisible: false,
    productTypeLocation: ''
};
export default Item;
