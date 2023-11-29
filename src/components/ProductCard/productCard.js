import classnames from 'classnames';
import { bool, func, number, object, shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useStyle } from '@magento/peregrine/lib/context/style';
import Image from '@magento/venia-ui/lib/components/Image';

import Link from '@app/components/Link';
import Price from '@app/components/Price';
import ProductAvailability from '@app/components/ProductAvailability';

import AddToCartButton from './AddToCart/addToCartButton';
import defaultClasses from './productCard.module.css';
import ProductCardShimmer from './productCard.shimmer';
import Rating from './Rating';
import { useProductCard } from './useProductCard';

/**
 * Basic product card
 */
const ProductCard = ({
    classes: propsClasses,
    closeHandler,
    configurableThumbnailSource,
    configuredVariant,
    isMiniCart,
    isTwoColumns,
    product,
    size: propsSize,
    storeConfig,
    onlyImage,
    origin,
    searchTerm,
    category,
    position,
    isPaintFeeItem,
    cartItemUid,
    isPaintDataLoading,
    showOnlySmallThumbnails,
    quantityIsVisible,
    productTypeLocation
}) => {
    const {
        badge,
        id,
        imageUrl,
        maxQty,
        name,
        price,
        rating,
        size,
        sku,
        url,
        fullUrl,
        units,
        productType,
        pickupStoreInventory,
        isInStock,
        specialOrder,
        handleToggleModal
    } = useProductCard({
        isTwoColumns,
        product,
        propsSize,
        storeConfig,
        configuredVariant
    });

    const [, { dispatch }] = useEventingContext();
    const classes = useStyle(defaultClasses, propsClasses);
    const rootPrefix = isMiniCart
        ? 'Cart'
        : isTwoColumns && !onlyImage
        ? 'Columns'
        : showOnlySmallThumbnails
        ? 'Small'
        : 'Rows';
    const twoColumnsPrefix = isTwoColumns && !onlyImage ? 'Columns' : '';
    const contentClasses = classes[`content${rootPrefix}`];
    const infoClasses = rating > 0 ? classes.info : classes.infoFull;
    const imageEl = (
        <Image
            classes={{
                image: classes.image,
                loaded: classes.loaded
            }}
            alt={name}
            width={showOnlySmallThumbnails ? 70 : size.width}
            height={showOnlySmallThumbnails ? 70 : size.height}
            ratio={size.width / size.height}
            resource={
                configurableThumbnailSource === 'itself' && configuredVariant
                    ? configuredVariant.thumbnail.url
                    : imageUrl
            }
        />
    );
    const buttonClasses = classes.button || {};
    return (
        <div className={classes[`root${rootPrefix}`]}>
            {!(product && Object.keys(product).length) || isPaintDataLoading ? (
                <ProductCardShimmer
                    imageWidth={size.width}
                    imageHeight={size.height}
                    isTwoColumns={isTwoColumns}
                    onlyImage={onlyImage || showOnlySmallThumbnails}
                />
            ) : (
                <Fragment>
                    <div
                        className={classnames(classes.imageContainer, {
                            [classes.smallThumbnail]: showOnlySmallThumbnails
                        })}
                    >
                        {badge && <p className={classes.label}>{badge}</p>}
                        {isPaintFeeItem ? (
                            imageEl
                        ) : (
                            <Link
                                to={url}
                                onClick={() => {
                                    closeHandler();
                                    dispatch({
                                        type: 'PRODUCT_CLICK',
                                        payload: {
                                            name,
                                            sku,
                                            origin,
                                            category,
                                            position
                                        }
                                    });
                                    dispatch({
                                        type: 'KLEVU_PRODUCT_CLICK',
                                        payload: {
                                            id,
                                            name,
                                            sku,
                                            url: fullUrl,
                                            origin,
                                            searchTerm,
                                            category,
                                            position
                                        }
                                    });
                                }}
                            >
                                {imageEl}
                            </Link>
                        )}
                        {(isInStock || specialOrder || isPaintFeeItem) &&
                            !showOnlySmallThumbnails && (
                                <div className={classes.addToCart}>
                                    <AddToCartButton
                                        item={product}
                                        cartItemUid={cartItemUid}
                                        urlSuffix={
                                            storeConfig?.product_url_suffix
                                        }
                                        isMiniCart={isMiniCart}
                                        maxQty={maxQty}
                                        isLightened={true}
                                        isPaintFeeItem={isPaintFeeItem}
                                        classes={buttonClasses}
                                        quantityIsVisible={quantityIsVisible}
                                        productTypeLocation={
                                            productTypeLocation
                                        }
                                    />
                                </div>
                            )}
                    </div>
                    {!isMiniCart && !onlyImage && !showOnlySmallThumbnails && (
                        <div className={contentClasses}>
                            <div className={infoClasses}>
                                <p className={classes.sku}>
                                    <b>SKU:</b> {sku}
                                </p>
                                {rating > 0 && (
                                    <Fragment>
                                        <div className={classes.separator} />
                                        <Rating rating={rating} />
                                    </Fragment>
                                )}
                            </div>
                            <Link
                                className={classes[`name${twoColumnsPrefix}`]}
                                to={url}
                                onClick={() => {
                                    dispatch({
                                        type: 'PRODUCT_CLICK',
                                        payload: {
                                            name,
                                            sku,
                                            origin,
                                            category,
                                            position
                                        }
                                    });
                                    dispatch({
                                        type: 'KLEVU_PRODUCT_CLICK',
                                        payload: {
                                            id,
                                            name,
                                            sku,
                                            url: fullUrl,
                                            origin,
                                            searchTerm,
                                            category,
                                            position
                                        }
                                    });
                                }}
                            >
                                {name}
                            </Link>
                            <div className={classes.priceWrapper}>
                                {units && (
                                    <span className={classes.units}>
                                        {units}s from
                                    </span>
                                )}
                                <Price
                                    value={price.value}
                                    oldValue={price.oldValue}
                                    maxValue={price.max}
                                    minValue={price.min}
                                    currencyCode={price.currency}
                                    classes={{
                                        root: classes.priceRoot,
                                        price: classes.price,
                                        newPrice: classes.newPrice,
                                        oldPrice: classes.oldPrice
                                    }}
                                />
                            </div>
                            <ProductAvailability
                                data={pickupStoreInventory}
                                onCheckNearbyStoresClick={handleToggleModal}
                                isCheckNearbyStores={!isInStock}
                                productType={productType}
                                categories={product.simple_categories}
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
};

ProductCard.propTypes = {
    classes: shape({
        addToCart: string,
        content: string,
        contentColumns: string,
        contentHidden: string,
        image: string,
        imageContainer: string,
        info: string,
        infoFull: string,
        label: string,
        loaded: string,
        name: string,
        nameColumns: string,
        newPrice: string,
        oldPrice: string,
        price: string,
        root: string,
        rootColumns: string,
        separator: string,
        sku: string,
        button: object
    }),
    showOnlySmallThumbnails: bool,
    closeHandler: func,
    configurableThumbnailSource: string,
    configuredVariant: shape({
        thumbnail: shape({
            url: string
        })
    }),
    isMiniCart: bool,
    isTwoColumns: bool,
    onlyImage: bool,
    product: shape({
        id: number,
        uid: string.isRequired,
        name: string.isRequired,
        small_image: shape({
            url: string.isRequired
        }),
        stock_status: string.isRequired,
        __typename: string.isRequired,
        url_key: string.isRequired,
        sku: string.isRequired,
        price_range: shape({
            maximum_price: shape({
                regular_price: shape({
                    value: number,
                    currency: string
                }),
                final_price: shape({
                    value: number,
                    currency: string
                }),
                discount: shape({
                    amount_off: number
                })
            }),
            minimum_price: shape({
                final_price: shape({
                    value: number,
                    currency: string
                })
            })
        }),
        review_rating: number,
        pickup_store_inventory: shape({
            qty: number.isRequired,
            bopis_available: string.isRequired,
            boss_eligible: bool,
            boss_qty: number,
            location: string.isRequired,
            store_name: string.isRequired
        }).isRequired
    }),
    size: shape({
        desktop: shape({
            width: number,
            height: number
        }),
        mobile: shape({
            width: number,
            height: number
        }),
        twoColumns: shape({
            width: number,
            height: number
        })
    }),
    storeConfig: object,
    origin: string,
    searchTerm: string,
    category: string,
    position: number,
    isPaintFeeItem: bool,
    maxQty: number,
    cartItemUid: string,
    isPaintDataLoading: bool,
    quantityIsVisible: bool,
    productTypeLocation: string
};

ProductCard.defaultProps = {
    closeHandler: () => {},
    isMiniCart: false,
    isTwoColumns: false,
    onlyImage: false,
    origin: 'plp',
    searchTerm: '',
    category: '',
    position: 1,
    isPaintFeeItem: false,
    size: {
        desktop: { width: 230, height: 230 },
        mobile: { width: 145, height: 145 },
        twoColumns: { width: 120, height: 120 }
    },
    isPaintDataLoading: false,
    quantityIsVisible: false,
    productTypeLocation: ''
};

export default ProductCard;
