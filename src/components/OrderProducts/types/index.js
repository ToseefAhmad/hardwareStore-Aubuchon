import { arrayOf, number, shape, string } from 'prop-types';

const IMoney = shape({
    currency: string,
    value: number
});

export const IOrderProduct = shape({
    id: string.isRequired,
    quantity_ordered: number.isRequired,
    product_name: string.isRequired,
    product_sku: string.isRequired,
    product_url_key: string.isRequired,
    discounts: arrayOf(
        shape({
            amount: IMoney.isRequired
        }).isRequired
    ).isRequired,
    product_thumbnail: shape({
        url: string.isRequired
    }).isRequired,
    tax_amount: IMoney.isRequired,
    price_incl_tax: IMoney.isRequired,
    row_total_incl_tax: IMoney.isRequired
});
