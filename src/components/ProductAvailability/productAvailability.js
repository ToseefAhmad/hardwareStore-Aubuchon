import classnames from 'classnames';
import { arrayOf, number, shape, string, func, bool } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useWindowSize } from '@magento/peregrine';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import { InStock, OutOfStock, SpecialOrder } from '@app/components/Icons';
import LinkButton from '@app/components/LinkButton';
import ProductParentCategoryLink from '@app/components/ProductParentCategoryLink';
import { useTailwindContext } from '@app/context/tailwind';

import defaultClasses from './productAvailability.module.css';
import { useProductAvailability } from './useProductAvailability';

const ProductAvailability = props => {
    const {
        data,
        onCheckNearbyStoresClick,
        isStoreName,
        isCheckNearbyStores,
        classes: propsClasses,
        isProductView,
        categories,
        productType,
        skipSimilar
    } = props;

    const classes = useStyle(defaultClasses, propsClasses);

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
    } = useProductAvailability({
        data
    });

    const storeName = isProductView ? location : `at ${store_name}`;

    const linksClasses = { root: classes.categoryLink };

    const inStockProducts = (
        <>
            <div className={classes.stock}>
                <Icon classes={{ icon: classes.icon }} src={InStock} />
                <p className={classes.stockInfo}>
                    <span className={classes.inStock}>{qty} in stock</span>{' '}
                    {isStoreName && storeName}
                </p>
            </div>
            {location && !isProductView && (
                <p className={classes.paragraph}>{location}</p>
            )}
            <div className={classes.notBossProducts}>
                {isCheckNearbyStores &&
                    show_check_nearby &&
                    productType === 'SimpleProduct' && (
                        <>
                            <LinkButton
                                classes={{ rootSecondary: classes.link }}
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
        <>
            <div className={classes.stock}>
                <div
                    className={classnames(classes.bossIcon, {
                        [classes.bossIconCard]: !isProductView
                    })}
                >
                    <Icon src={SpecialOrder} />
                </div>
                <span>
                    <span className={classes.bold}>Special order</span>
                    {isProductView && (
                        <>
                            {' '}
                            for free pickup at {store_name} on{' '}
                            <span className={classes.bold}>
                                {boss_available}
                            </span>
                        </>
                    )}
                </span>
            </div>
            <div
                className={classnames(classes.usefulLinks, {
                    [classes.usefulLinksCard]: !isProductView
                })}
            >
                {isProductView &&
                    (!isMobile ? 'If you need it sooner, browse ' : 'View ')}
                {categories?.length > 0 &&
                    !skipSimilar &&
                    (isProductView && (
                        <ProductParentCategoryLink
                            categories={categories}
                            text={'similar in stock items'}
                            classes={{ root: classes.categoryLinkBoss }}
                        />
                    ))}
                {isCheckNearbyStores &&
                    show_check_nearby &&
                    productType === 'SimpleProduct' && (
                        <>
                            {isProductView && ' or '}
                            <LinkButton
                                classes={{ rootSecondary: classes.link }}
                                onPress={() => {
                                    onCheckNearbyStoresClick();
                                    dispatch({
                                        type: 'CHECK_NEARBY_STORES_CLICK'
                                    });
                                }}
                            >
                                <FormattedMessage
                                    id="productCard.availableInfoLinkText"
                                    defaultMessage={
                                        isProductView
                                            ? 'check nearby stores'
                                            : 'Check Nearby Stores'
                                    }
                                />
                            </LinkButton>
                        </>
                    )}
            </div>
        </>
    );

    const outOfStockProducts = (
        <>
            <div className={classnames(classes.stock, classes.notInStock)}>
                <Icon classes={{ icon: classes.icon }} src={OutOfStock} />
                <span className={classes.bold}>Currently unavailable</span>
            </div>
            <div className={classes.notBossProducts}>
                {isProductView && categories?.length > 0 && !skipSimilar && (
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
                                classes={{ rootSecondary: classes.link }}
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

ProductAvailability.defaultProps = {
    isCheckNearbyStores: true,
    isStoreName: true,
    isProductView: false,
    skipSimilar: false
};

ProductAvailability.propTypes = {
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
    isProductView: bool,
    classes: shape({
        link: string,
        root: string,
        stock: string,
        paragraph: string,
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

export default ProductAvailability;
