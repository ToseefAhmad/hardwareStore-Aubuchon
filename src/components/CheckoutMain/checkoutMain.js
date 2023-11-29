import { bool, node, shape, string } from 'prop-types';
import React from 'react';

import { useScrollLock } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';

import CheckoutFooter from '@app/components/CheckoutFooter';
import CheckoutHeader from '@app/components/CheckoutHeader';

import defaultClasses from './checkoutMain.module.css';

const CheckoutMain = props => {
    const { children, isMasked } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);

    return (
        <main className={rootClass}>
            <CheckoutHeader />
            <div className={pageClass}>{children}</div>
            <CheckoutFooter />
        </main>
    );
};

CheckoutMain.propTypes = {
    children: node,
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};

export default CheckoutMain;
