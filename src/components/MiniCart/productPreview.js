import { bool, string, number, shape, arrayOf, oneOf, func } from 'prop-types';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';
import configuredVariant from '@magento/peregrine/lib/util/configuredVariant';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';

import { useTailwindContext } from '@app/context/tailwind';

import defaultClasses from './productPreview.module.css';

const ProductPreview = props => {
    const {
        product,
        quantity,
        configurable_options,
        closeMiniCart,
        configurableThumbnailSource,
        storeUrlSuffix,
        is_paint_fee
    } = props;

    const classes = useStyle(defaultClasses, props.classes);
    const { screens } = useTailwindContext();
    const { innerWidth } = useWindowSize();
    const configured_variant = configuredVariant(configurable_options, product);

    const itemLink = useMemo(
        () => resourceUrl(`/${product.url_key}${storeUrlSuffix || ''}`),
        [product.url_key, storeUrlSuffix]
    );

    const sizes = {
        desktop: {
            width: 138,
            height: 138
        },
        mobile: {
            width: 68,
            height: 68
        }
    };
    const size = innerWidth >= screens.lg ? sizes.desktop : sizes.mobile;

    const productImageFragment = (
        <Image
            alt={product.name}
            classes={{
                root: classes.thumbnail,
                image: classes.image
            }}
            width={size.width}
            height={size.height}
            ratio={1}
            resource={
                configurableThumbnailSource === 'itself' && configured_variant
                    ? configured_variant.thumbnail.url
                    : product.thumbnail.url
            }
        />
    );

    return (
        <div className={classes.thumbnailWrapper}>
            {is_paint_fee ? (
                <span className={classes.thumbnailContainer}>
                    {productImageFragment}
                </span>
            ) : (
                <Link
                    className={classes.thumbnailContainer}
                    to={itemLink}
                    onClick={closeMiniCart}
                >
                    {productImageFragment}
                </Link>
            )}
            <div className={classes.quantity}>{quantity}</div>
        </div>
    );
};

ProductPreview.propTypes = {
    classes: shape({
        root: string,
        thumbnail: string,
        name: string,
        options: string,
        quantity: string,
        price: string,
        editButton: string,
        editIcon: string
    }),
    loading: bool,
    product: shape({
        name: string,
        thumbnail: shape({
            url: string
        })
    }),
    id: string,
    uid: string,
    quantity: number,
    configurable_options: arrayOf(
        shape({
            id: number,
            option_label: string,
            value_id: number,
            value_label: string
        })
    ),
    configured_variant: shape({
        thumbnail: shape({
            url: string
        })
    }),
    configurableThumbnailSource: oneOf(['parent', 'itself']),
    closeMiniCart: func,
    storeUrlSuffix: string,
    is_paint_fee: bool
};

ProductPreview.defaultProps = {
    is_paint_fee: false
};

export default ProductPreview;
