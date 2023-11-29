import React from 'react';

import { RichSnippet } from '@app/components/Head';

import { useSitelinksSearchBoxRichSnippet } from './useSitelinksSearchBoxRichSnippet';

const SitelinksSearchBoxRichSnippet = () => {
    const {
        sitelinksSearchBoxStructuredData
    } = useSitelinksSearchBoxRichSnippet();

    return <RichSnippet data={sitelinksSearchBoxStructuredData} />;
};

export default SitelinksSearchBoxRichSnippet;
