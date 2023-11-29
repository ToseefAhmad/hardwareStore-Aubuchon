import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { useStoreConfig } from '@app/hooks/useStoreConfig';

import operations from './breadcrumbs.gql';

// Just in case the data is unsorted, lets sort it.
const sortCrumbs = (a, b) => a.category_level > b.category_level;

// Generates the path for the category.
const getPath = (path, suffix) => {
    if (path) {
        return `/${path}${suffix || ''}`;
    }

    // If there is no path this is just a dead link.
    return '#';
};

/**
 * Returns props necessary to render a Breadcrumbs component.
 *
 * @param {object} props
 * @param {object} props.query - the breadcrumb query
 * @param {string} props.categoryId - the id of the category for which to generate breadcrumbs
 * @return {{
 *   currentCategory: string,
 *   currentCategoryPath: string,
 *   isLoading: boolean,
 *   normalizedData: array,
 *   handleClick: function
 *   breadcrumbsStructuredData: object
 * }}
 */
export const useBreadcrumbs = props => {
    const { categoryId, currentProduct } = props;
    const { getBreadcrumbsQuery } = operations;

    const { data, loading, error } = useQuery(getBreadcrumbsQuery, {
        variables: { category_id: categoryId },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const { storeConfig } = useStoreConfig({ fields: ['category_url_suffix'] });

    const categoryUrlSuffix = useMemo(() => {
        if (storeConfig) {
            return storeConfig.category_url_suffix;
        }
    }, [storeConfig]);

    const currentCategory = useMemo(
        () =>
            (data &&
                data?.getCategoryBreadcrumbInformation &&
                data.getCategoryBreadcrumbInformation.name) ||
            '',
        [data]
    );

    const currentCategoryPath = useMemo(
        () =>
            (data &&
                data?.getCategoryBreadcrumbInformation &&
                `${
                    data.getCategoryBreadcrumbInformation.url_path
                }${categoryUrlSuffix || ''}`) ||
            '#',
        [categoryUrlSuffix, data]
    );

    // When we have breadcrumb data sort and normalize it for easy rendering.
    const normalizedData = useMemo(() => {
        if (data && data.getCategoryBreadcrumbInformation) {
            const breadcrumbData =
                data.getCategoryBreadcrumbInformation.breadcrumbs;
            return (
                breadcrumbData &&
                breadcrumbData
                    .map(category => ({
                        category_level: category.category_level,
                        text: category.category_name,
                        path: getPath(
                            category.category_url_path,
                            categoryUrlSuffix
                        )
                    }))
                    .sort(sortCrumbs)
            );
        }
    }, [categoryUrlSuffix, data]);

    const breadcrumbsStructuredData = useMemo(() => {
        const breadcrumbsList = [];
        const baseUrl = globalThis.location.origin;
        const currentPageUrl = globalThis.location.href;
        let currentPosition = 1;

        // Home page breadcrumb
        breadcrumbsList.push({
            '@type': 'ListItem',
            position: currentPosition,
            name: 'Home',
            item: baseUrl
        });

        // Category list breadcrumbs
        if (normalizedData) {
            breadcrumbsList.push(
                ...normalizedData.map(breadcrumb => {
                    const breadcrumbUrl = breadcrumb.path;
                    const url = baseUrl + breadcrumbUrl;
                    const categoryLevel = breadcrumb.category_level;
                    currentPosition = categoryLevel;

                    return {
                        '@type': 'ListItem',
                        position: categoryLevel,
                        name: breadcrumb.text,
                        item: url
                    };
                }, [])
            );
        }

        // Current category breadcrumb
        if (currentCategory) {
            const currentCategoryUrl = `${baseUrl}/${currentCategoryPath}`;

            breadcrumbsList.push({
                '@type': 'ListItem',
                position: currentPosition + 1,
                name: currentCategory,
                item: currentCategoryUrl
            });
        }

        // Current product breadcrumb
        if (currentProduct) {
            breadcrumbsList.push({
                '@type': 'ListItem',
                position: currentPosition + 2,
                name: currentProduct,
                item: currentPageUrl
            });
        }

        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbsList
        };
    }, [currentCategory, currentCategoryPath, currentProduct, normalizedData]);

    return {
        currentCategory,
        currentCategoryPath,
        isLoading: loading && !data,
        hasError: !!error,
        normalizedData: normalizedData || [],
        breadcrumbsStructuredData
    };
};
