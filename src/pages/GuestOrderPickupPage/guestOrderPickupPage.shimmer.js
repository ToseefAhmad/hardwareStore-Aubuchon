import React from 'react';

import { CurbsidePickupShimmer } from '@app/components/CurbsidePickup';
import PageHeadingShimmer from '@app/components/PageHeadingShimmer';

import classes from './guestOrderPickupPage.module.css';

const GuestOrderPickupPageShimmer = () => {
    return (
        <article className={classes.root}>
            <header className={classes.header}>
                <h1 className={classes.title}>
                    <PageHeadingShimmer width="300px" />
                </h1>
            </header>
            <section className={classes.content}>
                <CurbsidePickupShimmer />
            </section>
        </article>
    );
};

export default GuestOrderPickupPageShimmer;
