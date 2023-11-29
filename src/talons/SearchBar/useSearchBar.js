import { useCallback, useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

import { useRecentlySearchedContext } from '@app/context/recentlySearched';
import { useTailwindContext } from '@app/context/tailwind';
import { useURLQuery } from '@app/hooks/useURLQuery';
import klevuApi from '@app/utils/Klevu/klevuApi';

export const useSearchBar = handleCloseSearchBox => {
    const [valid, setValid] = useState(false);
    const [hasResult, setHasResult] = useState(false);
    const [urlRedirectData, setUrlRedirectData] = useState();
    const [, { addRecentlySearched }] = useRecentlySearchedContext();

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    const {
        elementRef,
        expanded: isAutoCompleteOpen,
        setExpanded: setIsAutoCompleteOpen
    } = useDropdown();
    const [
        { searchValue },
        {
            actions: { setSearchValue }
        }
    ] = useAppContext();
    const queryParam = useURLQuery().get('query');
    const history = useHistory();
    const { push } = history;
    const [, { dispatch }] = useEventingContext();

    /*
     * Get URL redirects from Klevu admin
     **/
    const getUrlRedirectsData = useCallback(async () => {
        try {
            const response = await klevuApi.getUrlRedirects();
            setUrlRedirectData(response.data.klevu_keywordUrlMap);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        getUrlRedirectsData();
    }, [getUrlRedirectsData]);

    /*
     * Flatten URL redirects data
     **/
    const redirectsFlattened = useMemo(() => {
        const result = {};

        if (urlRedirectData) {
            try {
                urlRedirectData.forEach(({ keywords, url }) => {
                    const parsedUrl = new URL(url);

                    keywords.forEach(keyword => {
                        result[keyword] = parsedUrl.pathname;
                    });
                });
            } catch (e) {
                console.error(e);
            }
        }

        return result;
    }, [urlRedirectData]);

    // expand or collapse on input change
    const handleChange = useCallback(
        value => {
            const hasValue = !!value;
            const isValid = hasValue && value.length > 2;

            setValid(isValid);
            setIsAutoCompleteOpen(hasValue);
            setSearchValue(value);
        },
        [setIsAutoCompleteOpen, setValid, setSearchValue]
    );

    // expand on focus
    const handleOpenSearchDesktop = useCallback(() => {
        setIsAutoCompleteOpen(true);
    }, [setIsAutoCompleteOpen]);

    // navigate on submit
    const handleSubmit = useCallback(
        ({ search_query }) => {
            if (search_query && search_query.trim().length > 0) {
                addRecentlySearched(search_query);

                const urlForRedirect =
                    redirectsFlattened[search_query.toLowerCase()];

                push(urlForRedirect || `/search?query=${search_query}`);
                setIsAutoCompleteOpen(false);
                setSearchValue('');
                dispatch({
                    type: 'KLEVU_SEARCH_TERM',
                    payload: search_query
                });

                isMobile && handleCloseSearchBox();
            }
        },
        [
            addRecentlySearched,
            redirectsFlattened,
            push,
            setIsAutoCompleteOpen,
            setSearchValue,
            dispatch,
            isMobile,
            handleCloseSearchBox
        ]
    );

    const initialValues = useMemo(() => {
        return {
            search_query: searchValue
        };
    }, [searchValue]);

    useEffect(() => {
        const hasValue = !!searchValue;
        const isValid = hasValue && searchValue.length > (isMobile ? 0 : 2);
        setValid(isValid);

        // prevent from opening auto complete on render
        if (queryParam === searchValue) {
            return setIsAutoCompleteOpen(false);
        }

        setIsAutoCompleteOpen(hasValue);
    }, [isMobile, searchValue, setIsAutoCompleteOpen, queryParam]);

    return {
        containerRef: elementRef,
        handleChange,
        handleOpenSearchDesktop,
        handleSubmit,
        initialValues,
        isAutoCompleteOpen,
        setIsAutoCompleteOpen,
        setValid,
        valid,
        hasResult,
        setHasResult,
        searchValue
    };
};
