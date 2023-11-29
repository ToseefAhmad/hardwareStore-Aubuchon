import { setContext } from '@apollo/client/link/context';

import { retrievePickupStoreId } from '@app/utils/stores/handleStoreStorage';

const pickupStoreSpecificOperations = [
    'getCurrentPickupStore',
    'getProductDetailForProductPage',
    'getItemsForPLP',
    'getAggregationsForPLP',
    'GetStoresListByProduct',
    'getBestsellerCategories'
];

const isPickupStoreSpecific = request => {
    return pickupStoreSpecificOperations.includes(request.operationName);
};

const isMutation = request => {
    return request?.query?.definitions?.find(
        definition => definition.operation === 'mutation'
    );
};

const isCart = request => {
    return Object.prototype.hasOwnProperty.call(request?.variables, 'cartId');
};

const isProductCard = request => {
    return request?.query?.definitions?.find(
        definition =>
            definition.kind === 'FragmentDefinition' &&
            definition.name?.value === 'ProductCardFragment'
    );
};

export default function createPickupStoreLink() {
    return setContext((request, { headers }) => {
        const extendedHeaders = {};

        // Only add this header in specific cases.
        // Otherwise, FPC needs to handle all requests x available stores.
        if (
            isCart(request) ||
            isMutation(request) ||
            isProductCard(request) ||
            isPickupStoreSpecific(request)
        ) {
            extendedHeaders['PickupStore'] =
                retrievePickupStoreId() || DEFAULT_PICKUP_STORE;
        }

        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                ...extendedHeaders
            }
        };
    });
}
