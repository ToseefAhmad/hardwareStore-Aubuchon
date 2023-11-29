import { APP_ROUTER_PATHS } from '@app-constants';
import { arrayOf, bool, node, number, shape, string } from 'prop-types';
import React from 'react';
import { generatePath } from 'react-router-dom';

import Link from '@app/components/Link';

import CreateAccount from '../CreateAccount';
import classes from './infoBlock.module.css';
import { useInfoBlock } from './useInfoBlock';

const InfoBlock = ({ titleNode, showTitle, orderData }) => {
    const { isSignedIn, currentStore } = useInfoBlock();

    const { cart: cartData, orderInfo } = orderData || {};
    const { city, region_code } = currentStore || {};
    const { order_number: orderNumber, status: orderStatus } = orderInfo || {};

    return (
        <div className={classes.root}>
            {showTitle && titleNode}
            <div className={classes.content}>
                <p className={classes.orderStatus}>{orderStatus}</p>
                <p className={classes.orderNumber}>
                    Order Number:{' '}
                    <strong className={classes.strong}>#{orderNumber}</strong>
                </p>
                <p className={classes.orderInfo}>
                    Pickup{' '}
                    <span className={classes.strong}>
                        {cartData?.estimate_delivery} in {city}, {region_code}
                    </span>
                </p>
                {isSignedIn && (
                    <Link
                        to={generatePath(APP_ROUTER_PATHS.orderViewPage, {
                            orderNumber
                        })}
                        className={classes.link}
                    >
                        <span className={classes.buttonContent}>
                            View Order Details
                        </span>
                    </Link>
                )}
            </div>
            {!isSignedIn && <CreateAccount cartData={cartData} />}
            <h2 className={classes.pickupTitle}>Pickup store</h2>
        </div>
    );
};

InfoBlock.defaultProps = {
    showTitle: false
};

InfoBlock.propTypes = {
    titleNode: node,
    showTitle: bool,
    orderData: shape({
        cart: shape({
            id: string,
            email: string,
            estimate_delivery: string,
            billing_address: shape({
                telephone: string,
                firstname: string,
                lastname: string,
                street: arrayOf(string),
                city: string,
                postcode: string,
                country: shape({
                    label: string
                }),
                region: shape({
                    region_id: number
                })
            })
        }),
        orderInfo: shape({
            order_number: string,
            order_status: string
        })
    })
};

export default InfoBlock;
