import React from 'react';

import BestsellerCategoriesSlider from '@app/components/BestsellerCategoriesSlider';
import EmptyContent from '@app/components/EmptyContent';

import classes from './noProductsFound.module.css';

const NoProductsFound = () => {
    return (
        <div className={classes.root}>
            <EmptyContent />
            <BestsellerCategoriesSlider title="Top Categories For You" />
        </div>
    );
};

export default NoProductsFound;
