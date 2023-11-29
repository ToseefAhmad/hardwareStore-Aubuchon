import { bool, func, number, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import navTransition from '@app/components/Navigation/navTransition.css';

import Branch from './categoryBranch';
import Leaf from './categoryLeaf';
import defaultClasses from './categoryTree.module.css';
import CategoryTreeShimmer from './categoryTree.shimmer';
import { useCategoryTree } from './useCategoryTree';

const CategoryTree = ({
    categoryId,
    categoryLength,
    classes: propsClasses,
    index,
    isRootVisible,
    onNavigate,
    setCategoryId,
    updateCategories
}) => {
    const { data, childCategories, categoryUrlSuffix } = useCategoryTree({
        categoryId,
        updateCategories
    });
    const classes = useStyle(defaultClasses, propsClasses, navTransition);
    const rootClass = isRootVisible
        ? classes.rootRight
        : index < categoryLength - 1
        ? classes.rootLeft
        : classes.root;

    // For each child category, render a direct link if it has no children
    // Otherwise render a branch
    const branches = data
        ? Array.from(childCategories, childCategory => {
              const [id, { category, isLeaf }] = childCategory;

              return isLeaf ? (
                  <Leaf
                      key={id}
                      category={category}
                      onNavigate={onNavigate}
                      categoryUrlSuffix={categoryUrlSuffix}
                  />
              ) : (
                  <Branch
                      key={id}
                      category={category}
                      setCategoryId={setCategoryId}
                  />
              );
          })
        : null;

    return (
        <div className={rootClass}>
            <ul>{branches || <CategoryTreeShimmer />}</ul>
        </div>
    );
};

CategoryTree.propTypes = {
    categoryId: string,
    categoryLength: number,
    classes: shape({
        root: string,
        rootLeft: string,
        rootRight: string
    }),
    index: number,
    onNavigate: func.isRequired,
    setCategoryId: func.isRequired,
    updateCategories: func.isRequired,
    isRootVisible: bool
};

export default CategoryTree;
