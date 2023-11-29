import gql from 'graphql-tag';

const REQUEST_PASSWORD_RESET_EMAIL_MUTATION = gql`
    mutation requestPasswordResetEmail($email: String!) {
        requestPasswordResetEmail(email: $email)
    }
`;

export default {
    mutations: {
        requestPasswordResetEmailMutation: REQUEST_PASSWORD_RESET_EMAIL_MUTATION
    }
};
