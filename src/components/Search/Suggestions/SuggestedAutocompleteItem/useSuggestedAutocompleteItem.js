import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';

import { useRecentlySearchedContext } from '@app/context/recentlySearched';
import { useTailwindContext } from '@app/context/tailwind';

import { setSearchParams } from '../utils/helpers';

export const useSuggestedAutocompleteItem = props => {
    const { onNavigate, label, handleCloseSearchBox } = props;
    const { search } = useLocation();
    const [, { addRecentlySearched }] = useRecentlySearchedContext();
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    const item = useMemo(() => {
        const detaggedLabel = label
            .replaceAll('<b>', '')
            .replaceAll('</b>', '');

        /**
         * There are cases, when @var {string} detaggedLabel has empty spaces.
         * Array.prototype.filter(Boolean) is used to prevent working with empty strings,
         * which are leading to undefined and possible error cases on re-render.
         * */

        const labelCapitalized = detaggedLabel
            .split(' ')
            .filter(Boolean)
            .map(word => `${word[0]?.toUpperCase()}${word?.slice(1)}`)
            .join(' ');

        return {
            label: labelCapitalized
        };
    }, [label]);

    const nextSearchParams = setSearchParams(search, {
        searchValue: item.label
    });
    const destination = `/search?${nextSearchParams}`;

    const handleClick = useCallback(() => {
        addRecentlySearched(item.label);
        onNavigate();
        isMobile && handleCloseSearchBox();
    }, [
        addRecentlySearched,
        handleCloseSearchBox,
        isMobile,
        item.label,
        onNavigate
    ]);

    return {
        item,
        destination,
        handleClick
    };
};
