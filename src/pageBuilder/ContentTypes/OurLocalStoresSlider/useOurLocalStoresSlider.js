import { useQuery } from '@apollo/client';

import operations from './ourLocalStoresSlider.gql';

export const useOurLocalStoresSlider = () => {
    const { getLocalStoresQuery } = operations;

    const { data, loading } = useQuery(getLocalStoresQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    return { data, loading };
};
