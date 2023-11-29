import { element, shape, string } from 'prop-types';
import React from 'react';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import RichContent from '@magento/venia-ui/lib/components/RichContent';

import { Meta, StoreTitle, MetaStoreTitle } from '@app/components/Head';

import defaultClasses from './aboutUsPage.module.css';
import AboutUsPageShimmer from './aboutUsPage.shimmer';

const AboutUsPage = ({
    classes: propClasses,
    cmsPage,
    headingElement,
    rootClassName
}) => {
    const classes = mergeClasses(defaultClasses, propClasses);
    const {
        title,
        meta_title,
        meta_description,
        meta_keywords,
        content
    } = cmsPage;
    const pageTitle = meta_title || title;

    if (!cmsPage) {
        return <AboutUsPageShimmer />;
    }

    return (
        <div className={classes.root}>
            <StoreTitle>{pageTitle}</StoreTitle>
            <MetaStoreTitle name="title">{pageTitle}</MetaStoreTitle>
            <Meta name="description" content={meta_description} />
            <Meta name="keywords" content={meta_keywords} />
            <div className={cmsPage.url_key}>
                <article className={rootClassName}>
                    {headingElement}
                    <RichContent html={content} />
                </article>
            </div>
        </div>
    );
};

AboutUsPage.propTypes = {
    classes: shape({
        root: string
    }),
    cmsPage: shape({}),
    headingElement: element,
    rootClassName: string
};

export default AboutUsPage;
