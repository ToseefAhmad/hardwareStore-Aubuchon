import { gql } from '@apollo/client';

export const StoreMapFragment = gql`
    fragment StoreMapFragment on PickupStore {
        id
        latitude
        longitude
        address
        city
        region_code
        url_key
        zoom_level
    }
`;
