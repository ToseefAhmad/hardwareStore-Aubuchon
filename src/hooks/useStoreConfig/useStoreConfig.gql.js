import { gql } from '@apollo/client';

export const getStoreConfigQuery = (fields = []) => gql`
    query getStoreConfig {
        storeConfig { store_code ${fields.join(' ')} }
    }
`;
