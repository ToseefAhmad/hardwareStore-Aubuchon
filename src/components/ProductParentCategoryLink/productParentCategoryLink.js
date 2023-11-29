import classnames from 'classnames';
import { number, shape, string, arrayOf, func } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Link from '@app/components/Link';

import defaultClasses from './productParentCategoryLink.module.css';
import { useProductParentCategoryLink } from './useProductParentCategoryLink';

const ProductParentCategoryLink = ({
    categories,
    text,
    classes: propClasses,
    onClick
}) => {
    const classes = useStyle(defaultClasses, propClasses);
    const { url } = useProductParentCategoryLink({
        categories
    });

    return (
        <Link
            to={url}
            className={classnames(classes.root, classes.productCard)}
            onClick={onClick}
        >
            {text}
        </Link>
    );
};

ProductParentCategoryLink.defaultProps = {
    text: 'similar in stock items',
    onClick: () => {}
};

ProductParentCategoryLink.propTypes = {
    categories: arrayOf(
        shape({
            uid: string,
            level: number,
            url_path: string,
            url_suffix: string
        })
    ),
    text: string,
    classes: shape({
        root: string
    }),
    onClick: func
};

export default ProductParentCategoryLink;
