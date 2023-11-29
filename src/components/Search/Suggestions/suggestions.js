import classnames from 'classnames';
import {
    arrayOf,
    bool,
    func,
    number,
    oneOfType,
    shape,
    string
} from 'prop-types';
import React, { Fragment } from 'react';

import { useWindowSize } from '@magento/peregrine';

import { APP_ROUTER_PATHS } from '@app/constants';
import { useTailwindContext } from '@app/context/tailwind';
import { useSuggestions } from '@app/talons/SearchBar';

import HelpfulLink from './HelpfulLink';
import PopularSearchTerms from './PopularSearchTerms';
import SuggestedAutocomplete from './suggestedAutocomplete';
import SuggestedCategories from './suggestedCategories';
import SuggestedProducts from './suggestedProducts';
import classes from './suggestions.module.css';

const HELPFUL_LINKS = [
    { link: APP_ROUTER_PATHS.storeLocatorPage, name: 'Store Locator' },
    {
        link: APP_ROUTER_PATHS.accountPage,
        name: 'My Account'
    },
    {
        link: APP_ROUTER_PATHS.faqPage,
        name: 'FAQ'
    }
];

const Suggestions = props => {
    const {
        products: items,
        defaultProducts: defaultItems,
        searchValue,
        setVisible,
        visible,
        categories,
        popularSearchTerms,
        autocomplete,
        handleCloseSearchBox,
        isAutoCompleteOpen
    } = props;

    const {
        onNavigate,
        onNavigateHelpfulLink,
        shouldRender,
        shouldRenderPopularTerms
    } = useSuggestions({
        items,
        defaultItems,
        categories,
        autocomplete,
        popularSearchTerms,
        setVisible,
        visible,
        handleCloseSearchBox
    });

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const isSmallDesktop = windowSize.innerWidth < tailwind.screens.xl;
    const isDesktop = windowSize.innerWidth >= tailwind.screens.xxl;

    // render null without data
    if (!shouldRender) {
        return null;
    }

    return (
        <Fragment>
            <div
                className={classnames(classes.root, {
                    [classes.searchBoxRoot]: isAutoCompleteOpen
                })}
            >
                {!!autocomplete?.length && (
                    <div className={classes.autocompleteSuggestions}>
                        {!isMobile && (
                            <h5 className={classes.suggestionsHeading}>
                                Suggestions
                            </h5>
                        )}
                        <SuggestedAutocomplete
                            classes={{
                                root: isAutoCompleteOpen
                                    ? classes.itemsListBox
                                    : classes.itemsList,
                                listItem: classes.listItem,
                                suggestedIcon: classes.suggestedIcon
                            }}
                            autocomplete={autocomplete}
                            onNavigate={onNavigate}
                            value={searchValue}
                            handleCloseSearchBox={handleCloseSearchBox}
                            isAutoCompleteOpen={isAutoCompleteOpen}
                        />
                    </div>
                )}
                {shouldRenderPopularTerms && !isMobile && (
                    <div>
                        <h5 className={classes.suggestionsHeading}>
                            Popular Searches
                        </h5>
                        <PopularSearchTerms
                            classes={{ root: classes.itemsList }}
                            terms={popularSearchTerms}
                            onNavigate={onNavigate}
                        />
                    </div>
                )}
                {!!categories?.length && !isMobile && (
                    <div className={classes.catSuggestions}>
                        <h5 className={classes.suggestionsHeading}>Category</h5>
                        <SuggestedCategories
                            classes={{ root: classes.itemsList }}
                            categories={categories}
                            onNavigate={onNavigate}
                        />
                    </div>
                )}
                {!shouldRenderPopularTerms && !isMobile && (
                    <div>
                        <h5 className={classes.suggestionsHeading}>
                            How can we help?
                        </h5>
                        <ul className={classes.itemsList}>
                            {HELPFUL_LINKS.map(({ link, name }) => (
                                <li key={link}>
                                    <HelpfulLink
                                        link={link}
                                        name={name}
                                        onNavigate={onNavigateHelpfulLink}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {!isSmallDesktop && (
                <div className={classes.productSuggestions}>
                    {(items || (defaultItems && !items)) && (
                        <>
                            <h5 className={classes.productSuggestionsHeading}>
                                {items ? 'Products' : 'Recommendations'}
                            </h5>
                            <SuggestedProducts
                                onNavigate={onNavigate}
                                products={items || defaultItems}
                                limit={isDesktop ? 6 : 4}
                                searchTerm={searchValue}
                            />
                        </>
                    )}
                </div>
            )}
        </Fragment>
    );
};

Suggestions.propTypes = {
    products: arrayOf(
        shape({
            id: oneOfType([number, string]).isRequired,
            name: string.isRequired,
            rating: oneOfType([number, string]),
            imageUrl: string,
            url: string.isRequired
        })
    ),
    defaultProducts: arrayOf(
        shape({
            id: oneOfType([number, string]).isRequired,
            name: string.isRequired,
            rating: oneOfType([number, string]),
            small_image: shape({ url: string }),
            url_key: string.isRequired
        })
    ),
    categories: arrayOf(
        shape({
            id: string.isRequired,
            name: string.isRequired,
            url: string.isRequired
        })
    ),
    autocomplete: arrayOf(string),
    popularSearchTerms: arrayOf(string),
    searchValue: string,
    setVisible: func,
    visible: bool,
    handleCloseSearchBox: func,
    isAutoCompleteOpen: bool
};

export default Suggestions;
