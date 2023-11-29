import { APP_ROUTER_PATHS } from '@app-constants';
import { string } from 'prop-types';
import React, { useMemo } from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import PageHeadingShimmer from '@app/components/PageHeadingShimmer';

import classes from './accountPagesSwitcher.module.css';
import { ACCOUNT_PAGES_CONFIG } from './config';

const AccountPagesSwitcherShimmer = ({ matchedPath }) => {
    const { ComponentShimmer } = useMemo(
        () =>
            ACCOUNT_PAGES_CONFIG.find(route => route.path === matchedPath) ||
            {},
        [matchedPath]
    );

    return (
        <>
            <section className={classes.root}>
                <header className={classes.header}>
                    <h1 className={classes.title}>
                        <PageHeadingShimmer />
                    </h1>
                </header>
                <aside className={classes.sidebar}>
                    <Shimmer width="100%" height="412px" />
                </aside>
                <div className={classes.content}>
                    {ComponentShimmer}
                    {!ComponentShimmer && (
                        <Shimmer width="100%" height="500px" />
                    )}
                </div>
            </section>
        </>
    );
};

AccountPagesSwitcherShimmer.propTypes = {
    matchedPath: string
};

AccountPagesSwitcherShimmer.defaultProps = {
    matchedPath: APP_ROUTER_PATHS.accountPage
};

export default AccountPagesSwitcherShimmer;
