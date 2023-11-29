import { gql } from '@apollo/client';

import { CustomerDetailsFragment } from '@app/hooks/useAuthForm';

export const GET_CUSTOMER_DATA = gql`
    query GetCustomerData {
        customer {
            id
            ...CustomerDetailsFragment
        }
    }
    ${CustomerDetailsFragment}
`;
