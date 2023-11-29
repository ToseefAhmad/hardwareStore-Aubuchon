import { gql } from '@apollo/client';

export const GET_NAVIGATION_MENU = gql`
    query GetNavigationMenu($id: String!) {
        getNavigationMenu(id: $id) {
            uid
            name
            children {
                children_count
                uid
                name
                position
                url_path
                level
            }
            level
            children_count
            url_path
        }
    }
`;

export default {
    getNavigationMenuQuery: GET_NAVIGATION_MENU
};
