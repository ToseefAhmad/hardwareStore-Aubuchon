import { shape, string } from 'prop-types';
import React, { Fragment, Suspense } from 'react';
import { Link, Route } from 'react-router-dom';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import PageLoadingIndicator from '@magento/venia-ui/lib/components/PageLoadingIndicator';

import Logo from '@app/components/Logo';
import NoticeBanner from '@app/components/NoticeBanner';

import defaultClasses from './header.module.css';
import { useHeader } from './useHeader';

const CartTrigger = React.lazy(() => import('./CartTrigger'));
const MembershipTrigger = React.lazy(() => import('./MembershipTrigger'));
const NavTrigger = React.lazy(() => import('./NavTrigger/navTrigger'));
const StoreSwitcher = React.lazy(() => import('./StoreSwitcher'));
const TopBar = React.lazy(() => import('./TopBar/topBar'));
const SearchBar = React.lazy(() => import('../Search'));

const Header = props => {
    const {
        hasBeenOffline,
        isOnline,
        searchRef,
        headerLogoSize,
        isMobile,
        isSearchHidden
    } = useHeader();
    const classes = useStyle(defaultClasses, props.classes);

    const mobileSearchClassName = isSearchHidden
        ? classes.mobileSearch_hidden
        : classes.mobileSearch;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );

    return (
        <Fragment>
            <header className={classes.root}>
                <NoticeBanner />
                {!isMobile && (
                    <Suspense fallback={null}>
                        <TopBar />
                    </Suspense>
                )}
                <div className={classes.toolbar}>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <div className={classes.primaryActions}>
                        <Suspense fallback={null}>
                            <NavTrigger />
                        </Suspense>
                    </div>
                    <Link
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                    >
                        <Logo
                            classes={{ logo: classes.logo }}
                            height={headerLogoSize.height}
                            width={headerLogoSize.width}
                        />
                    </Link>
                    {!isMobile && (
                        <div className={classes.switchersContainer}>
                            <div className={classes.switchers}>
                                <Suspense fallback={null}>
                                    <StoreSwitcher />
                                </Suspense>
                            </div>
                        </div>
                    )}
                    {!isMobile && (
                        <div className={classes.secondaryActions}>
                            <Suspense fallback={searchBarFallback}>
                                <Route>
                                    <SearchBar isOpen={true} ref={searchRef} />
                                </Route>
                            </Suspense>
                        </div>
                    )}
                    <Suspense fallback={null}>
                        <MembershipTrigger />
                        {!isMobile && <CartTrigger />}
                    </Suspense>
                </div>
                {!isMobile && (
                    <PageLoadingIndicator
                        classes={{
                            root_absolute: classes.pageIndicatorRoot,
                            indicator_off: classes.pageIndicatorOff,
                            indicator_loading: classes.pageIndicatorLoading,
                            indicator_done: classes.pageIndicatorDone
                        }}
                        absolute
                    />
                )}
            </header>
            {isMobile && (
                <div className={mobileSearchClassName}>
                    <Suspense fallback={searchBarFallback}>
                        <Route>
                            <SearchBar isOpen={true} ref={searchRef} />
                        </Route>
                    </Suspense>
                    <PageLoadingIndicator
                        classes={{
                            root_absolute: classes.pageIndicatorRoot,
                            indicator_off: classes.pageIndicatorOff,
                            indicator_loading: classes.pageIndicatorLoading,
                            indicator_done: classes.pageIndicatorDone
                        }}
                        absolute
                    />
                </div>
            )}
        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        root: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string,
        logoContainer: string,
        searchFallback: string,
        pageIndicatorRoot: string,
        header: string,
        container: string,
        input: string,
        loader: string,
        pageIndicatorOff: string,
        pageIndicatorDone: string,
        pageIndicatorLoading: string,
        mobileSearch: string
    })
};

export default Header;
