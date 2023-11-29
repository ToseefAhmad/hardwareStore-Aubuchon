import classNames from 'classnames';
import { bool, node } from 'prop-types';
import React from 'react';

import { useScrollLock } from '@magento/peregrine';

import Footer from '@app/components/Footer';
import Header from '@app/components/Header';

import classes from './main.module.css';
import { useMain } from './useMain';

const Main = ({ children, isMasked }) => {
    const { areSearchSuggestionsShown } = useMain();

    const rootClass = isMasked ? classes.root_masked : classes.root;

    useScrollLock(isMasked || areSearchSuggestionsShown);

    return (
        <main
            className={classNames(rootClass, {
                [classes.pageAndFooterMasked]: areSearchSuggestionsShown
            })}
        >
            <Header />
            <div className={classes.page}>{children}</div>
            <Footer />
        </main>
    );
};

Main.propTypes = {
    children: node,
    isMasked: bool
};

export default Main;
