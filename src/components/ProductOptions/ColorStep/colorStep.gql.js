import { gql } from '@apollo/client';

export const GET_PRODUCT_PAINT_COLORS_QUERY = gql`
    query getPaintColors {
        paintColors {
            uid
            label
            hex
            linked_value
        }
    }
`;

export default {
    queries: {
        getProductPaintColorsQuery: GET_PRODUCT_PAINT_COLORS_QUERY
    }
};
