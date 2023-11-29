import { gql } from '@apollo/client';

const SIGN_OUT = gql`
    mutation SignOut {
        revokeCustomerToken {
            result
        }
    }
`;

export default {
    mutations: {
        signOutMutation: SIGN_OUT
    }
};
