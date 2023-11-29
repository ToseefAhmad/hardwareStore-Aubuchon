import classNames from 'classnames';
import { shape, string } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './orderPaintBanner.shimmer.module.css';

const OrderPaintBannerShimmer = ({ classes: propClasses }) => (
    <Shimmer
        classes={{ root_rectangle: classNames(classes.root, propClasses.root) }}
    />
);

OrderPaintBannerShimmer.propTypes = {
    classes: shape({
        root: string
    })
};

export default OrderPaintBannerShimmer;
