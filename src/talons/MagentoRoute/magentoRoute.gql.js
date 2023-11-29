import { gql } from '@apollo/client';

export const RESOLVE_URL = gql`
    query ResolveURL($url: String!) {
        route(url: $url) {
            relative_url
            redirect_code
            type
            # ! Must match CmsInitialDetailsFragment
            ... on CmsPage {
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
            # eslint-disable-next-line @graphql-eslint/require-id-when-available
            # ! Must match ProductInitialDetailsFragment
            ... on ProductInterface {
                uid
                id
                __typename
                sku
                url_key
                name
                brand
                review_rating
                review_count
                description {
                    html
                }
                media_gallery {
                    url
                    label
                    position
                    disabled
                }
                meta_title
                meta_description
                meta_keyword
                manufacturer_part_number
                upc
            }
            # eslint-disable-next-line @graphql-eslint/require-id-when-available
            # ! Must match CategoryInitialDetailsFragment
            ... on CategoryInterface {
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
        }
    }
`;

export default {
    resolveUrlQuery: RESOLVE_URL
};
