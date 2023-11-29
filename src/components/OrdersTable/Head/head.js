import React from 'react';

import classes from './head.module.css';

const HEADINGS = ['Status', 'Store', 'Order Number', 'Date', 'Order Total'];

const OrdersTableHead = () => (
    <li className={classes.root}>
        {HEADINGS.map(text => (
            <span key={text}>{text}</span>
        ))}
    </li>
);

export default OrdersTableHead;
