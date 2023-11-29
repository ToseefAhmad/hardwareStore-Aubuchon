import { func } from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';

import ErrorMessage from '@magento/venia-ui/lib/components/CartPage/ProductListing/errorMessage';
import classes from '@magento/venia-ui/lib/components/CartPage/ProductListing/productListing.module.css';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

import { useProductListing } from '@app/talons/CartPage/ProductListing/useProductListing';

import Product from './product';

const EditModal = lazy(() =>
    import('@magento/venia-ui/lib/components/CartPage/ProductListing/EditModal')
);
/**
 * A child component of the CartPage component.
 * This component renders the product listing on the cart page.
 */
const ProductListing = props => {
    const { setIsCartUpdating, fetchCartDetails } = props;
    const {
        activeEditItem,
        isLoading,
        error,
        items,
        setActiveEditItem
    } = useProductListing();

    let content = null;

    if (isLoading) {
        content = (
            <LoadingIndicator>
                <FormattedMessage
                    id="productListing.loading"
                    defaultMessage="Fetching Cart..."
                />
            </LoadingIndicator>
        );
    } else if (items.length) {
        content = (
            <>
                <ErrorMessage error={error} />
                <ul className={classes.root}>
                    {items.map(product => (
                        <Product
                            item={product}
                            key={product.uid}
                            setActiveEditItem={setActiveEditItem}
                            setIsCartUpdating={setIsCartUpdating}
                            fetchCartDetails={fetchCartDetails}
                        />
                    ))}
                </ul>
                <Suspense fallback={null}>
                    <EditModal
                        item={activeEditItem}
                        setIsCartUpdating={setIsCartUpdating}
                        setActiveEditItem={setActiveEditItem}
                    />
                </Suspense>
            </>
        );
    }

    return content;
};

ProductListing.propTypes = {
    setIsCartUpdating: func.isRequired,
    fetchCartDetails: func.isRequired
};

export default ProductListing;
