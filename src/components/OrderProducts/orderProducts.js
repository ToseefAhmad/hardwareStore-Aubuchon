import { arrayOf, string } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import {
    ChevronDown as ArrowDownIcon,
    ChevronUpSmall as ArrowUpIcon
} from '@app/components/Icons';

import OrderProductsList from './List';
import classes from './orderProducts.module.css';
import { IOrderProduct } from './types';
import { useOrderProducts } from './useOrderProducts';

const OrderProducts = props => {
    const { items, productUrlSuffix } = props;

    const { isExpanded, toggleExpanded, openExpanded } = useOrderProducts();
    return (
        <section className={classes.root}>
            <OrderProductsList
                items={items}
                productUrlSuffix={productUrlSuffix}
                isExpanded={isExpanded}
                openExpanded={openExpanded}
            />
            <Button
                classes={{ secondary: classes.button }}
                onClick={toggleExpanded}
            >
                <p className={classes.buttonText}>
                    {isExpanded ? 'Hide' : 'View'} all items
                    <Icon
                        classes={{
                            icon: classes.buttonIcon
                        }}
                        src={isExpanded ? ArrowUpIcon : ArrowDownIcon}
                    />
                </p>
            </Button>
        </section>
    );
};

OrderProducts.propTypes = {
    items: arrayOf(IOrderProduct).isRequired,
    productUrlSuffix: string.isRequired
};

export default OrderProducts;
