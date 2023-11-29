import React from 'react';

import BestsellerCategoriesSlider from '@app/components/BestsellerCategoriesSlider';

import classes from './topCategoriesSlider.module.css';

const TopCategoriesSlider = props => {
    return (
        <BestsellerCategoriesSlider
            {...props}
            classes={{ root: classes.sliderRoot, title: classes.sliderTitle }}
        />
    );
};

TopCategoriesSlider.propTypes = BestsellerCategoriesSlider.propTypes;

export default TopCategoriesSlider;
