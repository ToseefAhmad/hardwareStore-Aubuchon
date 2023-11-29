import classnames from 'classnames';
import { arrayOf, bool, func, string } from 'prop-types';
import React from 'react';

import { IOrderProduct } from '../types';
import classes from './list.module.css';
import OrderProductsListItem from './ListItem';

const OrderProductsList = props => {
    const { items, productUrlSuffix, isExpanded, openExpanded } = props;

    return (
        <ul
            className={classnames(classes.root, {
                [classes.isExpanded]: isExpanded
            })}
        >
            <li className={classes.header}>
                <span>Status</span>
                <span />
                <span>Price Each</span>
                <span>Subtotal</span>
                <span>Savings</span>
                <span>Item Total</span>
            </li>
            {items.map((itemData, idx) => (
                <OrderProductsListItem
                    key={idx}
                    itemData={itemData}
                    productUrlSuffix={productUrlSuffix}
                    isExpanded={isExpanded}
                    openExpanded={openExpanded}
                />
            ))}
            {items.length > 3 && !isExpanded && (
                <li className={classes.counterListItem}>+{items.length - 3}</li>
            )}
        </ul>
    );
};

OrderProductsList.propTypes = {
    items: arrayOf(IOrderProduct).isRequired,
    productUrlSuffix: string.isRequired,
    isExpanded: bool,
    openExpanded: func.isRequired
};

export default OrderProductsList;
