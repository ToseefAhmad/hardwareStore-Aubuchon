import { bool, number, shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import defaultClasses from './productCard.shimmer.module.css';

const ProductCardShimmer = ({
    classes: propClasses,
    imageHeight,
    isTwoColumns,
    onlyImage
}) => {
    const classes = useStyle(defaultClasses, propClasses);
    const twoColumnsPrefix = isTwoColumns ? 'Columns' : '';
    const contentClass = onlyImage ? classes.contentHidden : classes.content;

    return (
        <Fragment>
            <div className={classes.imageContainer}>
                <div className={classes.image}>
                    <Shimmer
                        width="100%"
                        height={imageHeight + 'px'}
                        key="image-container"
                    />
                </div>
            </div>
            <div className={contentClass}>
                <div className={classes.info}>
                    <Shimmer width="100%" height="100%" key="info" />
                </div>
                <div className={classes[`name${twoColumnsPrefix}`]}>
                    <Shimmer width="100%" height="100%" key="name" />
                </div>
                <div className={classes[`price${twoColumnsPrefix}`]}>
                    <Shimmer width="100%" height="100%" key="price" />
                </div>
                <div className={classes[`bottomPanel${twoColumnsPrefix}`]}>
                    <Shimmer width="100%" height="100%" key="bottom-panel" />
                </div>
            </div>
        </Fragment>
    );
};

ProductCardShimmer.propTypes = {
    classes: shape({
        bottomLine: string,
        bottomLineColumns: string,
        content: string,
        contentMobileHidden: string,
        imageContainer: string,
        image: string,
        info: string,
        name: string,
        nameColumns: string,
        price: string,
        priceColumns: string
    }),
    imageHeight: number,
    isTwoColumns: bool,
    onlyImage: bool
};

export default ProductCardShimmer;
