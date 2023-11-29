import { useMutation } from '@apollo/client';
import { APP_ROUTER_PATHS } from '@app-constants';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useTypePolicies, useToasts } from '@magento/peregrine';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import { usePickupStoreContext } from '@app/context/PickupStore';
import { useUserContext } from '@app/context/user';

import CheckoutPageOperations from './checkoutPage.gql';

export const useCheckoutPage = () => {
    const {
        mutations: { initializeCheckoutMutation },
        typePolicies
    } = CheckoutPageOperations;

    useTypePolicies(typePolicies);

    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [, { dispatch }] = useEventingContext();
    const [{ isSignedIn }] = useUserContext();
    const [{ cartId }] = useCartContext();
    const cartIdOnInit = useRef(cartId);
    const isSignedInOnInit = useRef(isSignedIn);
    const [
        { allow_pickup, city, region_code, isLoading: pickupStoreDataLoading }
    ] = usePickupStoreContext();

    const [, { addToast }] = useToasts();

    const [initializeCheckout] = useMutation(initializeCheckoutMutation, {
        fetchPolicy: 'network-only',
        variables: {
            cartId: cartIdOnInit.current,
            isSignedIn: isSignedInOnInit.current
        }
    });

    /**
     * Method for redirecting to home page
     */
    const redirectToHomePage = useCallback(() => {
        history.push(APP_ROUTER_PATHS.home);
    }, [history]);

    /**
     * Method for initializing checkout page.
     * After it is executed, all work with the data is handled through the cached data
     */
    useEffect(() => {
        if (pickupStoreDataLoading) {
            return;
        }

        let hasOutOfStockItems;

        initializeCheckout()
            .then(({ data }) => {
                const {
                    initializeCheckout: {
                        cart: { total_quantity, items }
                    }
                } = data;

                hasOutOfStockItems = items.some(
                    ({ is_paint_fee, product: { stock_status } }) =>
                        stock_status === 'OUT_OF_STOCK' && !is_paint_fee
                );

                if (!total_quantity || !allow_pickup || hasOutOfStockItems) {
                    redirectToHomePage();
                } else {
                    setIsLoading(false);

                    dispatch({
                        type: 'CHECKOUT_PAGE',
                        payload: data.initializeCheckout.cart
                    });
                }
            })
            .catch(() => {
                redirectToHomePage();
            });
        return () => {
            if (!allow_pickup) {
                addToast({
                    type: 'error',
                    message: `Sorry, but ${city}, ${region_code} is not taking online orders right now.`
                });
            }

            if (hasOutOfStockItems) {
                addToast({
                    type: 'error',
                    message:
                        'Some items in your cart are currently out-of-stock and must be removed from the Cart in order to Checkout.'
                });
            }
        };
    }, [
        dispatch,
        initializeCheckout,
        redirectToHomePage,
        pickupStoreDataLoading,
        allow_pickup,
        addToast,
        city,
        region_code
    ]);

    return {
        isLoading
    };
};
