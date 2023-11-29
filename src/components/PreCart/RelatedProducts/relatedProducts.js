import { string } from 'prop-types';
import React from 'react';

import RelatedProduct from '@app/components/ProductCard';
import { useRelatedProducts } from '@app/components/ProductFullDetail/RelatedProducts/useRelatedProducts';

import classes from './relatedProducts.module.css';
import RelatedProductsShimmer from './relatedProducts.shimmer';

const RelatedProducts = ({ urlKey }) => {
    const { relatedProducts = [], isLoading, storeConfig } = useRelatedProducts(
        {
            urlKey
        }
    );

    const relatedProductCards = relatedProducts
        .filter(item => item.pickup_store_inventory?.qty > 0)
        .map(product => (
            <div key={product.uid} className={classes.productItems}>
                <RelatedProduct
                    classes={{
                        rootRows: classes.productRoot,
                        rootCart: classes.productRootCart,
                        image: classes.productImage,
                        imageContainer: classes.imageContainer,
                        name: classes.productName,
                        content: classes.productContent,
                        contentRows: classes.productContentRows,
                        addToCart: classes.addToCart,
                        button: {
                            root: classes.buttonRoot,
                            rootLightened: classes.buttonLightened,
                            addToCartButtonLightened:
                                classes.addToCartButtonLightened
                        },
                        sku: classes.productSku,
                        priceWrapper: classes.priceWrapper,
                        price: classes.productPrice,
                        info: classes.info
                    }}
                    product={product}
                    storeConfig={storeConfig}
                    productTypeLocation="lastAddedRecommendation"
                />
            </div>
        ));
    return (
        <>
            <h3 className={classes.relatedTitle}>You may also like</h3>
            <div className={classes.relatedRoot}>
                {isLoading ? (
                    <div className={classes.root}>
                        <RelatedProductsShimmer />
                    </div>
                ) : relatedProductCards.length === 0 ? (
                    <div>Currently there are no related products</div>
                ) : (
                    <div className={classes.root}>{relatedProductCards}</div>
                )}
            </div>
        </>
    );
};

RelatedProducts.propTypes = {
    urlKey: string
};

export default RelatedProducts;
