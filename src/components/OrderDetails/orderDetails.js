import { ORDER_STATUS_CODES } from '@app-constants';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import EmptyContent from '@app/components/EmptyContent';
import Link from '@app/components/Link';
import { IOrderInfo } from '@app/components/OrderDetails/types';
import OrderNavigation from '@app/components/OrderNavigation';
import OrderProducts from '@app/components/OrderProducts';
import { IOrderProduct } from '@app/components/OrderProducts/types';
import Section from '@app/components/Section';

import AdditionalInfo from './AdditionalInfo';
import defaultClasses from './orderDetails.module.css';
import OrderDetailsShimmer from './orderDetails.shimmer';
import StatusProgressBar from './StatusProgressBar';
import SummarySections from './SummarySections';

const OrderDetails = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const {
        orderInfo,
        isError,
        isMobile,
        isLoading,
        isShowBackButton,
        handleNavBackButtonClick,
        itemGroups,
        canceledItemsPriceAndDiscountValues,
        pickupUrl
    } = props;

    let content = <OrderDetailsShimmer />;

    if (isError) {
        content = (
            <EmptyContent
                content={'something went wrong. Please refresh and try again'}
            />
        );
    } else if (orderInfo?.id) {
        content = (
            <>
                <OrderNavigation
                    orderInfo={orderInfo}
                    canceledItemsPriceAndDiscountValues={
                        canceledItemsPriceAndDiscountValues
                    }
                    isShowBackButton={isShowBackButton && !isMobile}
                    handleBack={handleNavBackButtonClick}
                />
                <SummarySections
                    orderInfo={orderInfo}
                    canceledItemsPriceAndDiscountValues={
                        canceledItemsPriceAndDiscountValues
                    }
                />
                <div className={classes.items}>
                    {itemGroups.map(({ key, items, status }) => (
                        <Section key={key}>
                            <Section.Title>{status.title}</Section.Title>
                            <StatusProgressBar
                                statusCode={status.status_code}
                            />
                            <AdditionalInfo
                                orderInfo={orderInfo}
                                completed={
                                    status.status_code ===
                                    ORDER_STATUS_CODES.complete
                                }
                            />
                            {status.status_code ===
                                ORDER_STATUS_CODES.ready_for_pickup && (
                                <Link
                                    to={pickupUrl}
                                    className={classes.checkInLink}
                                    isButtonLike
                                >
                                    Check In Online
                                </Link>
                            )}
                            <OrderProducts
                                items={items}
                                productUrlSuffix={orderInfo.product_url_suffix}
                            />
                        </Section>
                    ))}
                </div>
            </>
        );
    } else if (!isLoading) {
        content = <EmptyContent content={'cannot find your order!'} />;
    }

    return <div className={classes.root}>{content}</div>;
};

OrderDetails.propTypes = {
    classes: shape({
        root: string,
        checkInLink: string,
        items: string
    }),
    orderInfo: IOrderInfo,
    itemGroups: arrayOf(
        shape({
            key: string.isRequired,
            status: shape({
                title: string,
                status_code: string
            }).isRequired,
            items: arrayOf(IOrderProduct).isRequired
        })
    ),
    canceledItemsPriceAndDiscountValues: shape({
        price: number.isRequired,
        discount: number.isRequired
    }),
    handleNavBackButtonClick: func,
    isError: shape({
        message: string
    }),
    isMobile: bool,
    isLoading: bool,
    pickupUrl: string,
    isShowBackButton: bool
};

OrderDetails.defaultProps = {
    isShowBackButton: true
};

export default OrderDetails;
