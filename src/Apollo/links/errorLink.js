import { onError } from '@apollo/client/link/error';
import getWithPath from 'lodash.get';
import setWithPath from 'lodash.set';

import { BrowserPersistence } from '@magento/peregrine/lib/util';

const storage = new BrowserPersistence();

export default function createErrorLink() {
    return onError(handler => {
        const { graphQLErrors, networkError, response } = handler;

        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) =>
                // eslint-disable-next-line no-console
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            );
        }

        if (networkError) {
            // eslint-disable-next-line no-console
            console.log(`[Network error]: ${networkError}`);
        }

        if (response) {
            const { data, errors } = response;
            let pathToCartItems;

            // It's within the GraphQL spec to receive data and errors, where
            // errors are merely informational and not intended to block. Almost
            // all existing components were not built with this in mind, so we
            // build special handling of this error message so we can deal with
            // it at the time we deem appropriate.
            errors.forEach(({ message, path }, index) => {
                if (
                    message === 'Some of the products are out of stock.' ||
                    message ===
                        'There are no source items with the in stock status' ||
                    message === 'The requested qty is not available'
                ) {
                    if (!pathToCartItems) {
                        pathToCartItems = path.slice(0, -1);
                    }

                    // Set the error to null to be cleaned up later
                    response.errors[index] = null;
                }

                if (message === "The current customer isn't authorized.") {
                    console.error(message);
                    storage.removeItem('signin_token');
                    globalThis.location?.reload();
                }
            });

            // indicator that we have some cleanup to perform on the response
            if (pathToCartItems) {
                const cartItems = getWithPath(data, pathToCartItems);
                const filteredCartItems = cartItems.filter(
                    cartItem => cartItem !== null
                );
                setWithPath(data, pathToCartItems, filteredCartItems);

                const filteredErrors = response.errors.filter(
                    error => error !== null
                );
                // If all errors were stock related and set to null, reset the error response so it doesn't throw
                response.errors = filteredErrors.length
                    ? filteredErrors
                    : undefined;
            }
        }
    });
}
