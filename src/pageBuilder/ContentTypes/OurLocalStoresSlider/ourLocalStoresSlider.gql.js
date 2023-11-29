import { gql } from '@apollo/client';

export const GET_LOCAL_STORES_INFO = gql`
    query getLocalStoresInfo {
        pickupStoreBrands {
            logo
            name
            description
            uid
            primary_color
            cms_about_us_page
        }
    }
`;

export default {
    getLocalStoresQuery: GET_LOCAL_STORES_INFO
};
