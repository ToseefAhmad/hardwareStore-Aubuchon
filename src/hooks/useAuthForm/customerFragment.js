import { gql } from '@apollo/client';

export const CustomerDetailsFragment = gql`
    fragment CustomerDetailsFragment on Customer {
        uid
        email
        firstname
        lastname
        telephone
        loyalty_api_id
        date_of_birth
        default_billing
        default_shipping
        addresses {
            id
            default_billing
            default_shipping
            city
            region {
                region_code
            }
            country_code
            postcode
            telephone
        }
    }
`;
