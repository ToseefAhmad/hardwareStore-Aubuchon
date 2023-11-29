import { Form } from 'informed';
import { func } from 'prop-types';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { IStoreListItem } from '../../../propTypes';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Cart } from '@app/components/Icons';
import ProductAvailability from '@app/components/ProductAvailability';
import StoresItem from '@app/components/StoresItem';
import { isRequired } from '@app/overrides/venia-ui/util/formValidators';

import classes from './listItem.module.css';
import Quantity from './Quantity';
import { useListItem } from './useListItem';

const CheckNearbyStoresPopupListItem = props => {
    const {
        store: { id, city, region_code, schedule, specialDays, brand, url_key },
        product: {
            sku,
            pickup_store_inventory: { qty }
        },
        distance,
        onSubmit
    } = props;

    const { handleSubmit } = useListItem({
        store: { id, brand },
        product: { sku },
        onSubmit
    });

    const data = useMemo(() => {
        return {
            id,
            city,
            region_code,
            schedule,
            specialDays,
            distance,
            brand,
            url_key
        };
    }, [
        id,
        city,
        region_code,
        schedule,
        specialDays,
        distance,
        brand,
        url_key
    ]);

    return (
        <li className={classes.root}>
            <StoresItem
                data={data}
                isHyphen={true}
                isSelectStoreButton={false}
                classes={{
                    root: classes.storesItemRoot,
                    statusOpen: classes.open,
                    statusClose: classes.close,
                    content: classes.storesItemContent,
                    info: classes.storesItemInfo,
                    workHours: classes.workHours
                }}
            />
            <div className={classes.actions}>
                <div className={classes.availableInfo}>
                    <ProductAvailability
                        data={props.product.pickup_store_inventory}
                        isCheckNearbyStores={false}
                        isStoreName={false}
                    />
                </div>
                <Form className={classes.form} onSubmit={handleSubmit}>
                    <Quantity
                        maxValue={qty}
                        id={id}
                        initialValue={1}
                        validate={isRequired}
                        minValue={1}
                    />
                    <Button
                        classes={{
                            primary: classes.addToCartButton
                        }}
                        type="submit"
                        priority="high"
                    >
                        <Icon src={Cart} />
                        <FormattedMessage
                            id="checkNearbyStoresPopupStoresList.addToCartText"
                            defaultMessage="Add"
                        />
                    </Button>
                </Form>
            </div>
        </li>
    );
};

CheckNearbyStoresPopupListItem.propTypes = {
    ...IStoreListItem,
    onSubmit: func.isRequired
};

export default CheckNearbyStoresPopupListItem;
