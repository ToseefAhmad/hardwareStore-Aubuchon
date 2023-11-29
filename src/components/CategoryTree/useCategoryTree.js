import { useLazyQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

import { useStoreConfig } from '@app/hooks/useStoreConfig';

import operations from './categoryTree.gql';

/**
 * @typedef {object} CategoryNode
 * @prop {object} category - category data
 * @prop {boolean} isLeaf - true if the category has no children
 */

/**
 * @typedef { import("graphql").DocumentNode } DocumentNode
 */

/**
 * Returns props necessary to render a CategoryTree component.
 *
 * @param {object} props
 * @param {number} props.categoryId - category id for this node
 * @param {function} props.updateCategories - bound action creator
 * @param {boolean} props.isRoot - add root category
 * @return {{ childCategories: Map<number, CategoryNode> }}
 */
export const useCategoryTree = ({
    categoryId,
    updateCategories,
    isRoot = true
}) => {
    const { getNavigationMenuQuery } = operations;

    const [runQuery, queryResult] = useLazyQuery(getNavigationMenuQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const { data } = queryResult;

    const { storeConfig } = useStoreConfig({
        fields: ['category_url_suffix']
    });

    const categoryUrlSuffix = useMemo(() => {
        if (storeConfig) {
            return storeConfig?.category_url_suffix;
        }
    }, [storeConfig]);
    // fetch categories
    useEffect(() => {
        if (categoryId != null) {
            runQuery({ variables: { id: categoryId } });
        }
    }, [categoryId, runQuery]);

    // update redux with fetched categories
    useEffect(() => {
        if (data && data.getNavigationMenu) {
            updateCategories(data.getNavigationMenu);
        }
    }, [data, updateCategories]);

    const rootCategory = data && data.getNavigationMenu;

    const { children = [] } = rootCategory || {};

    const childCategories = useMemo(() => {
        const childCategories = new Map();

        // Add the root category when appropriate.
        if (rootCategory && rootCategory.url_path && isRoot) {
            childCategories.set(rootCategory.uid, {
                category: rootCategory,
                isLeaf: true
            });
        }

        children.map(category => {
            const isLeaf = !parseInt(category.children_count);
            childCategories.set(category.uid, { category, isLeaf });
        });

        return childCategories;
    }, [children, isRoot, rootCategory]);

    return {
        childCategories,
        data,
        categoryUrlSuffix
    };
};
