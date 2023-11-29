import React from 'react';

import { RichSnippet } from '@app/components/Head';

import { useCompanyRichSnippet } from './useCompanyRichSnippet';

const CompanyRichSnippet = () => {
    const { businessLocationsStructuredData } = useCompanyRichSnippet();

    return <RichSnippet data={businessLocationsStructuredData} />;
};

export default CompanyRichSnippet;
