import React, { Fragment } from 'react';

import ErrorView from '@magento/venia-ui/lib/components/ErrorView';
import { StoreTitle, Meta } from '@magento/venia-ui/lib/components/Head';

import { RichSnippet } from '@app/components/Head';
import ProductFullDetail from '@app/components/ProductFullDetail';
import { useFocusedScrollTop } from '@app/hooks/useFocusedScrollTop';

import ProductShimmer from './product.shimmer';
import { useProduct } from './useProduct';

const Product = props => {
    const {
        error,
        loading,
        product,
        storeConfig,
        isMobile,
        isDesktop,
        productStructuredData
    } = useProduct(props);

    useFocusedScrollTop(2);

    if (loading && (!product || !storeConfig)) {
        return <ProductShimmer />;
    }

    if (error || !product) return <ErrorView />;

    return (
        <Fragment>
            <StoreTitle>{product.name}</StoreTitle>
            <Meta name="title" content={product.meta_title || product.name} />
            <Meta
                name="description"
                content={product.meta_description || product.description}
            />
            <Meta name="keywords" content={product.meta_keyword} />
            {productStructuredData && (
                <RichSnippet data={productStructuredData} />
            )}
            <ProductFullDetail
                product={product}
                storeConfig={storeConfig}
                isMobile={isMobile}
                isDesktop={isDesktop}
            />
        </Fragment>
    );
};

export default Product;
