import { bool } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { Info as InfoIcon } from '@app/components/Icons';

import classes from './stockStatusMessage.module.css';

const StockStatusMessage = ({ hasOutOfStockItem }) => {
    return hasOutOfStockItem ? (
        <div className={classes.root}>
            <span className={classes.iconWrapper}>
                <Icon src={InfoIcon} />
            </span>
            <span>
                Some items in your cart are currently out-of-stock and must be
                removed in order to Checkout.
            </span>
        </div>
    ) : null;
};

StockStatusMessage.propTypes = {
    hasOutOfStockItem: bool.isRequired
};

export default StockStatusMessage;
