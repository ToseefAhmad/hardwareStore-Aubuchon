import React, { Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, Switch } from 'react-router-dom';

import { Meta, StoreTitle } from '@magento/venia-ui/lib/components/Head';

import AccountMenuItems from '@app/components/AccountMenu/accountMenuItems';
import Icon from '@app/components/Icon';
import { ChevronLeftSmall } from '@app/components/Icons';
import Link from '@app/components/Link';

import classes from './accountPagesSwitcher.module.css';
import { ACCOUNT_PAGES_CONFIG } from './config';
import { useAccountPagesSwitcher } from './useAccountPagesSwitcher';

const AccountPagesSwitcher = () => {
    const {
        routeConfig,
        isShownBackBtn,
        backBtnPath,
        meta_title,
        meta_description
    } = useAccountPagesSwitcher();

    return (
        <>
            <StoreTitle>{meta_title}</StoreTitle>
            <Meta name="title" content={meta_title} />
            <Meta name="description" content={meta_description} />
            <section className={classes.root}>
                <header className={classes.header}>
                    {isShownBackBtn && (
                        <Link
                            className={classes.backLink}
                            to={backBtnPath}
                            isButtonLike
                            priority="secondary"
                        >
                            <Icon src={ChevronLeftSmall} />
                        </Link>
                    )}
                    <h1 className={classes.title}>
                        <FormattedMessage
                            id={routeConfig.title.id}
                            defaultMessage={routeConfig.title.defaultMessage}
                        />
                    </h1>
                </header>
                <aside className={classes.sidebar}>
                    <div className={classes.menuWrap}>
                        <AccountMenuItems />
                    </div>
                </aside>
                <div className={classes.content}>
                    <Switch>
                        {ACCOUNT_PAGES_CONFIG.map(
                            ({ path, exact, Component, ComponentShimmer }) => (
                                <Route key={path} exact={exact} path={path}>
                                    <Suspense fallback={ComponentShimmer}>
                                        <Component />
                                    </Suspense>
                                </Route>
                            )
                        )}
                    </Switch>
                </div>
            </section>
        </>
    );
};

export default AccountPagesSwitcher;
