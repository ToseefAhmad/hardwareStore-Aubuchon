import { useLazyQuery } from '@apollo/client';
import { useEffect, useState, useMemo } from 'react';

import { useCartContext } from '@magento/peregrine/lib/context/cart';

import ProductListingOperations from './productListing.gql';

/**
 * This talon contains logic for a component that renders a list of products for a cart.
 * It performs effects and returns prop data to render the component on a cart page.
 */
export const useProductListing = () => {
    const { getProductListingQuery } = ProductListingOperations;

    const [{ cartId }] = useCartContext();
    const [activeEditItem, setActiveEditItem] = useState(null);

    const [
        fetchProductListing,
        { called, data, error, loading }
    ] = useLazyQuery(getProductListingQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const items = useMemo(() => {
        let value = [];

        if (called && !loading) {
            const { cart } = data;

            value = cart.items;
        }

        return value;
    }, [called, data, loading]);

    useEffect(() => {
        if (cartId) {
            fetchProductListing({
                variables: {
                    cartId
                }
            });
        }
    }, [cartId, fetchProductListing]);

    return {
        activeEditItem,
        isLoading: !!loading,
        error,
        items,
        setActiveEditItem
    };
};
