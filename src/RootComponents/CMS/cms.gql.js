import { gql } from '@apollo/client';

import { CmsInitialDetailsFragment } from './cms.fragment.gql';

export const GET_CMS_PAGE = gql`
    query GetCmsPage($identifier: String!) {
        cmsPage(identifier: $identifier) {
            ...CmsInitialDetailsFragment
        }
    }
    ${CmsInitialDetailsFragment}
`;

export default {
    getCMSPageQuery: GET_CMS_PAGE
};
