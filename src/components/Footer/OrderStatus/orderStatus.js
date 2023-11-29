import { APP_ROUTER_PATHS } from '@app-constants';
import React from 'react';

import Link from '@app/components/Link';

import classes from './orderStatus.module.css';

const OrderStatus = () => (
    <div className={classes.root}>
        <h4 className={classes.title}>Order Status</h4>
        <p className={classes.text}>
            Track orders and check in for curbside pickups!
        </p>
        <Link
            to={APP_ROUTER_PATHS.orderHistory}
            className={classes.button}
            isButtonLike
        >
            Order Status
        </Link>
    </div>
);

export default OrderStatus;
