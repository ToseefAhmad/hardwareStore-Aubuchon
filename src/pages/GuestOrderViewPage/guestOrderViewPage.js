import { shape, string } from 'prop-types';
import React from 'react';

import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

import OrderDetails from '@app/components/OrderDetails';

import classes from './guestOrderViewPage.module.css';
import GuestOrderViewPageShimmer from './guestOrderViewPage.shimmer';
import { useGuestOrderViewPage } from './useGuestOrderViewPage';

const GuestOrderViewPage = () => {
    const {
        orderInfo,
        pickupUrl,
        isError,
        isLoading,
        itemGroups,
        canceledItemsPriceAndDiscountValues
    } = useGuestOrderViewPage();

    if (!orderInfo?.id && isLoading) {
        return <GuestOrderViewPageShimmer />;
    }

    return (
        <article className={classes.root}>
            <StoreTitle>Order Information</StoreTitle>
            <header className={classes.header}>
                <h1 className={classes.title}>Order Information</h1>
            </header>
            <section className={classes.content}>
                <OrderDetails
                    orderInfo={isObjectEmpty(orderInfo) ? undefined : orderInfo}
                    isError={isError}
                    isLoading={isLoading}
                    isShowBackButton={false}
                    itemGroups={itemGroups}
                    canceledItemsPriceAndDiscountValues={
                        canceledItemsPriceAndDiscountValues
                    }
                    pickupUrl={pickupUrl}
                />
            </section>
        </article>
    );
};

GuestOrderViewPage.propTypes = {
    classes: shape({
        root: string,
        header: string,
        title: string,
        content: string
    })
};

export default GuestOrderViewPage;
