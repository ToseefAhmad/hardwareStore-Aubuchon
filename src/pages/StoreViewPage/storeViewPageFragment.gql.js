import { gql } from '@apollo/client';

export const StoreViewPageFragment = gql`
    fragment StoreViewPageFragment on PickupStore {
        id
        latitude
        longitude
        address
        city
        region_code
        region_name
        zipcode
        phone
        email
        images
        brand {
            uid
            name
        }
        schedule {
            uid
            day
            status
            open
            break_starts
            break_ends
            close
        }
        holidays {
            id
            name
            date_from
            date_to
            comment
        }
        specialDays {
            id
            name
            comment
            date_from
            date_to
            time_open
            time_close
            comment
        }
        tags {
            id
            name
            description
            icon
        }
        managers {
            id
            manager_name
            manager_image
            paint_manager_name
            paint_manager_image
        }
    }
`;
