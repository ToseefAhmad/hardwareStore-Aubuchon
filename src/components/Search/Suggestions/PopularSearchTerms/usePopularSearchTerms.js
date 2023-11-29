import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { setSearchParams } from '../utils/helpers';

export const usePopularSearchTerms = ({ terms }) => {
    const { search } = useLocation();

    const items = useMemo(() => {
        return terms.map(term => {
            const nextSearchParams = setSearchParams(search, {
                searchValue: term
            });
            const label = `${term[0].toUpperCase()}${term.slice(1)}`;

            return {
                destination: `/search?${nextSearchParams}`,
                label
            };
        });
    }, [terms, search]);

    return { items };
};
