import { useQuery } from '@apollo/client';
import { useFieldApi } from 'informed';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

import { GET_CURRENCY } from '@magento/peregrine/lib/talons/Header/currencySwitcher.gql.js';

import { getParts } from '@app/components/Price/price.js';

const preventCharacterTypo = event => {
    if (
        !/[0-9]|\./.test(event.key) ||
        (/\./.test(event.key) && event.target.value.indexOf('.') > 0)
    ) {
        event.preventDefault();
    }
};

export const usePriceFilter = (
    filterApi,
    filterState,
    group,
    items,
    onApply
) => {
    const minPrice = useFieldApi('min');
    const maxPrice = useFieldApi('max');
    const sliderRef = useRef();
    const { locale } = useIntl();

    const { data: currencyData } = useQuery(GET_CURRENCY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const currency = useMemo(
        () => currencyData?.default_display_currency_code || 'USD',
        [currencyData?.default_display_currency_code]
    );

    /* Default price based on filter aggregations */
    const defaultMinPrice = +items[0].value.split('_')[0];
    const defaultMaxPrice = +items[items.length - 1].value.split('_')[1];
    const initialPriceValues = filterState?.values().next()?.value?.value;

    /* Used price from state or default */
    const initialPrice = useMemo(() => {
        return initialPriceValues
            ? initialPriceValues
                  .split('_')
                  .map(item => parseFloat(item).toFixed(2))
            : [defaultMinPrice, defaultMaxPrice];
    }, [initialPriceValues, defaultMinPrice, defaultMaxPrice]);
    const [price, setPrice] = useState(initialPrice);

    const { updateItem } = filterApi;

    const handleChange = useCallback(
        value => {
            const item = {
                title: `${value[0]}-${value[1]}`,
                value: `${value[0]}_${value[1]}`
            };

            updateItem({ group, item });

            if (typeof onApply === 'function') {
                onApply(group, item);
            }

            minPrice.setValue(value[0]);
            maxPrice.setValue(value[1]);
            setPrice(value);
        },
        [group, updateItem, onApply, minPrice, maxPrice]
    );

    const inputHandler = useMemo(
        () =>
            debounce(() => {
                if (!maxPrice.getValue() || !minPrice.getValue()) return;

                const minValue = parseFloat(
                    minPrice.getValue() || defaultMinPrice.toString()
                ).toFixed(2);
                const maxValue = parseFloat(
                    maxPrice.getValue() || defaultMaxPrice.toString()
                ).toFixed(2);
                minPrice.setValue(minValue);
                maxPrice.setValue(maxValue);

                if (
                    Math.abs(minPrice.getValue()) >
                    Math.abs(maxPrice.getValue())
                ) {
                    maxPrice.setValue(minValue);
                }
                if (
                    Math.abs(maxPrice.getValue()) <
                    Math.abs(minPrice.getValue())
                ) {
                    minPrice.setValue(maxValue);
                }

                const newValues = [
                    minValue < defaultMinPrice
                        ? defaultMinPrice
                        : parseFloat(minPrice.getValue()).toFixed(2),
                    maxValue > defaultMaxPrice
                        ? defaultMaxPrice
                        : parseFloat(maxPrice.getValue()).toFixed(2)
                ];

                handleChange(newValues);
            }, 1500),
        [defaultMinPrice, defaultMaxPrice, minPrice, maxPrice, handleChange]
    );
    const { search } = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(search);
        let price = [defaultMinPrice.toFixed(2), defaultMaxPrice.toFixed(2)];
        const priceFromUrl = searchParams.get('price[filter]')
            ? searchParams.get('price[filter]').split(',')
            : [];

        if (!filterState) {
            /* Set current price from url */
            if (priceFromUrl.length) {
                const priceValues = priceFromUrl[0].split('-');
                const minPrice =
                    priceValues[0] < price[0] ? price[0] : priceValues[0];
                const maxPrice =
                    priceValues[1] > price[1] ? price[1] : priceValues[1];
                price = [minPrice, maxPrice];
            }
            setPrice(price);
            minPrice.setValue(price[0]);
            maxPrice.setValue(price[1]);
            sliderRef?.current.noUiSlider.reset();
        }
    }, [
        defaultMinPrice,
        defaultMaxPrice,
        filterState,
        minPrice,
        maxPrice,
        setPrice,
        search
    ]);

    const currencySign = useMemo(
        () => getParts(locale, currency, 0)[0]?.value,
        [locale, currency]
    );

    return {
        defaultValues: [defaultMinPrice, defaultMaxPrice],
        initialPrice,
        handleChange,
        price,
        inputHandler,
        preventCharacterTypo,
        currency: currencySign,
        sliderRef
    };
};
