import React from 'react';

import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

import CurbsidePickup from '@app/components/CurbsidePickup';
import Icon from '@app/components/Icon';
import { ChevronLeftSmall } from '@app/components/Icons';
import Link from '@app/components/Link';

import classes from './guestOrderPickupPage.module.css';
import GuestOrderPickupPageShimmer from './guestOrderPickupPage.shimmer';
import { useGuestOrderPickupPage } from './useGuestOrderPickupPage';

const GuestOrderPickupPage = () => {
    const {
        backUrl,
        canceledItemsPriceAndDiscountValues,
        orderInfo,
        orderProducts,
        isError,
        isMobile,
        isLoading,
        isSubmitting,
        hasBeenSubmitted,
        handleNavBackButtonClick,
        handleCheckInFormSubmit,
        submitButtonRef,
        isSubmitted
    } = useGuestOrderPickupPage();

    if (!orderInfo?.id && isLoading) {
        return <GuestOrderPickupPageShimmer />;
    }

    return (
        <article className={classes.root}>
            <StoreTitle>Order Pickup</StoreTitle>
            <header className={classes.header}>
                <Link
                    className={classes.backLink}
                    to={backUrl}
                    isButtonLike
                    priority="secondary"
                >
                    <Icon src={ChevronLeftSmall} />
                </Link>
                <h1 className={classes.title}>Order Pickup</h1>
            </header>
            <section className={classes.content}>
                <CurbsidePickup
                    canceledItemsPriceAndDiscountValues={
                        canceledItemsPriceAndDiscountValues
                    }
                    isError={isError}
                    isMobile={isMobile}
                    isLoading={isLoading}
                    isSubmitting={isSubmitting}
                    hasBeenSubmitted={hasBeenSubmitted}
                    orderInfo={isObjectEmpty(orderInfo) ? undefined : orderInfo}
                    orderProducts={orderProducts}
                    handleNavBackButtonClick={handleNavBackButtonClick}
                    handleCheckInFormSubmit={handleCheckInFormSubmit}
                    submitButtonRef={submitButtonRef}
                    isSubmitted={isSubmitted}
                />
            </section>
        </article>
    );
};

export default GuestOrderPickupPage;
