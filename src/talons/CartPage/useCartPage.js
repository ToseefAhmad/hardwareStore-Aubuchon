import { useLazyQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';

import { useCartContext } from '@magento/peregrine/lib/context/cart';
import CartPageOperations from '@magento/peregrine/lib/talons/CartPage/cartPage.gql';

/**
 * This talon contains logic for a cart page component.
 * It performs effects and returns prop data for rendering the component.
 */
export const useCartPage = () => {
    const { getCartDetailsQuery } = CartPageOperations;

    const [{ cartId }] = useCartContext();

    const [isCartUpdating, setIsCartUpdating] = useState(false);

    const [fetchCartDetails, { called, data, loading }] = useLazyQuery(
        getCartDetailsQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            errorPolicy: 'all'
        }
    );

    const hasItems = !!data?.cart?.total_quantity;
    const shouldShowLoadingIndicator = called && loading && !hasItems;

    const cartItems = useMemo(() => {
        return data?.cart?.items || [];
    }, [data]);

    useEffect(() => {
        if (!called && cartId) {
            fetchCartDetails({ variables: { cartId } });
        }

        // Let the cart page know it is updating while we're waiting on network data.
        setIsCartUpdating(loading);
    }, [fetchCartDetails, called, cartId, loading]);

    return {
        cartItems,
        hasItems,
        isCartUpdating,
        fetchCartDetails,
        setIsCartUpdating,
        shouldShowLoadingIndicator
    };
};
