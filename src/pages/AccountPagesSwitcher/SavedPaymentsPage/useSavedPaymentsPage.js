import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import SavedPaymentsPageOperations from '@magento/peregrine/lib/talons/SavedPaymentsPage/savedPaymentsPage.gql';

import { useUserContext } from '@app/context/user';

export const normalizeTokens = responseData => {
    const paymentTokens =
        (responseData && responseData.customerPaymentTokens.items) || [];

    return paymentTokens.map(
        ({ details, public_hash, payment_method_code }) => ({
            // details is a stringified object.
            details: JSON.parse(details),
            public_hash,
            payment_method_code
        })
    );
};
/**
 * This talon contains logic for a saved payment page component.
 * It performs effects and returns prop data for rendering the component.
 *
 * @function
 *
 * @returns {SavedPaymentsPageTalonProps}
 */
export const useSavedPaymentsPage = () => {
    const { getSavedPaymentsQuery } = SavedPaymentsPageOperations;

    const [
        ,
        {
            actions: { setPageLoading }
        }
    ] = useAppContext();
    const [{ isSignedIn }] = useUserContext();

    const { data: savedPaymentsData, loading, error } = useQuery(
        getSavedPaymentsQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            skip: !isSignedIn
        }
    );

    // Update the page indicator if the GraphQL query is in flight.
    useEffect(() => {
        setPageLoading(loading);
    }, [loading, setPageLoading]);

    const savedPayments = normalizeTokens(savedPaymentsData);

    return {
        isLoading: loading,
        isError: !!error,
        savedPayments
    };
};

/** JSDoc type definitions */

/**
 * Props data to use when rendering a cart page component.
 *
 * @typedef {Object} SavedPaymentsPageTalonProps
 *
 * @property {boolean} isLoading true if the query is refreshing from network
 * @property {boolean} isError true if the query is failed
 * @property {Array<Object>} savedPayments  An array of saved payment data.
 */
