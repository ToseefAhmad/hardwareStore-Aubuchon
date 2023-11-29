import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo } from 'react';

import { useCartContext } from '@magento/peregrine/lib/context/cart';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import DEFAULT_OPERATIONS from './couponCode.gql';

export const useCouponCode = props => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        getAppliedCouponsQuery,
        applyCouponMutation,
        removeCouponMutation
    } = operations;
    const { setIsCartUpdating } = props;

    const [{ cartId }] = useCartContext();
    const { data, error: fetchError } = useQuery(getAppliedCouponsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !cartId,
        variables: {
            cartId
        }
    });

    const [
        applyCoupon,
        {
            called: applyCouponCalled,
            error: applyError,
            loading: applyingCoupon
        }
    ] = useMutation(applyCouponMutation);

    const [
        removeCoupon,
        {
            called: removeCouponCalled,
            error: removeCouponError,
            loading: removingCoupon
        }
    ] = useMutation(removeCouponMutation);

    const handleApplyCoupon = useCallback(
        async ({ couponCode }) => {
            if (!couponCode) return;
            try {
                await applyCoupon({
                    variables: {
                        cartId,
                        couponCode
                    }
                });
            } catch {
                // Error is logged by apollo link - no need to double log.
            }
        },
        [applyCoupon, cartId]
    );

    const handleRemoveCoupon = useCallback(
        async couponCode => {
            try {
                await removeCoupon({
                    variables: {
                        cartId,
                        couponCode
                    }
                });
            } catch {
                // Error is logged by apollo link - no need to double log.
            }
        },
        [cartId, removeCoupon]
    );

    useEffect(() => {
        if (applyCouponCalled || removeCouponCalled) {
            // If a coupon mutation is in flight, tell the cart.
            setIsCartUpdating(applyingCoupon || removingCoupon);
        }
    }, [
        applyCouponCalled,
        applyingCoupon,
        removeCouponCalled,
        removingCoupon,
        setIsCartUpdating
    ]);

    // Create a memoized error map and toggle individual errors when they change
    const errors = useMemo(
        () =>
            new Map([
                ['getAppliedCouponsQuery', fetchError],
                ['applyCouponMutation', applyError],
                ['removeCouponMutation', removeCouponError]
            ]),
        [applyError, fetchError, removeCouponError]
    );

    return {
        applyingCoupon,
        data,
        errors,
        handleApplyCoupon,
        handleRemoveCoupon,
        removingCoupon
    };
};
