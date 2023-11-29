import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { GET_CURRENCY } from '@magento/peregrine/lib/talons/Header/currencySwitcher.gql.js';

const getPriceTitle = (values, locale, currency) => {
    const prices = values.split('_');
    const options = {
        style: 'currency',
        currency: currency || 'USD'
    };

    return `${new Intl.NumberFormat(locale, options).format(
        prices[0]
    )} - ${new Intl.NumberFormat(locale, options).format(prices[1])}`;
};

export const useCurrentFilter = (item, group) => {
    const isFormattedTitle = group === 'price';
    const { data: currencyData } = useQuery(GET_CURRENCY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !isFormattedTitle
    });
    const { locale } = useIntl();
    const currency = useMemo(
        () => currencyData?.default_display_currency_code,
        [currencyData?.default_display_currency_code]
    );

    return {
        formattedTitle: isFormattedTitle
            ? getPriceTitle(item.value, locale, currency)
            : item.title
    };
};
