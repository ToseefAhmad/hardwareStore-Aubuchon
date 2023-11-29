import { func, number, oneOfType, string, bool } from 'prop-types';
import React from 'react';

import Image from '@magento/venia-ui/lib/components/Image';

import Link from '@app/components/Link';
import RatingStars from '@app/components/ProductFullDetail/RatingStars';

import classes from './suggestedProduct.module.css';
import { useSuggestedProduct } from './useSuggestedProduct';

const IMAGE_WIDTH = 130;

const SuggestedProduct = props => {
    const {
        imageUrl,
        id,
        name,
        sku,
        url,
        url_key,
        small_image,
        rating,
        onNavigate,
        hasBorder,
        searchTerm
    } = props;

    const { handleClick, uri, image } = useSuggestedProduct({
        id,
        name,
        sku,
        onNavigate,
        url,
        url_key,
        small_image,
        imageUrl,
        searchTerm
    });

    const rootClassName = !hasBorder ? classes.root : classes.rootWithBorder;

    return (
        <Link className={rootClassName} to={uri} onClick={handleClick}>
            <Image
                alt={name}
                classes={{ image: classes.image, root: classes.imageRoot }}
                resource={image}
                width={IMAGE_WIDTH}
                ratio={1}
            />
            <span className={classes.name}>
                <div className={classes.rating}>
                    <RatingStars
                        rating={Number(rating)}
                        hideReviewCount={true}
                    />
                </div>
                {name}
            </span>
        </Link>
    );
};

SuggestedProduct.propTypes = {
    id: string,
    url: string,
    url_key: string,
    imageUrl: string,
    small_image: string,
    name: string.isRequired,
    sku: string,
    rating: oneOfType([number, string]),
    onNavigate: func,
    searchTerm: string,
    hasBorder: bool.isRequired
};

export default SuggestedProduct;
