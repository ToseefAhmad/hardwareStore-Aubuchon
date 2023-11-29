import { gql } from '@apollo/client';

export const GET_BESTSELLER_CATEGORIES = gql`
    query getBestsellerCategories {
        bestsellers {
            categories {
                level
                items {
                    menuItem {
                        uid
                        name
                        url_path
                    }
                }
            }
        }
    }
`;

export default {
    queries: {
        getBestsellerCategoriesQuery: GET_BESTSELLER_CATEGORIES
    }
};
