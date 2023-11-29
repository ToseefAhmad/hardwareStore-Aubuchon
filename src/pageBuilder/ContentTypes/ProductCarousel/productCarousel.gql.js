import { gql } from '@apollo/client';

import { ProductCardFragment } from '@app/components/ProductCard';

export const GET_CURBSIDE_FAVORITES = gql`
    query getCurbsideFavorite {
        curbsideFavorites {
            ...ProductCardFragment
        }
    }
    ${ProductCardFragment}
`;

export const GET_CUSTOMER_RECENT_PURCHASES = gql`
    query getCustomerRecentPurchases($loyaltyId: String) {
        customerRecentPurchases(loyaltyId: $loyaltyId) {
            ...ProductCardFragment
        }
    }
    ${ProductCardFragment}
`;

export const GET_CUSTOMER_RECOMMENDATIONS = gql`
    query getCustomerRecommendations($loyaltyId: String) {
        customerRecommendations(loyaltyId: $loyaltyId) {
            ...ProductCardFragment
        }
    }
    ${ProductCardFragment}
`;

export const GET_BESTSELLERS = gql`
    query getBestsellers {
        bestsellers {
            products {
                ...ProductCardFragment
            }
            categories {
                level
                items {
                    menuItem {
                        uid
                        name
                        url_path
                    }
                    productSkus
                }
            }
        }
    }
    ${ProductCardFragment}
`;
