import { string } from 'prop-types';
import React, { Fragment } from 'react';

import { Meta, StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { toCamelCase } from '@magento/venia-ui/lib/util/toCamelCase';

import RichContent from '@app/components/RichContent';
import AboutUsPage from '@app/pages/AboutUsPage';

import classes from './cms.module.css';
import { useCms } from './useCms';

const CMSPage = props => {
    const { cmsPage } = useCms(props);

    const {
        content_heading,
        title,
        meta_title,
        meta_description,
        meta_keywords,
        page_layout,
        content
    } = cmsPage;

    const headingElement =
        content_heading !== '' ? (
            <h1 className={classes.heading}>{content_heading}</h1>
        ) : null;

    const pageTitle = meta_title || title;
    const rootClassName = page_layout
        ? classes[`root_${toCamelCase(page_layout)}`]
        : classes.root;

    if (page_layout === 'about-us') {
        return (
            <AboutUsPage
                cmsPage={cmsPage}
                rootClassName={rootClassName}
                headingElement={headingElement}
            />
        );
    }

    return (
        <Fragment>
            <StoreTitle>{pageTitle}</StoreTitle>
            <Meta name="title" content={pageTitle} />
            <Meta name="description" content={meta_description} />
            <Meta name="keywords" content={meta_keywords} />
            <div className={cmsPage.url_key}>
                <article className={rootClassName}>
                    {headingElement}
                    <RichContent html={content} />
                </article>
            </div>
        </Fragment>
    );
};

CMSPage.propTypes = {
    identifier: string,
    url_key: string,
    content: string,
    content_heading: string,
    title: string,
    page_layout: string,
    meta_title: string,
    meta_keywords: string,
    meta_description: string
};

export default CMSPage;
