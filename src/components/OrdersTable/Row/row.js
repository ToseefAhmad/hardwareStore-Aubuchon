import { APP_ROUTER_PATHS } from '@app-constants';
import classnames from 'classnames';
import { number, shape, string } from 'prop-types';
import React from 'react';
import { generatePath } from 'react-router-dom';

import Image from '@magento/venia-ui/lib/components/Image';

import Link from '@app/components/Link';

import { ORDER_STATUSES } from '../constants';
import StatusChip from '../StatusChip';
import classes from './row.module.css';

const OrdersTableRow = props => {
    const {
        status,
        brand,
        shippingAddress,
        orderNumber,
        orderDate,
        total
    } = props;

    return (
        <li
            className={classnames(classes.root, {
                [classes.defaultRow]:
                    status !== ORDER_STATUSES.ready_for_pickup,
                [classes.highlightRow]:
                    status === ORDER_STATUSES.ready_for_pickup
            })}
        >
            <div className={classes.cell}>
                <StatusChip status={status} />
            </div>
            <div className={classes.cell}>
                <Image
                    classes={{ image: classes.logo }}
                    src={brand.logoUrl}
                    alt={brand.title}
                />
                <p className={classes.addressValue}>{shippingAddress}</p>
            </div>
            <div className={classes.cell}>
                <span className={classes.valueLabel}>Order Number:</span>{' '}
                <span className={classes.value}>#{orderNumber}</span>
            </div>
            <div className={classes.cell}>
                <span className={classes.valueLabel}>Date:</span>{' '}
                <span className={classes.value}>{orderDate}</span>
            </div>
            <div className={classes.cell}>
                <span className={classes.valueLabel}>Order total:</span>{' '}
                <span className={classes.value}>$ {total}</span>
            </div>
            <div className={classes.cell}>
                <Link
                    className={classes.link}
                    to={generatePath(APP_ROUTER_PATHS.orderViewPage, {
                        orderNumber
                    })}
                    priority="secondary"
                >
                    View Order
                </Link>
            </div>
        </li>
    );
};

OrdersTableRow.propTypes = {
    status: string.isRequired,
    brand: shape({
        title: string.isRequired,
        logoUrl: string.isRequired
    }).isRequired,
    shippingAddress: string.isRequired,
    orderNumber: string.isRequired,
    orderDate: string.isRequired,
    total: number.isRequired
};

export default OrdersTableRow;
