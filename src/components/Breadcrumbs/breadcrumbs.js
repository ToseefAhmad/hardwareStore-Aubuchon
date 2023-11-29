import { shape, string } from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Breadcrumbs/breadcrumbs.shimmer';
import Icon from '@magento/venia-ui/lib/components/Icon';

import { RichSnippet } from '@app/components/Head';
import { ChevronRightSmall, ChevronLeftSmall } from '@app/components/Icons';

import defaultClasses from './breadcrumbs.module.css';
import { useBreadcrumbs } from './useBreadcrumbs';
import { useMobileBreadcrumbs } from './useMobileBreadcrumbs';

const DELIMITER = <Icon src={ChevronRightSmall} />;

/**
 * Breadcrumbs! Generates a sorted display of category links.
 *
 * @param {String} props.categoryId the uid of the category for which to generate breadcrumbs
 */
const Breadcrumbs = props => {
    const { categoryId, classes: propsClasses, currentProduct } = props;
    const classes = useStyle(defaultClasses, propsClasses);

    const talonProps = useBreadcrumbs({ categoryId, currentProduct });

    const {
        currentCategory,
        currentCategoryPath,
        hasError,
        isLoading,
        normalizedData,
        breadcrumbsStructuredData
    } = talonProps;

    const {
        elementRef,
        expanded,
        toggleExpanded,
        triggerRef
    } = useMobileBreadcrumbs();

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < 1024;

    const buttonClassName = expanded
        ? classes.button_open
        : classes.button_closed;

    // For all links generate a fragment like "> Text"
    const links = useMemo(() => {
        return normalizedData.map(({ text, path }) => {
            return (
                <Fragment key={text}>
                    <span className={classes.divider}>{DELIMITER}</span>
                    <Link className={classes.link} to={resourceUrl(path)}>
                        {text}
                    </Link>
                </Fragment>
            );
        });
    }, [classes.divider, classes.link, normalizedData]);

    // Check if there are no previous categories
    const location = useLocation();
    const isPrevPageHome = location.pathname.split('/').length === 2;

    // Don't display shimmer on category page if there are no previous categories
    if (isLoading && !isPrevPageHome && !currentProduct) {
        return <Shimmer isMobile={isMobile} classes={classes} />;
    }

    // Don't display breadcrumbs on category page if there are no previous categories
    if (isPrevPageHome && !currentProduct) {
        return (
            <div
                className={classes.emptyRoot}
                aria-live="polite"
                aria-busy="false"
            />
        );
    }

    // Don't display anything but the empty, static height div when there's an error.
    if (hasError) {
        return (
            <div
                className={classes.root}
                aria-live="polite"
                aria-busy="false"
            />
        );
    }

    // If we have a "currentProduct" it means we're on a PDP so we want the last
    // category text to be a link. If we don't have a "currentProduct" we're on
    // a category page so it should be regular text.
    const currentCategoryLink = currentProduct ? (
        <>
            <span className={classes.divider}>{DELIMITER}</span>
            <Link
                className={classes.link}
                to={resourceUrl(currentCategoryPath)}
            >
                {currentCategory}
            </Link>
        </>
    ) : null;

    const breadcrumbLinks = (
        <>
            <Link className={classes.link} to="/">
                Home
            </Link>
            {links}
            {currentCategoryLink}
        </>
    );

    return (
        <>
            <RichSnippet data={breadcrumbsStructuredData} />
            <div className={classes.root} aria-live="polite" aria-busy="false">
                {isMobile ? (
                    <button
                        ref={triggerRef}
                        className={buttonClassName}
                        aria-label="Toggle breadcrumb items menu"
                        onClick={toggleExpanded}
                        type="button"
                    >
                        <Icon
                            src={ChevronLeftSmall}
                            classes={{ icon: classes.icon }}
                        />
                    </button>
                ) : (
                    <div>{breadcrumbLinks}</div>
                )}
                {isMobile && expanded && (
                    <div className={classes.breadcrumbsMobile} ref={elementRef}>
                        {breadcrumbLinks}
                    </div>
                )}
            </div>
        </>
    );
};

Breadcrumbs.propTypes = {
    categoryId: string.isRequired,
    currentProduct: string,
    classes: shape({
        breadcrumbsMobile: string,
        button: string,
        button_closed: string,
        button_open: string,
        divider: string,
        emptyRoot: string,
        icon: string,
        link: string,
        root: string
    })
};

export default Breadcrumbs;
