import {
    element,
    object,
    objectOf,
    oneOfType,
    shape,
    string
} from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';

import Breadcrumbs from '@app/components/Breadcrumbs';
import Gallery from '@app/components/Gallery';
import Pagination from '@app/components/Pagination';
import RichContent from '@app/components/RichContent';
import { useTailwindContext } from '@app/context/tailwind';

import CurrentFilters from './CurrentFilters';
import FilterModal, { FilterModalTrigger } from './FilterModal';
import FilterSidebar from './FilterSidebar';
import NoProductsFound from './NoProductsFound';
import classes from './productLayeredListing.module.css';
import { ProductLayeredListingContext } from './ProductLayeredListingContext';
import SortButton from './SortButton';
import { useProductLayeredListing } from './useProductLayeredListing';

const ProductLayeredListing = ({
    queryVariable,
    title,
    titleComponent,
    banner,
    breadcrumbsRootId,
    suggestions,
    description,
    cmsBlock
}) => {
    const {
        contextState,
        isLoading,
        items,
        totalCount,
        pageControl,
        sortMethods,
        sortProps,
        isAggregationsLoading,
        hasError,
        isFilterApplied,
        origin,
        searchTerm
    } = useProductLayeredListing({ queryVariable });

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const shouldShowNoProductsFound =
        !isLoading && (totalCount <= 0 || hasError);

    return (
        <>
            <article className={classes.root}>
                {isMobile && suggestions}
                <div className={classes.header}>
                    {breadcrumbsRootId && (
                        <Breadcrumbs
                            categoryId={breadcrumbsRootId}
                            classes={{
                                root: classes.breadcrumbsRoot,
                                emptyRoot: classes.breadcrumbsEmptyRoot
                            }}
                        />
                    )}
                    <h1>{titleComponent}</h1>
                </div>
                <ProductLayeredListingContext.Provider value={contextState}>
                    <div className={classes.contentWrapper}>
                        {!isMobile && (
                            <div className={classes.sidebar}>
                                <FilterSidebar
                                    isLoading={isAggregationsLoading}
                                />
                            </div>
                        )}
                        <div className={classes.content}>
                            {!shouldShowNoProductsFound && (
                                <div className={classes.heading}>
                                    {!isMobile && suggestions}
                                    {banner}
                                    {cmsBlock}
                                    <div className={classes.infoWrapper}>
                                        <div className={classes.info}>
                                            {totalCount > 0 && (
                                                <span>
                                                    <b>{totalCount}</b> results
                                                    for {title}
                                                </span>
                                            )}
                                        </div>
                                        <div className={classes.sortButton}>
                                            {sortMethods && (
                                                <SortButton
                                                    sortProps={sortProps}
                                                    availableSortMethods={
                                                        sortMethods
                                                    }
                                                />
                                            )}
                                        </div>
                                        {isMobile && (
                                            <FilterModalTrigger
                                                disabled={isAggregationsLoading}
                                            />
                                        )}
                                    </div>
                                    {!isMobile && isFilterApplied && (
                                        <div className={classes.headerButtons}>
                                            <div
                                                className={
                                                    classes.filterContainer
                                                }
                                            >
                                                <CurrentFilters />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {shouldShowNoProductsFound ? (
                                <NoProductsFound
                                    shouldShowFilterButtons={
                                        !isAggregationsLoading
                                    }
                                    isMobile={isMobile}
                                />
                            ) : (
                                <>
                                    <section>
                                        <Gallery
                                            items={items}
                                            categoryName={title}
                                            origin={origin}
                                            searchTerm={searchTerm}
                                        />
                                    </section>
                                    {pageControl.totalPages && (
                                        <div className={classes.pagination}>
                                            <Pagination
                                                classes={{
                                                    root: classes.paginationRoot
                                                }}
                                                pageControl={pageControl}
                                            />
                                        </div>
                                    )}
                                    {description && (
                                        <div className={classes.description}>
                                            <RichContent html={description} />
                                        </div>
                                    )}
                                    {isMobile && !isAggregationsLoading && (
                                        <FilterModal />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </ProductLayeredListingContext.Provider>
            </article>
        </>
    );
};

ProductLayeredListing.propTypes = {
    queryVariable: oneOfType([
        shape({ filter: objectOf(shape({ eq: string.isRequired })) }),
        shape({ search: string.isRequired })
    ]).isRequired,
    title: string,
    titleComponent: oneOfType([object, string]),
    breadcrumbsRootId: string,
    suggestions: element,
    banner: object,
    description: string,
    cmsBlock: object
};

export default ProductLayeredListing;
