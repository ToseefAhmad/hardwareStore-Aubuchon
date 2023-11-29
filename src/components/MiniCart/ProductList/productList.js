import {
    bool,
    string,
    func,
    arrayOf,
    shape,
    number,
    object,
    oneOf
} from 'prop-types';
import React, { useMemo } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Item from './item';
import defaultClasses from './productList.module.css';

const ProductList = props => {
    const {
        items,
        loading,
        handleRemoveItem,
        handleUpdateItemQuantity,
        closeMiniCart,
        configurableThumbnailSource,
        storeUrlSuffix,
        storeConfig
    } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const cartItems = useMemo(() => {
        if (items) {
            return items.map(item => (
                <Item
                    key={item.uid}
                    {...item}
                    loading={loading}
                    closeMiniCart={closeMiniCart}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItemQuantity={handleUpdateItemQuantity}
                    configurableThumbnailSource={configurableThumbnailSource}
                    storeUrlSuffix={storeUrlSuffix}
                    storeConfig={storeConfig}
                />
            ));
        }
    }, [
        items,
        loading,
        closeMiniCart,
        handleRemoveItem,
        handleUpdateItemQuantity,
        configurableThumbnailSource,
        storeUrlSuffix,
        storeConfig
    ]);

    return <div className={classes.root}>{cartItems}</div>;
};

ProductList.propTypes = {
    classes: shape({ root: string }),
    loading: bool,
    items: arrayOf(
        shape({
            product: shape({
                name: string,
                thumbnail: shape({
                    url: string
                }),
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
            quantity: number,
            prices: shape({
                price: shape({
                    currency: string,
                    value: number
                }),
                total_item_discount: shape({
                    value: number
                })
            }),
            max_quantity: number,
            is_paint_fee: bool,
            configurable_options: arrayOf(
                shape({
                    label: string,
                    value: string
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
            })
        })
    ),
    configurableThumbnailSource: oneOf(['parent', 'itself']),
    handleRemoveItem: func,
    handleUpdateItemQuantity: func,
    closeMiniCart: func,
    storeUrlSuffix: string,
    storeConfig: object
};

export default ProductList;
