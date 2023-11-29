import { array, func } from 'prop-types';
import React, { useMemo, useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { useOptionsContext } from '@app/components/ProductOptions/optionsContext';
import Store from '@app/components/ProductOptions/SizeStep/store';
import { MODAL_NAMES } from '@app/components/SimpleModal';
import { usePickupStoreContext } from '@app/context/PickupStore';
import { getSizeStepProductVariant } from '@app/utils/configurableProduct';

import AddToCartButton from '../AddToCart/addToCartButton';
import classes from './sizeStep.module.css';

const checkIsDisabled = (product, color) => {
    return (
        product?.paint_color_multi?.indexOf(color.linked_value) < 0 ||
        product?.pickup_store_inventory?.qty === 0
    );
};

const SizeStep = ({ items }) => {
    const { color, product, optionSelections } = useOptionsContext();
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const [{ allow_pickup }] = usePickupStoreContext();

    const optionSelectionsArray = useMemo(
        () => Array.from(optionSelections.values()),
        [optionSelections]
    );

    const onCheckNearbyStoresClick = useCallback(() => {
        toggleModal({
            identifier: `${MODAL_NAMES.checkNearbyStores}`,
            props: {
                sku: product?.sku
            }
        });
    }, [product?.sku, toggleModal]);

    const tiles = useMemo(
        () =>
            items.map(item => {
                const variant = getSizeStepProductVariant(
                    item,
                    product.variants,
                    optionSelectionsArray,
                    color
                );
                if (!variant) return null;
                const isDisabled = checkIsDisabled(product, color);
                const productPrices =
                    variant?.product?.price_range?.maximum_price;
                const productStoreInventory =
                    variant?.product?.pickup_store_inventory;

                return (
                    <div className={classes.item} key={variant.product.uid}>
                        <Store
                            productStoreInventory={productStoreInventory}
                            label={item.label}
                            prices={productPrices}
                            categories={product.categories}
                            isUnAvailable={isDisabled}
                            onCheckNearbyStoresClick={onCheckNearbyStoresClick}
                        />
                        {variant?.product?.pickup_store_inventory?.qty > 0 &&
                            !isDisabled &&
                            allow_pickup && (
                                <div className={classes.addToCart}>
                                    <AddToCartButton
                                        variant={variant}
                                        selectedColor={color}
                                    />
                                </div>
                            )}
                    </div>
                );
            }),
        [
            items,
            product,
            optionSelectionsArray,
            color,
            onCheckNearbyStoresClick,
            allow_pickup
        ]
    );

    return (
        <>
            <div className={classes.root}>{tiles}</div>
        </>
    );
};

SizeStep.defaultProps = {
    onSelectionChange: () => {}
};

SizeStep.propTypes = {
    items: array,
    onSelectionChange: func
};

export default SizeStep;
