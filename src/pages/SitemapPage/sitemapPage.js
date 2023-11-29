import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Accordion } from '@magento/venia-ui/lib/components/Accordion';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

import { Meta } from '@app/components/Head';
import StoreLinks from '@app/pages/SitemapPage/StoreLinks';

import SitemapContentShimmer from './sitemapContent.shimmer';
import SitemapLinks from './SitemapLinks';
import classes from './sitemapPage.module.css';
import { useSiteMapPage } from './useSitemapPage';

const SITEMAP_DESCRIPTION =
    'Links to all HardwareStore.com website pages to make it easy to access what we offer';

const SiteMapPage = () => {
    const {
        loadingCategoryItems,
        loadingStoreList,
        error,
        pageData
    } = useSiteMapPage();

    const { storeListData, sitemapRootItems } = pageData;

    if (error) {
        return (
            <h1 className={classes.errorTitle}>
                <FormattedMessage
                    id="sitemapPage.errorTryAgain"
                    defaultMessage="Something went wrong. Please refresh and try again."
                />
            </h1>
        );
    }

    return (
        <>
            <StoreTitle>Site Map</StoreTitle>
            <Meta name="description" content={SITEMAP_DESCRIPTION} />
            <div className={classes.root}>
                <h1 className={classes.title}>Category Index</h1>
                {loadingCategoryItems || !sitemapRootItems ? (
                    <SitemapContentShimmer />
                ) : (
                    <Accordion canOpenMultiple={true}>
                        <div className={classes.container}>
                            {sitemapRootItems &&
                                sitemapRootItems.map(child => {
                                    return (
                                        <div
                                            key={child.uid}
                                            className={classes.categoryBlock}
                                        >
                                            <SitemapLinks
                                                uid={child.uid}
                                                name={child.name}
                                                items={child.children}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </Accordion>
                )}
            </div>
            <div className={classes.root}>
                <h1 className={classes.title}>Store Index</h1>
                {loadingStoreList ? (
                    <SitemapContentShimmer itemsCount={8} />
                ) : (
                    <Accordion canOpenMultiple={true}>
                        <div className={classes.container}>
                            {storeListData &&
                                storeListData.map(child => {
                                    return (
                                        <div
                                            key={child[0]}
                                            className={classes.categoryBlock}
                                        >
                                            <StoreLinks
                                                name={child[0]}
                                                items={child[1]}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </Accordion>
                )}
            </div>
        </>
    );
};

export default SiteMapPage;
