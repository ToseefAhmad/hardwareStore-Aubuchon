import { gql } from '@apollo/client';

const GET_STORES_LIST = gql`
    query GetStoresList {
        pickupStoreList {
            id
            address
            email
            images
            latitude
            longitude
            phone
            city
            region_code
            url_key
            brand {
                uid
            }
            schedule {
                uid
                day
                open
                close
                status
            }
            specialDays {
                date_from
                date_to
                time_open
                time_close
                comment
            }
            store_number
            zipcode
        }
    }
`;

export default {
    queries: {
        getStoresListQuery: GET_STORES_LIST
    }
};
