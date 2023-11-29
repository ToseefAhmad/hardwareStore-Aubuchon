import { gql } from '@apollo/client';

const GET_GOOGLE_REVIEWS = gql`
    query getGoogleReviews($pickupStoreId: Int!) {
        googleReviews(pickupStoreId: $pickupStoreId) {
            avg_rating
            total_reviews
            review_url
            reviews {
                comment
                created_at
                rating
                reviewer
                reviewer_image
            }
        }
    }
`;

export default {
    getGoogleReviewsQuery: GET_GOOGLE_REVIEWS
};
