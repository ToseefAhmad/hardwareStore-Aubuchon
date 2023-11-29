import { gql } from '@apollo/client';

export const CmsInitialDetailsFragment = gql`
    fragment CmsInitialDetailsFragment on CmsPage {
        identifier
        url_key
        content
        content_heading
        title
        page_layout
        meta_title
        meta_keywords
        meta_description
    }
`;
