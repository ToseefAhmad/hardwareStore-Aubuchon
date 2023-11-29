import { useMemo, useState, useRef, useCallback, useEffect } from 'react';

import { smoothScroll } from '@app/utils/smooth-scroll';
import { turnToApi } from '@app/utils/TurnTo';

const SEARCH_RESULTS_PER_PAGE = 5;

export const useSearchResult = ({
    storeConfig,
    searchQuery,
    turnToQuestionsData,
    isMobile
}) => {
    const [searchResult, setSearchResult] = useState(null);
    const [currentSearchResultPage, setCurrentSearchResultPage] = useState(1);
    const [searchResultItemExpanded, setSearchResultItemExpanded] = useState(
        null
    );
    const [
        isSearchResultItemExpanded,
        setIsSearchResultItemExpanded
    ] = useState(false);
    const [isSearchInProgress, setIsSearchInProgress] = useState(false);
    const [
        isSearchItemDetailsRequestInProgress,
        setIsSearchItemDetailsRequestInProgress
    ] = useState(false);
    const resultCountRef = useRef();

    const getSearchResult = useCallback(async () => {
        if (!searchQuery) {
            setSearchResult(null);
        }

        if (turnToQuestionsData && searchQuery) {
            try {
                setIsSearchInProgress(true);

                const response = await turnToApi.searchAnswers({
                    storeConfig,
                    searchTerm: searchQuery,
                    brand: turnToQuestionsData.brand,
                    catalogItemId: turnToQuestionsData.catalogItemId,
                    categoryIds: turnToQuestionsData.parentCategoryIds
                });

                setSearchResult(response.data);
                setCurrentSearchResultPage(1);
            } catch (e) {
                console.error(e);
            } finally {
                setIsSearchInProgress(false);
            }
        }
    }, [searchQuery, storeConfig, turnToQuestionsData]);

    const handleExpandSearchResultItem = useCallback(
        async ({ id, type }) => {
            try {
                setIsSearchResultItemExpanded(true);
                setIsSearchItemDetailsRequestInProgress(true);

                if (type === 'ir') {
                    const response = await turnToApi.getFullReviewData({
                        storeConfig,
                        id
                    });

                    setSearchResultItemExpanded(response.data);
                }

                if (type === 'q') {
                    const response = await turnToApi.getFullQuestionData({
                        storeConfig,
                        id
                    });

                    setSearchResultItemExpanded(response.data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsSearchItemDetailsRequestInProgress(false);
            }
        },
        [storeConfig]
    );

    const handleSearchResultPageChange = useCallback(
        async value => {
            if (
                resultCountRef.current?.offsetTop - (isMobile ? 70 : 140) <
                window.scrollY
            ) {
                await smoothScroll({
                    container:
                        document.scrollingElement || document.documentElement,
                    to: {
                        y:
                            resultCountRef.current?.offsetTop -
                            (isMobile ? 90 : 155)
                    }
                });
            }

            setCurrentSearchResultPage(value);
        },
        [isMobile]
    );

    const handleGoBackToSearchResultList = useCallback(() => {
        setSearchResultItemExpanded(null);
        setIsSearchResultItemExpanded(false);
    }, []);

    useEffect(() => {
        getSearchResult();
    }, [getSearchResult]);

    const searchResultPaginated = useMemo(() => {
        const offset =
            currentSearchResultPage === 1
                ? 0
                : (currentSearchResultPage - 1) * SEARCH_RESULTS_PER_PAGE;

        return searchResult?.items?.slice(
            offset,
            offset + SEARCH_RESULTS_PER_PAGE
        );
    }, [searchResult, currentSearchResultPage]);

    const totalSearchResultPages = useMemo(() => {
        return searchResult
            ? Math.ceil(searchResult.total / SEARCH_RESULTS_PER_PAGE)
            : null;
    }, [searchResult]);

    return {
        searchResult: searchResult && {
            total: searchResult.total,
            items: searchResultPaginated || []
        },
        resultCountRef,
        currentSearchResultPage,
        totalSearchResultPages,
        isSearchInProgress,
        isSearchItemDetailsRequestInProgress,
        isSearchResultItemExpanded,
        searchResultItemExpanded,
        handleExpandSearchResultItem,
        handleSearchResultPageChange,
        handleGoBackToSearchResultList
    };
};
