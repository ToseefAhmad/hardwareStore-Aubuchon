import React from 'react';

import Group from './Group';
import classes from './orderItems.module.css';
import { formatDate, useOrderItems } from './useOrderItems';

const OrderItems = () => {
    const {
        city,
        region_code,
        groupedOrderItems,
        storeUrlSuffix
    } = useOrderItems();

    return (
        <div className={classes.root}>
            <>
                {Object.keys(groupedOrderItems).map(key => (
                    <div className={classes.group} key={key}>
                        <p className={classes.title}>
                            Pickup{' '}
                            <span className={classes.strong}>
                                {formatDate(key)} in {city}, {region_code}
                            </span>
                        </p>
                        <Group
                            items={groupedOrderItems[key]}
                            storeUrlSuffix={storeUrlSuffix}
                        />
                    </div>
                ))}
            </>
        </div>
    );
};

export default OrderItems;
