import { gql } from '@apollo/client';

export const SUBSCRIBE_TO_NEWSLETTER = gql`
    mutation SubscribeToNewsletter($email: String!) {
        subscribeEmailToNewsletter(email: $email) {
            loyalty_api_id
            status
        }
    }
`;

export default {
    subscribeMutation: SUBSCRIBE_TO_NEWSLETTER
};
