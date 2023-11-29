import React from 'react';

import OrdersTable from '@app/components/OrdersTable';

import classes from './orderHistoryPage.module.css';

const OrderHistoryPage = () => {
    return (
        <div className={classes.root}>
            <OrdersTable pageSize={5} />
        </div>
    );
};

export default OrderHistoryPage;
