import { arrayOf, func, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';

import mapProduct from '@magento/venia-ui/lib/util/mapProduct';

import SuggestedProduct from './SuggestedProduct';
import classes from './suggestedProducts.module.css';

const SuggestedProducts = props => {
    const { limit, onNavigate, products, searchTerm } = props;

    const items = products.slice(0, limit).map((product, idx) => {
        const hasBorder = idx >= limit / 2;

        return (
            <li key={product.id}>
                <SuggestedProduct
                    {...mapProduct(product)}
                    onNavigate={onNavigate}
                    hasBorder={hasBorder}
                    position={idx + 1}
                    searchTerm={searchTerm}
                />
            </li>
        );
    });

    return <ul className={classes.root}>{items}</ul>;
};

SuggestedProducts.propTypes = {
    limit: number,
    onNavigate: func,
    searchTerm: string,
    products: arrayOf(
        shape({
            id: oneOfType([number, string]).isRequired,
            name: string.isRequired,
            rating: oneOfType([number, string]),
            imageUrl: string,
            url: string,
            url_key: string,
            small_image: shape({ url: string })
        })
    ).isRequired
};

SuggestedProducts.defaultProps = {
    limit: 6,
    searchTerm: ''
};

export default SuggestedProducts;
