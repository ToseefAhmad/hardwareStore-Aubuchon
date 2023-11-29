import { useLogo } from '@app/components/Logo/useLogo';

export const useOrganizationRichSnippet = () => {
    const origin = globalThis.location && globalThis.location.origin;
    const { logoUrl } = useLogo();

    const organizationStructuredData = {
        '@context': 'https://www.schema.org/',
        '@type': 'Organization',
        url: origin,
        logo: logoUrl
    };

    return {
        organizationStructuredData
    };
};
