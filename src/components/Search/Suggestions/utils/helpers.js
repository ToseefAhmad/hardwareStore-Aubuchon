export const setSearchParams = (existing, options) => {
    const params = new URLSearchParams(existing);
    const { searchValue } = options;

    params.set('query', searchValue);

    return `${params}`;
};
