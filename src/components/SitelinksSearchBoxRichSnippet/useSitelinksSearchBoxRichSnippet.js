export const useSitelinksSearchBoxRichSnippet = () => {
    const baseUrl = globalThis.location.origin;

    const sitelinksSearchBoxStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'HardwareStore.com',
        url: baseUrl,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/search?query={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    };

    return {
        sitelinksSearchBoxStructuredData
    };
};
