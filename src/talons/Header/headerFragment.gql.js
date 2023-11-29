import { gql } from '@apollo/client';

export const getRouteType = gql`
    query getRouteType($url: String!) {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        route(url: $url) {
            type
            ... on ProductInterface {
                uid
            }
            ... on CategoryInterface {
                uid
            }
            ... on CategoryTree {
                uid
            }
            ... on SimpleProduct {
                uid
            }
        }
    }
`;
