import { Form } from 'informed';
import { bool, func } from 'prop-types';
import React, { Fragment } from 'react';
import { useCookies } from 'react-cookie';

import { useWindowSize } from '@magento/peregrine';

import Icon from '@app/components/Icon';
import { ChevronRightSmall, Close as CloseIcon } from '@app/components/Icons';
import LinkButton from '@app/components/LinkButton';
import Autocomplete from '@app/components/Search/Autocomplete/autocomplete';
import SearchField from '@app/components/Search/SearchField/searchField';
import { useRecentlySearchedContext } from '@app/context/recentlySearched';
import { useRecentlyViewedContext } from '@app/context/recentlyViewedProducts';
import { useTailwindContext } from '@app/context/tailwind';
import { useId } from '@app/hooks/useId';
import ProductCarousel from '@app/pageBuilder/ContentTypes/ProductCarousel';
import { useSearchBar } from '@app/talons/SearchBar';

import classes from './searchBoxMobile.module.css';
import { useSearchBoxMobile } from './useSearchBoxMobile';

const SearchBoxMobile = () => {
    const {
        handleCloseSearchBox,
        isOpen,
        handleRemoveRecentlySearched
    } = useSearchBoxMobile();

    const {
        handleSubmit,
        valid,
        hasResult,
        setHasResult,
        handleChange,
        initialValues,
        isAutoCompleteOpen,
        searchValue,
        setIsAutoCompleteOpen
    } = useSearchBar(handleCloseSearchBox);

    const { id } = useId({ prefix: 'searchbox' });
    const [recentlyViewedProducts] = useRecentlyViewedContext();

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    const [recentlySearched] = useRecentlySearchedContext();
    const [cookies] = useCookies(['aubuchon_cid']);
    const rootClass = isOpen ? classes.root_open : classes.root;

    return (
        <Fragment>
            {isMobile && (
                <div
                    className={rootClass}
                    id="searchbox"
                    role="dialog"
                    aria-modal={true}
                    aria-labelledby={id`title`}
                >
                    <Form
                        autoComplete="off"
                        className={classes.form}
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        <div className={classes.headingWrapper}>
                            <SearchField
                                onChange={handleChange}
                                hasResult={hasResult}
                                valid={valid}
                                isAutoCompleteOpen={isAutoCompleteOpen}
                                isSearchBoxOpened={isOpen}
                                searchValue={searchValue}
                            />
                            <button
                                className={classes.closeButton}
                                onClick={handleCloseSearchBox}
                                aria-label="Close searchbox"
                                type="button"
                            >
                                <Icon src={CloseIcon} />
                            </button>
                        </div>
                        {!!recentlyViewedProducts.length && !valid && (
                            <div className={classes.searchSliders}>
                                <div className={classes.sliderTitle}>
                                    Recently viewed
                                </div>
                                <ProductCarousel
                                    productCarouselType={
                                        'recently_viewed_products'
                                    }
                                    showOnlySmallThumbnails
                                />
                            </div>
                        )}
                        {!recentlyViewedProducts.length &&
                            cookies.aubuchon_cid &&
                            !valid && (
                                <div className={classes.searchSliders}>
                                    <ProductCarousel
                                        productCarouselType={
                                            'customer_recommendations'
                                        }
                                        showOnlySmallThumbnails
                                        productCarouselTitle={'Recommendations'}
                                    />
                                </div>
                            )}
                        {valid && (
                            <div className={classes.suggestions}>
                                <Autocomplete
                                    setVisible={setIsAutoCompleteOpen}
                                    valid={valid}
                                    visible={true}
                                    hasResult={hasResult}
                                    setHasResult={setHasResult}
                                    handleCloseSearchBox={handleCloseSearchBox}
                                    isAutoCompleteOpen={isOpen}
                                />
                            </div>
                        )}
                        {!!recentlySearched.length && !valid && (
                            <div className={classes.recentlySearched}>
                                <div className={classes.recentlySearchedTitle}>
                                    Recently searched
                                </div>
                                <ul className={classes.itemsList}>
                                    {recentlySearched.map(
                                        (searchValue, index) => (
                                            <li key={index}>
                                                <button
                                                    onClick={() =>
                                                        handleSubmit({
                                                            search_query: searchValue
                                                        })
                                                    }
                                                    className={
                                                        classes.autocompleteButton
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes.searchedItem
                                                        }
                                                    >
                                                        {' '}
                                                        {searchValue}
                                                        <span
                                                            className={
                                                                classes.icon
                                                            }
                                                        >
                                                            <Icon
                                                                src={
                                                                    ChevronRightSmall
                                                                }
                                                            />
                                                        </span>
                                                    </div>
                                                </button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                    </Form>
                    {!!recentlySearched.length && !valid && (
                        <div>
                            <LinkButton
                                classes={{
                                    rootSecondary: classes.clearHistoryButton
                                }}
                                onClick={handleRemoveRecentlySearched}
                            >
                                Clear History
                            </LinkButton>
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
};

SearchBoxMobile.propTypes = {
    isOpen: bool,
    setIsOpen: func
};

export default SearchBoxMobile;
