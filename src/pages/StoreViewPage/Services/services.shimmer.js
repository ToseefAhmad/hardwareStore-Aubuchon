import { bool } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './services.shimmer.module.css';

const SERVICES_LENGTH = 25;

const ServicesShimmer = ({ isMobile }) => {
    const items = Array.from(Array(SERVICES_LENGTH).keys(), index => {
        return (
            <li
                className={`${classes.item} ${
                    index > 4 ? classes.hiddenItem : ''
                }`}
                key={index}
            >
                <Shimmer width="100%" height="100%" />
            </li>
        );
    });

    return (
        <>
            <div className={classes.root}>
                <p className={classes.title}>Services</p>
                <div className={classes.container}>
                    <ul className={classes.list}>{items}</ul>
                </div>
            </div>
            {isMobile && (
                <div className={classes.serviceToggle}>
                    <div className={classes.buttonContent}>
                        <Shimmer width="100%" height="100%" />
                    </div>
                </div>
            )}
        </>
    );
};

ServicesShimmer.propTypes = {
    isMobile: bool
};

export default ServicesShimmer;
