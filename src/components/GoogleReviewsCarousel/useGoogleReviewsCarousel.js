import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import operations from './googleReviewsCarousel.gql';

export const useGoogleReviewsCarousel = ({ pickupStoreId, showLoading }) => {
    const { data, loading, error } = useQuery(
        operations.getGoogleReviewsQuery,
        {
            variables: {
                pickupStoreId
            },
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            skip: showLoading
        }
    );
    const googleReviews = useMemo(() => data?.googleReviews, [
        data?.googleReviews
    ]);
    const isLoading = useMemo(() => !data && loading, [data, loading]);

    return {
        googleReviews,
        isLoading,
        error
    };
};
