import { gql } from '@apollo/client';

export const PickupStoreFragment = gql`
    fragment PickupStoreFragment on PickupStore {
        id
        store_number
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
        allow_curbside
        schedule {
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
