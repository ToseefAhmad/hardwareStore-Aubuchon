import { gql } from '@apollo/client';

const GET_CLOSEST_STORE_MUTATION = gql`
    mutation getClosestStore($latitude: String!, $longitude: String!) {
        closestStore(input: { latitude: $latitude, longitude: $longitude }) {
            store_id
            store_name
            brand_id
        }
    }
`;

export default {
    getClosestStoreMutation: GET_CLOSEST_STORE_MUTATION
};
