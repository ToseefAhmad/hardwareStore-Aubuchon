import React from 'react';

import { OrderDetailsShimmer } from '@app/components/OrderDetails';
import PageHeadingShimmer from '@app/components/PageHeadingShimmer';

import classes from './guestOrderViewPage.module.css';

const GuestOrderViewPageShimmer = () => {
    return (
        <article className={classes.root}>
            <header className={classes.header}>
                <h1 className={classes.title}>
                    <PageHeadingShimmer width="300px" />
                </h1>
            </header>
            <section className={classes.content}>
                <OrderDetailsShimmer />
            </section>
        </article>
    );
};

export default GuestOrderViewPageShimmer;
