import { arrayOf, bool, shape, string } from 'prop-types';
import React, { Fragment, useMemo } from 'react';

import { Meta, StoreTitle } from '@magento/venia-ui/lib/components/Head';

import ErrorView from '@app/components/ErrorView';
import LinkSlider from '@app/components/LinkSlider';
import ProductLayeredListing from '@app/components/ProductLayeredListing';
import { useFocusedScroll } from '@app/hooks/useFocusedScroll';

import classes from './category.module.css';
import CategoryBanner from './CategoryBanner';
import { CmsBlock } from './CmsBlock';
import { useCategory } from './useCategory';

const Category = props => {
    const {
        category,
        metaTitle,
        cmsBlockContent,
        suggestedCategories
    } = useCategory(props);

    // Memoize to avoid renders from Apollo object updates
    const queryVariable = useMemo(
        () => ({ filter: { ['category_uid']: { eq: category.uid } } }),
        [category.uid]
    );

    useFocusedScroll();

    const suggestions = useMemo(
        () => (
            <LinkSlider
                links={suggestedCategories}
                classes={{ root: classes.sliderRoot, item: classes.sliderItem }}
                sliderProps={{ resetDependency: category.name }}
            />
        ),
        [category.name, suggestedCategories]
    );

    const derivedUrlKey = (globalThis.location?.pathname || '')
        .slice(1)
        .replace('.html', '');
    const banner = derivedUrlKey && <CategoryBanner urlKey={derivedUrlKey} />;
    const cmsBlock = <CmsBlock content={cmsBlockContent} />;

    const metaDescription =
        category.meta_description ||
        `Shop ${
            category.name
        } at your local hardware store and online at HardwareStore.com.`;

    if (!category.is_active) {
        return <ErrorView />;
    }

    return (
        <Fragment>
            <StoreTitle>{metaTitle}</StoreTitle>
            <Meta name="title" content={metaTitle} />
            <Meta name="description" content={metaDescription} />
            <Meta name="keywords" content={category.meta_keywords} />
            <ProductLayeredListing
                queryVariable={queryVariable}
                title={category.name}
                titleComponent={category.name}
                breadcrumbsRootId={category.uid}
                suggestions={suggestions}
                banner={banner}
                description={category.categoryDescription}
                cmsBlock={cmsBlock}
            />
        </Fragment>
    );
};

Category.propTypes = {
    uid: string.isRequired,
    url_key: string.isRequired,
    is_active: bool.isRequired,
    name: string.isRequired,
    categoryDescription: string,
    meta_title: string,
    meta_description: string,
    meta_keywords: string,
    breadcrumbs: arrayOf(
        shape({
            category_uid: string.isRequired,
            category_name: string.isRequired
        })
    ),
    menu: shape({
        uid: string.isRequired,
        children: arrayOf(
            shape({
                uid: string.isRequired,
                name: string.isRequired,
                url_path: string.isRequired
            })
        )
    }).isRequired
};

export default Category;
