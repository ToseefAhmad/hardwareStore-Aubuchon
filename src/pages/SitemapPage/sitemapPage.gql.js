import { gql } from '@apollo/client';

const GET_SITEMAP_CATEGORY_ITEMS = gql`
    query getSitemapItems($id: String!) {
        getNavigationMenu(id: $id) {
            uid
            children {
                uid
                name
                children {
                    uid
                    name
                    url_path
                    children {
                        uid
                        name
                        url_path
                    }
                }
            }
        }
    }
`;

const GET_STORE_LIST = gql`
    query GetStoreList {
        pickupStoreList {
            id
            city
            region_name
            region_code
            url_key
        }
    }
`;

export default {
    queries: {
        getSitemapCategoryItems: GET_SITEMAP_CATEGORY_ITEMS,
        getStoreListQuery: GET_STORE_LIST
    }
};
