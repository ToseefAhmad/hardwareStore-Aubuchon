import React from 'react';

import { RichSnippet } from '@app/components/Head';

import { useOrganizationRichSnippet } from './useOrganizationRichSnippet';

const OrganizationRichSnippet = () => {
    const { organizationStructuredData } = useOrganizationRichSnippet();

    return <RichSnippet data={organizationStructuredData} />;
};

export default OrganizationRichSnippet;
