import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import useGoogleRating from '@app/components/CheckoutFooter/GoogleRating/useGoogleRating';

import classes from './googleRating.module.css';
import StartRating from './StarsRating';

const GoogleRating = () => {
    const { rate, amount } = useGoogleRating();

    return (
        <div className={classes.root}>
            {rate ? (
                <StartRating rating={rate} />
            ) : (
                <Shimmer width="84px" height="15px" />
            )}

            <p>
                Rated <strong>{rate}</strong> based on{' '}
                <strong>{amount}+</strong> Google Reviews
            </p>
        </div>
    );
};

export default GoogleRating;
