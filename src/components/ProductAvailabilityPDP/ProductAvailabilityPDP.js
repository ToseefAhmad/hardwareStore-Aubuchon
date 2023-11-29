import classnames from 'classnames';
import { arrayOf, number, shape, string, func, bool } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useWindowSize } from '@magento/peregrine';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import Icon from '@app/components/Icon';
import { InStock, OutOfStock, SpecialOrder } from '@app/components/Icons';
import LinkButton from '@app/components/LinkButton';
import ProductParentCategoryLink from '@app/components/ProductParentCategoryLink';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './productAvailabilityPDP.module.css';
import { useProductAvailabilityPDP } from './useProductAvailabilityPDP';

const ProductAvailabilityPDP = props => {
    const {
        data,
        onCheckNearbyStoresClick,
        isStoreName,
        isCheckNearbyStores,
        categories,
        productType,
        skipSimilar
    } = props;

    const [, { dispatch }] = useEventingContext();

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    const {
        qty,
        location,
        store_name,
        boss_available,
        show_check_nearby
    } = useProductAvailabilityPDP({
        data
    });

    const storeName = location;

    const linksClasses = { root: classes.categoryLink };
    const linksClassesBoss = { root: classes.categoryLinkBoss };
    const buttonClasses = { rootSecondary: classes.link };

    const inStockProducts = (
        <>
            <div className={classes.stock}>
                <Icon classes={{ icon: classes.icon }} src={InStock} />
                <p className={classes.stockInfo}>
                    <span className={classes.inStock}>{qty} in stock</span>{' '}
                    {isStoreName && storeName}
                </p>
            </div>
            <div className={classes.notBossProducts}>
                {isCheckNearbyStores &&
                    show_check_nearby &&
                    productType === 'SimpleProduct' && (
                        <>
                            <LinkButton
                                classes={buttonClasses}
                                onPress={() => {
                                    onCheckNearbyStoresClick();
                                    dispatch({
                                        type: 'CHECK_NEARBY_STORES_CLICK'
                                    });
                                }}
                            >
                                <FormattedMessage
                                    id="productCard.availableInfoLinkText"
                                    defaultMessage={'Check Nearby Stores'}
                                />
                            </LinkButton>
                        </>
                    )}
            </div>
        </>
    );

    const bossProducts = (
        <div className={classes.bossProducts}>
            <div className={classes.stockBoss}>
                <div className={classes.bossIcon}>
                    <Icon src={SpecialOrder} />
                </div>
                <span>
                    <span className={classes.bold}>Special order</span>
                    <>
                        {' '}
                        for free pickup at {store_name} on{' '}
                        <span className={classes.bold}>{boss_available}</span>
                    </>
                </span>
            </div>
            <div className={classes.usefulLinks}>
                {!isMobile ? 'If you need it sooner, browse ' : 'View '}
                {categories?.length > 0 && !skipSimilar && (
                    <ProductParentCategoryLink
                        categories={categories}
                        text={'similar in stock items'}
                        classes={linksClassesBoss}
                    />
                )}
                {isCheckNearbyStores &&
                    show_check_nearby &&
                    productType === 'SimpleProduct' && (
                        <>
                            {' or '}
                            <LinkButton
                                classes={buttonClasses}
                                onPress={() => {
                                    onCheckNearbyStoresClick();
                                    dispatch({
                                        type: 'CHECK_NEARBY_STORES_CLICK'
                                    });
                                }}
                            >
                                <FormattedMessage
                                    id="productCard.availableInfoLinkText"
                                    defaultMessage="check nearby stores"
                                />
                            </LinkButton>
                        </>
                    )}
            </div>
        </div>
    );

    const outOfStockProducts = (
        <>
            <div className={classnames(classes.stock, classes.notInStock)}>
                <Icon classes={{ icon: classes.icon }} src={OutOfStock} />
                <span className={classes.bold}>Currently unavailable</span>
            </div>

            {categories?.length > 0 && !skipSimilar && (
                <ProductParentCategoryLink
                    categories={categories}
                    text={'Similar in stock items'}
                    classes={linksClasses}
                />
            )}
            {isCheckNearbyStores &&
                show_check_nearby &&
                productType === 'SimpleProduct' && (
                    <>
                        <LinkButton
                            classes={buttonClasses}
                            onPress={() => {
                                onCheckNearbyStoresClick();
                                dispatch({
                                    type: 'CHECK_NEARBY_STORES_CLICK'
                                });
                            }}
                        >
                            <FormattedMessage
                                id="productCard.availableInfoLinkText"
                                defaultMessage={'Check Nearby Stores'}
                            />
                        </LinkButton>
                    </>
                )}
        </>
    );

    return (
        <div className={classes.root}>
            {qty > 0
                ? inStockProducts
                : qty <= 0 && boss_available
                ? bossProducts
                : outOfStockProducts}
        </div>
    );
};

ProductAvailabilityPDP.defaultProps = {
    isCheckNearbyStores: true,
    isStoreName: true,
    skipSimilar: false
};

ProductAvailabilityPDP.propTypes = {
    data: shape({
        qty: number.isRequired,
        bopis_available: string,
        boss_available: string,
        location: string.isRequired,
        store_name: string.isRequired
    }).isRequired,
    onCheckNearbyStoresClick: func,
    isCheckNearbyStores: bool,
    isStoreName: bool,
    classes: shape({
        link: string,
        root: string,
        stock: string,
        icon: string,
        stockInfo: string,
        categoryLink: string,
        notInStock: string
    }),
    categories: arrayOf(
        shape({
            uid: string,
            level: number,
            url_path: string,
            url_suffix: string
        })
    ),
    text: string,
    productType: string,
    skipSimilar: bool
};

export default ProductAvailabilityPDP;
