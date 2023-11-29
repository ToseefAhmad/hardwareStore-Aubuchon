import classnames from 'classnames';
import { shape, number, string, arrayOf, bool, func } from 'prop-types';
import React, { useMemo } from 'react';

import Price from '@app/components/Price';
import ProductAvailability from '@app/components/ProductAvailability';

import classes from './store.module.css';

const Store = ({
    productStoreInventory,
    label,
    prices,
    categories,
    isUnAvailable,
    onCheckNearbyStoresClick
}) => {
    const {
        final_price: finalPrice,
        regular_price: regularPrice,
        discount
    } = prices;

    const currentPrice = useMemo(
        () =>
            discount?.amount_off
                ? regularPrice.value - discount.amount_off
                : finalPrice.value,
        [finalPrice, discount, regularPrice]
    );

    return (
        <div
            className={classnames(classes.root, {
                [classes.unAvailable]: isUnAvailable
            })}
        >
            <div>
                <div className={classes.stock}>
                    <span className={classes.label}>{label}:</span>
                    <Price
                        value={currentPrice}
                        oldValue={regularPrice.value}
                        currencyCode={finalPrice.currency}
                        classes={{
                            price: classes.price,
                            newPrice: classes.newPrice,
                            oldPrice: classes.oldPrice
                        }}
                    />
                </div>
                <div className={classes.availableInfo}>
                    <ProductAvailability
                        data={productStoreInventory}
                        isCheckNearbyStores={true}
                        classes={{
                            root: classnames(classes.availableInfoRoot, {
                                [classes.unAvailableInfoRoot]: isUnAvailable
                            }),
                            link: classes.link,
                            paragraph: classes.paragraph,
                            stockInfo: classes.stockInfo,
                            stock: classes.availableInfoStock,
                            icon: classes.icon,
                            notInStock: classes.notInStock,
                            categoryLink: classes.categoryLink
                        }}
                        categories={categories}
                        isProductView={true}
                        onCheckNearbyStoresClick={onCheckNearbyStoresClick}
                        skipSimilar={true}
                    />
                </div>
            </div>
        </div>
    );
};

Store.defaultProps = {
    isUnAvailable: false,
    onCheckNearbyStoresClick: () => {}
};

Store.propTypes = {
    productStoreInventory: shape({
        qty: number,
        price: number,
        special_price: number,
        store_name: string,
        location: string,
        bopis_available: string,
        boss_available: string
    }),
    label: string,
    prices: shape({
        final_price: shape({
            currency: string.isRequired,
            value: number.isRequired
        }).isRequired,
        regular_price: shape({
            currency: string,
            value: number
        }),
        discount: shape({
            amount_off: number
        })
    }),
    categories: arrayOf(
        shape({
            uid: string,
            level: number,
            url_path: string,
            url_suffix: string
        })
    ),
    isUnAvailable: bool,
    onCheckNearbyStoresClick: func
};

export default Store;
