import PropTypes, {
    arrayOf,
    bool,
    func,
    number,
    shape,
    string
} from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import EmptyContent from '@app/components/EmptyContent';
import GoogleMaps from '@app/components/GoogleMaps';
import OrderNavigation from '@app/components/OrderNavigation';
import OrderProducts from '@app/components/OrderProducts';
import Section from '@app/components/Section';
import StoreDetails from '@app/components/StoreDetails';
import StoreMap from '@app/components/StoreMap';

import CheckInForm from './CheckInForm';
import defaultClasses from './curbsidePickup.module.css';
import OrderCurbsidePickupPageShimmer from './curbsidePickup.shimmer';

const CheckBrowserCompatibility = React.lazy(() =>
    import('@app/components/CheckBrowserCompatibilty/checkBrowserCompatibilty')
);

const CurbsidePickup = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const {
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
    } = props;

    let content = <OrderCurbsidePickupPageShimmer />;

    if (isError) {
        content = (
            <EmptyContent
                content={'something went wrong. Please refresh and try again'}
            />
        );
    } else if (orderInfo?.id) {
        const map = (
            <GoogleMaps>
                <StoreMap
                    locations={[orderInfo.pickup_store]}
                    cssClasses={[classes.map]}
                    zoomControl={true}
                    draggable={false}
                    isFullBleed={isMobile}
                    infoIsOpened={true}
                />
            </GoogleMaps>
        );

        content = (
            <>
                <div className={classes.desktopNavWrapper}>
                    <OrderNavigation
                        orderInfo={orderInfo}
                        handleBack={handleNavBackButtonClick}
                        canceledItemsPriceAndDiscountValues={
                            canceledItemsPriceAndDiscountValues
                        }
                    />
                </div>
                {orderInfo?.pickup_store?.allow_curbside &&
                    (hasBeenSubmitted ? (
                        <Section classes={{ root: classes.sectionRoot }}>
                            <Section.Title>
                                Request sent to store team!
                            </Section.Title>
                            <div className={classes.section}>
                                <p className={classes.text}>
                                    This will only take a few minutes ― THANK
                                    YOU for your patience
                                </p>
                            </div>
                        </Section>
                    ) : (
                        <Section classes={{ root: classes.sectionRoot }}>
                            <Section.Title>
                                Let us know when you get here!
                            </Section.Title>
                            <div className={classes.section}>
                                <CheckInForm
                                    isLoading={isSubmitting}
                                    onSubmit={handleCheckInFormSubmit}
                                    submitButtonRef={submitButtonRef}
                                    isSubmitted={isSubmitted}
                                />
                            </div>
                        </Section>
                    ))}
                <Section classes={{ root: classes.mobileNavWrapper }}>
                    <Section.Title>Order Details</Section.Title>
                    <OrderNavigation
                        orderInfo={orderInfo}
                        isShowBackButton={false}
                        canceledItemsPriceAndDiscountValues={
                            canceledItemsPriceAndDiscountValues
                        }
                    />
                </Section>
                <Section>
                    <Section.Title
                        classes={{ root: classes.productSectionTitle }}
                    >
                        Products
                    </Section.Title>
                    <OrderProducts
                        items={orderProducts}
                        productUrlSuffix={orderInfo.product_url_suffix}
                    />
                </Section>
                <Section>
                    <Section.Title>
                        <span className={classes.normal}>
                            {orderInfo.pickup_store.name}
                        </span>{' '}
                        store in {orderInfo.pickup_store.city},{' '}
                        {orderInfo.pickup_store.region_code}
                    </Section.Title>
                    <div className={classes.section}>
                        <div className={classes.storeBlockContainer}>
                            <StoreDetails
                                location={orderInfo.pickup_store}
                                showTitle={false}
                                classes={{
                                    image: classes.storeDetailsImage,
                                    content: classes.storeDetailsContent,
                                    mail: classes.storeDetailsMail
                                }}
                            >
                                {isMobile && map}
                            </StoreDetails>
                            {!isMobile && map}
                            <CheckBrowserCompatibility />
                        </div>
                    </div>
                </Section>
            </>
        );
    } else if (!isLoading) {
        content = <EmptyContent content={'cannot find your order!'} />;
    }

    return <div className={classes.root}>{content}</div>;
};

const IMoney = shape({
    currency: string,
    value: number
});

const IOrderItem = shape({
    delivery_date: string,
    discounts: arrayOf(
        shape({
            amount: IMoney
        })
    ),
    id: string,
    item_status: string,
    price_inc_tax: IMoney,
    product_name: string,
    product_sku: string,
    product_thumbnail: shape({
        url: string
    }),
    product_url_key: string,
    qty_picked: number,
    quantity_ordered: number,
    row_total_incl_tax: IMoney,
    tax_amount: IMoney
});

CurbsidePickup.propTypes = {
    classes: shape({
        root: string,
        map: string,
        desktopNavWrapper: string,
        sectionRoot: string,
        section: string,
        mobileNavWrapper: string,
        productSectionTitle: string,
        normal: string,
        storeBlockContainer: string,
        storeDetailsImage: string,
        storeDetailsContent: string,
        storeDetailsMail: string
    }),
    canceledItemsPriceAndDiscountValues: shape({
        price: number.isRequired,
        discount: number.isRequired
    }),
    orderInfo: shape({
        curbside_delivered_at: string,
        id: string,
        items: arrayOf(IOrderItem),
        number: string,
        order_date: string,
        pickup_person: shape({
            firstname: string,
            lastname: string
        }),
        pickup_store: shape({
            address: string,
            latitude: number,
            longitude: number,
            name: string
        }),
        pickup_type: string,
        product_url_suffix: string,
        status_code: string,
        total: shape({
            grand_total: IMoney
        })
    }),
    orderProducts: arrayOf(IOrderItem).isRequired,
    isError: shape({
        message: string
    }),
    isMobile: bool,
    isLoading: bool,
    isSubmitting: bool,
    hasBeenSubmitted: bool,
    submitButtonRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }),
    handleNavBackButtonClick: func.isRequired,
    handleCheckInFormSubmit: func.isRequired,
    isSubmitted: bool
};

export default CurbsidePickup;
