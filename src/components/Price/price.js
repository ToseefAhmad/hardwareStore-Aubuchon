import { number, string, shape, bool } from 'prop-types';
import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

import patches from '@magento/peregrine/lib/util/intlPatches';

export const getParts = (locale, currencyCode, value) => {
    return patches.toParts.call(
        new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            maximumFractionDigits: 2
        }),
        value
    );
};

const getPrice = parts => {
    return parts.map((part, i) => {
        const key = `${i}-${part.value}`;
        const currencyValue =
            part.type && part.type === 'currency' && `${part.value} `;

        return <span key={key}>{currencyValue || part.value}</span>;
    });
};

/**
 * The **Price** component is used anywhere a price needs to be displayed.
 *
 * Formatting of prices and currency symbol selection is handled entirely by the ECMAScript Internationalization API available in modern browsers.
 *
 * A [polyfill][] is required for any JavaScript runtime that does not have [Intl.NumberFormat.prototype.formatToParts][].
 *
 * [polyfill]: https://www.npmjs.com/package/intl
 * [Intl.NumberFormat.prototype.formatToParts]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
 */

const Price = ({
    classes,
    currencyCode,
    oldValue,
    value,
    minValue,
    maxValue,
    displayZeroValue
}) => {
    const { locale } = useIntl();

    if (maxValue) {
        const maxParts = getParts(locale, currencyCode, maxValue);
        const maxPrice = getPrice(maxParts);

        const minParts = getParts(locale, currencyCode, minValue);
        const minPrice = getPrice(minParts);

        return (
            <Fragment>
                {minValue === maxValue ? (
                    <span className={classes.price}>{maxPrice}</span>
                ) : (
                    <span className={classes.price}>
                        {minPrice} - {maxPrice}
                    </span>
                )}
            </Fragment>
        );
    }

    if (value || displayZeroValue) {
        const parts = getParts(locale, currencyCode, value);
        const price = getPrice(parts);
        let oldPrice;

        if (oldValue && oldValue > value) {
            const oldParts = getParts(locale, currencyCode, oldValue);
            oldPrice = getPrice(oldParts);
        }

        return (
            <Fragment>
                {value === oldValue || !oldPrice ? (
                    <span className={classes.price}>{price}</span>
                ) : (
                    <p>
                        <span className={classes.newPrice}>{price}</span>
                        <span className={classes.oldPrice}>{oldPrice}</span>
                    </p>
                )}
            </Fragment>
        );
    }

    return null;
};

Price.propTypes = {
    /**
     * Class names to use when styling this component
     */
    classes: shape({
        currency: string,
        integer: string,
        decimal: string,
        fraction: string,
        root: string,
        price: string,
        salePrice: string,
        newPrice: string,
        oldPrice: string
    }),
    /**
     * The numeric price
     */
    value: number,
    /**
     * The numeric old price
     */
    oldValue: number,
    /**
     * The numeric min price for configurable products
     */
    minValue: number,
    /**
     * The numeric max price for configurable products
     */
    maxValue: number,
    /**
     * A string with any of the currency code supported by Intl.NumberFormat
     */
    currencyCode: string.isRequired,
    /**
     * Makes it possible to display a 0.00 value
     */
    displayZeroValue: bool
};

Price.defaultProps = {
    classes: {},
    displayZeroValue: true
};

export default Price;
