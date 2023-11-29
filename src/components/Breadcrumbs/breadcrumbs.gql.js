import { gql } from '@apollo/client';

export const GET_BREADCRUMBS = gql`
    query getBreadcrumbs($category_id: String!) {
        getCategoryBreadcrumbInformation(uid: $category_id) {
            breadcrumbs {
                category_uid
                category_level
                category_name
                category_url_path
            }
            uid
            name
            url_path
        }
    }
`;

export default {
    getBreadcrumbsQuery: GET_BREADCRUMBS
};
