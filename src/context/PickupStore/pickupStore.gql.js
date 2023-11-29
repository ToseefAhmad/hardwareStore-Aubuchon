import { gql } from '@apollo/client';

export const GET_CURRENT_PICKUP_STORE = gql`
    query getCurrentPickupStore {
        pickupStore {
            id
            url_key
            store_number
            latitude
            longitude
            address
            city
            region_code
            region_name
            zipcode
            zoom_level
            phone
            email
            images
            allow_curbside
            allow_pickup
            brand {
                uid
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
            notice_banner
        }
    }
`;
