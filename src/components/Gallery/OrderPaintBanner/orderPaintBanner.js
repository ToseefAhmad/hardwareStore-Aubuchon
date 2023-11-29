import classNames from 'classnames';
import { shape, string } from 'prop-types';
import React from 'react';

import CmsBlock from '@app/components/CmsBlock/cmsBlock';

import classes from './orderPaintBanner.module.css';

const OrderPaintBanner = ({ classes: propClasses }) => {
    return (
        <CmsBlock
            classes={{
                root: classNames(classes.root, propClasses.root),
                content: classes.content
            }}
            identifiers="order-paint-banner"
        />
    );
};

OrderPaintBanner.propTypes = {
    classes: shape({
        root: string
    })
};

export default OrderPaintBanner;
