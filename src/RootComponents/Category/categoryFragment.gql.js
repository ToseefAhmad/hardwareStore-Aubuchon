import { gql } from '@apollo/client';

/**
 * Fields provided in this fragment are used also in UPWARD connector.
 * If you edit this, make sure upward.yml is updated.
 *
 * @type {DocumentNode}
 * @todo Utilize this in magentoRoute.gql
 */
export const CategoryInitialDetailsFragment = gql`
    fragment CategoryInitialDetailsFragment on CategoryInterface {
        uid
        url_key
        is_active
        name
        categoryDescription: description
        meta_title
        meta_description
        meta_keywords
        breadcrumbs {
            category_uid
            category_name
        }
        menu {
            uid
            children {
                uid
                name
                url_path
            }
        }
        display_mode
        landing_page
        cms_block {
            content
        }
    }
`;
