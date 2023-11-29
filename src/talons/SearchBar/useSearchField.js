import { useFormApi } from 'informed';
import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { useURLQuery } from '@app/hooks/useURLQuery';
/**
 * Returns props necessary to render a SearchField component.
 */
export const useSearchField = ({
    isAutoCompleteOpen,
    hasResult,
    isSearchBoxOpened
}) => {
    const inputRef = useRef();
    const location = useLocation();
    const history = useHistory();
    const queryParam = useURLQuery().get('query');
    const [
        { searchValue },
        {
            actions: { setAreSearchSuggestionsShown }
        }
    ] = useAppContext();

    useEffect(() => {
        setAreSearchSuggestionsShown(isAutoCompleteOpen && hasResult);
    }, [isAutoCompleteOpen, hasResult, setAreSearchSuggestionsShown]);

    const formApi = useFormApi();
    useEffect(() => {
        // prevent from error when deleting last character in input
        if (searchValue === undefined) {
            return formApi.setValue('search_query', '');
        }

        if (!searchValue) {
            formApi.setValue('search_query', queryParam);
        }

        // if page isn't search page set input empty value
        const historyListener = history.listen(location => {
            if (location.pathname !== '/search') {
                formApi.setValue('search_query', '');
            }
        });

        return () => historyListener;
    }, [searchValue, formApi, queryParam, history]);

    const handleErase = useCallback(() => {
        formApi.setValue('search_query', '');
    }, [formApi]);

    useEffect(() => {
        inputRef.current.blur();
        isSearchBoxOpened && inputRef.current.focus();
    }, [isSearchBoxOpened, location]);

    return {
        inputRef,
        handleErase
    };
};
