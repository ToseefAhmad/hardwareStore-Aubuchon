import { gql } from '@apollo/client';

export const StoreListFragment = gql`
    fragment StoreListFragment on PickupStore {
        id
        city
        region_code
        latitude
        longitude
        url_key
        schedule {
            uid
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
        brand {
            uid
        }
    }
`;
