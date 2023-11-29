export const priceFormatter = ({ locale, currency, value }) => {
    const result = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2
    }).format(value);
    const firstNumberSymbolIndex = result.match(/\d/).index;
    const symbolsStrPart = result.substring(0, firstNumberSymbolIndex);
    const numbersStrPart = result.substring(
        firstNumberSymbolIndex,
        result.length
    );

    return `${symbolsStrPart} ${numbersStrPart}`;
};
