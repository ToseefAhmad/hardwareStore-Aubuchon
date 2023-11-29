import { useCallback, useMemo } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

/**
 * Returns props necessary to render a Suggestions component.
 *
 * @param {Object} props
 * @param {Object} props.items - product data from search results
 * @param {Object} props.defaultItems - product data from klevu dashboard
 * @param {string[]} props.popularSearchTerms - popular search terms from klevu dashboard
 * @param {string[]} props.autocomplete - whether the component is visible
 * @param {Object[]} props.categories - whether the component is visible
 * @param {Function} props.setVisible - callback to set `visible` state
 * @param {Boolean} props.visible - whether the component is visible
 */
export const useSuggestions = props => {
    const {
        items,
        defaultItems,
        popularSearchTerms,
        categories,
        autocomplete,
        setVisible,
        visible
    } = props;
    const [
        ,
        {
            actions: { setSearchValue }
        }
    ] = useAppContext();

    // hide after navigating to a suggested product
    const onNavigate = useCallback(() => {
        setVisible(false);
        setSearchValue('');
    }, [setVisible, setSearchValue]);

    const onNavigateHelpfulLink = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    // avoid rendering if data is empty
    const shouldRender = !!(
        visible &&
        (items || defaultItems || popularSearchTerms)
    );

    const shouldRenderPopularTerms = useMemo(
        () =>
            popularSearchTerms &&
            !autocomplete?.length &&
            !categories?.length &&
            !items?.length,
        [autocomplete, popularSearchTerms, categories, items]
    );

    return {
        onNavigate,
        onNavigateHelpfulLink,
        shouldRender,
        shouldRenderPopularTerms
    };
};
