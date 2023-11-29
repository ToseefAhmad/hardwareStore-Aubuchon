import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
    query getCountries {
        countries {
            available_regions {
                code
                id
                name
            }
            full_name_english
            id
            two_letter_abbreviation
        }
    }
`;

export default {
    queries: {
        getCountriesQuery: GET_COUNTRIES
    }
};
