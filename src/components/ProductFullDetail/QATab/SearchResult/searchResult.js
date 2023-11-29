import { bool, func, arrayOf, number, shape, string } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Button from '@app/components/Button';
import Pagination from '@app/components/Pagination';
import { Review } from '@app/components/ProductFullDetail/ReviewsTab';

import Question from '../Question';
import classes from './searchResult.module.css';
import SearchResultItem from './SearchResultItem';
import { useSearchResult } from './useSearchResult';

const SearchResult = ({
    storeConfig,
    searchQuery,
    turnToQuestionsData,
    handleInitiateQuestionSubmit,
    isMobile,
    productSmallImage
}) => {
    const {
        searchResult,
        currentSearchResultPage,
        totalSearchResultPages,
        isSearchInProgress,
        isSearchItemDetailsRequestInProgress,
        isSearchResultItemExpanded,
        searchResultItemExpanded,
        resultCountRef,
        handleExpandSearchResultItem,
        handleSearchResultPageChange,
        handleGoBackToSearchResultList
    } = useSearchResult({
        storeConfig,
        searchQuery,
        turnToQuestionsData,
        isMobile
    });

    const searchResultCount = searchResult
        ? (!searchResult.total && 'No Results') ||
          `${searchResult.total} Results`
        : null;

    const searchResultItemDetails =
        !isSearchItemDetailsRequestInProgress &&
        searchResultItemExpanded &&
        (searchResultItemExpanded?.rating ? (
            <ul>
                <Review
                    storeConfig={storeConfig}
                    review={searchResultItemExpanded}
                    smallImage={productSmallImage}
                />
            </ul>
        ) : (
            <ul>
                <Question
                    storeConfig={storeConfig}
                    question={searchResultItemExpanded}
                />
            </ul>
        ));

    const searchResultList = (
        <>
            <ul className={classes.searchResultList}>
                {searchResult?.items.map(item => {
                    return (
                        <li key={item.id}>
                            <SearchResultItem
                                item={item}
                                handleExpandSearchResultItem={
                                    handleExpandSearchResultItem
                                }
                            />
                        </li>
                    );
                })}
            </ul>
            <Pagination
                classes={{
                    root: classes.paginationRoot
                }}
                pageControl={{
                    currentPage: currentSearchResultPage,
                    setPage: handleSearchResultPageChange,
                    totalPages: totalSearchResultPages
                }}
                isVirtual={true}
            />
        </>
    );

    return (
        <div className={classes.searchResultWrapper}>
            <div
                className={
                    searchResultItemExpanded
                        ? classes.twoButtonsWrapper
                        : classes.searchResultButtonWrapper
                }
            >
                <Button
                    priority="high"
                    type="button"
                    onClick={handleInitiateQuestionSubmit}
                >
                    Submit New Question
                </Button>
                {searchResultItemExpanded && (
                    <div className={classes.backButtonWrapper}>
                        <Button
                            type="button"
                            onClick={handleGoBackToSearchResultList}
                        >
                            Back
                        </Button>
                    </div>
                )}
            </div>
            <div className={classes.searchResultCount} ref={resultCountRef}>
                {!isSearchResultItemExpanded &&
                    (!isSearchInProgress ? (
                        searchResultCount
                    ) : (
                        <Shimmer width="100%" />
                    ))}
            </div>
            {!!searchResult?.items?.length &&
                (isSearchResultItemExpanded
                    ? searchResultItemDetails || (
                          <Shimmer width="100%" height={isMobile ? 22.5 : 19} />
                      )
                    : searchResultList)}
        </div>
    );
};

SearchResult.propTypes = {
    searchQuery: string,
    storeConfig: shape({
        turnto_site_key: string.isRequired,
        turnto_review_url: string.isRequired,
        turnto_qa_enabled: bool.isRequired
    }).isRequired,
    isMobile: bool.isRequired,
    handleInitiateQuestionSubmit: func.isRequired,
    turnToQuestionsData: shape({
        brand: string.isRequired,
        catalogItemId: number.isRequired,
        parentCategoryIds: arrayOf(number).isRequired
    }),
    productSmallImage: string.isRequired
};

SearchResult.defaultProps = {
    searchQuery: ''
};

export default SearchResult;
