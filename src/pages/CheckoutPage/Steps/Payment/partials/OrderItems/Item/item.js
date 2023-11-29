import classnames from 'classnames';
import { arrayOf, bool, number, oneOf, shape, string } from 'prop-types';
import React from 'react';

import configuredVariant from '@magento/peregrine/lib/util/configuredVariant';

import ItemOptions from '@app/components/MiniCart/ProductList/itemOptions';
import ProductPreview from '@app/components/MiniCart/productPreview';
import Price from '@app/components/Price';

import classes from './item.module.css';
import { useItem } from './useItem';

const Item = ({ item, storeUrlSuffix, isHidden, showFull }) => {
    const {
        quantity,
        product,
        prices,
        configurable_options,
        customizable_options,
        is_paint_fee
    } = item;

    const {
        isDiscount,
        regularPrice,
        priceWithDiscount,
        totalPriceWithDiscount,
        regularTotalPrice,
        isMobile
    } = useItem({
        prices,
        quantity,
        product,
        configurable_options,
        customizable_options,
        is_paint_fee
    });
    const configured_variant = configuredVariant(configurable_options, product);

    const currency = prices.price.currency;

    return (
        <div
            className={classnames(classes.root, {
                [classes.hidden]: isHidden,
                [classes.rootFull]: showFull
            })}
        >
            <ProductPreview
                key={item.uid}
                {...item}
                storeUrlSuffix={storeUrlSuffix}
                classes={{
                    thumbnail: classes.thumbnail,
                    thumbnailContainer: classnames(classes.thumbnailContainer, {
                        [classes.thumbnailContainerFull]: showFull
                    }),
                    quantity: classnames(classes.quantity, {
                        [classes.quantityFull]: showFull
                    })
                }}
            />
            {showFull && (
                <div
                    className={classnames(classes.info, {
                        [classes.infoFull]: showFull
                    })}
                >
                    <div>
                        <p className={classes.name}>{product.name}</p>
                        {configured_variant && (
                            <ItemOptions
                                classes={{
                                    item: classes.optionItems,
                                    list: classes.optionList
                                }}
                                configurableOptions={configurable_options}
                                customizableOptions={customizable_options}
                            />
                        )}
                    </div>
                    <div>
                        {isDiscount && (
                            <span className={classes.priceWithDiscount}>
                                <Price
                                    currencyCode={currency}
                                    value={
                                        isMobile
                                            ? totalPriceWithDiscount
                                            : priceWithDiscount
                                    }
                                />{' '}
                            </span>
                        )}
                        {isMobile && (
                            <span>
                                <span
                                    className={classnames(classes.totalPrice, {
                                        [classes.totalPrice_crossed]: isDiscount
                                    })}
                                >
                                    <Price
                                        currencyCode={currency}
                                        value={regularTotalPrice}
                                    />
                                </span>{' '}
                                /{' '}
                            </span>
                        )}
                        <span
                            className={classnames(classes.eachPrice, {
                                [classes.eachPrice_crossed]: isDiscount
                            })}
                        >
                            <Price
                                currencyCode={currency}
                                value={
                                    isMobile ? priceWithDiscount : regularPrice
                                }
                            />{' '}
                            {isMobile && 'each'}
                        </span>
                    </div>
                    {!isMobile && (
                        <div className={classes.totalPriceFull}>
                            <Price
                                currencyCode={currency}
                                value={totalPriceWithDiscount}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

Item.defaultProps = {
    isHidden: false,
    showFull: false
};

Item.propTypes = {
    item: shape({
        uid: string,
        product: shape({
            name: string,
            thumbnail: shape({
                url: string
            })
        }),
        prices: shape({
            price: shape({
                currency: string,
                value: number
            }),
            total_item_discount: shape({
                value: number
            })
        }),
        quantity: number,
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
        configured_variant: shape({
            thumbnail: shape({
                url: string
            })
        }),
        configurableThumbnailSource: oneOf(['parent', 'itself'])
    }),
    storeUrlSuffix: string,
    isHidden: bool,
    showFull: bool
};

export default Item;
