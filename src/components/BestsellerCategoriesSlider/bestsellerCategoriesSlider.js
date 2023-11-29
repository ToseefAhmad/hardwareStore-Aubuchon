import { shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import LinkSlider from '@app/components/LinkSlider';

import defaultClasses from './bestsellerCategoriesSlider.module.css';
import { useBestsellerCategoriesSlider } from './useBestsellerCategoriesSlider';

const BestsellerCategoriesSlider = ({ title, classes: propClasses }) => {
    const classes = useStyle(defaultClasses, propClasses);
    const { bestsellerCategories, isLoading } = useBestsellerCategoriesSlider();

    if (!isLoading && !bestsellerCategories.length) {
        return null;
    }

    return (
        <div className={classes.root}>
            {!!title && <span className={classes.title}>{title}</span>}
            <LinkSlider links={bestsellerCategories} />
        </div>
    );
};

BestsellerCategoriesSlider.propTypes = {
    title: string,
    classes: shape({
        title: string
    })
};

export default BestsellerCategoriesSlider;
