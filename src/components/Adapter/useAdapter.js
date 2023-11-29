import { ApolloLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloClient } from '@apollo/client/core';
import { CachePersistor } from 'apollo-cache-persist';
import { useCallback, useEffect, useMemo, useState } from 'react';

import attachClient from '@magento/peregrine/lib/Apollo/attachClientToStore';
import { clearCartDataFromCache } from '@magento/peregrine/lib/Apollo/clearCartDataFromCache';
import { clearCustomerDataFromCache } from '@magento/peregrine/lib/Apollo/clearCustomerDataFromCache';
import { CACHE_PERSIST_PREFIX } from '@magento/peregrine/lib/Apollo/constants';
import getLinks from '@magento/peregrine/lib/Apollo/links';
import typePolicies from '@magento/peregrine/lib/Apollo/policies';
import { BrowserPersistence } from '@magento/peregrine/lib/util';

import { getIdbPersistence } from '@app/utils/idbPersistence';

const isPersistenceEnabled = false;
const isServer = !globalThis.document;
const storage = new BrowserPersistence();
const urlHasStoreCode = process.env.USE_STORE_CODE_IN_URL === 'true';

export const useAdapter = props => {
    const { apiUrl, configureLinks, origin, store, styles } = props;
    const storeCode = storage.getItem('store_view_code') || STORE_VIEW_CODE;
    const basename = urlHasStoreCode ? `/${storeCode}` : null;
    const [initialized, setInitialized] = useState(false);

    const apiBase = useMemo(
        () => apiUrl || new URL('/graphql', origin).toString(),
        [apiUrl, origin]
    );

    const apolloLink = useMemo(() => {
        let links = getLinks(apiBase);

        if (configureLinks) {
            links = configureLinks(links, apiBase);
        }

        return ApolloLink.from(Array.from(links.values()));
    }, [apiBase, configureLinks]);

    const createApolloClient = useCallback((cache, link) => {
        return new ApolloClient({
            cache,
            link,
            ssrMode: isServer
        });
    }, []);

    const createCachePersistor = useCallback(async (storeCode, cache) => {
        if (isServer || !isPersistenceEnabled) {
            return null;
        }

        const idbPersistence = await getIdbPersistence(storeCode);
        if (idbPersistence) {
            return new CachePersistor({
                key: CACHE_PERSIST_PREFIX,
                cache,
                storage: idbPersistence,
                debug: process.env.NODE_ENV === 'development',
                maxSize: 52428800 // 50MB
            });
        }

        return null;
    }, []);

    const clearCacheData = useCallback(async (client, cacheType) => {
        // Clear current store
        if (cacheType === 'cart') {
            await clearCartDataFromCache(client);
        } else if (cacheType === 'customer') {
            await clearCustomerDataFromCache(client);
        }
    }, []);

    const apolloClient = useMemo(() => {
        const client = createApolloClient(preInstantiatedCache, apolloLink);

        client.apiBase = apiBase;
        client.clearCacheData = clearCacheData;

        return client;
    }, [apiBase, apolloLink, clearCacheData, createApolloClient]);

    const getUserConfirmation = useCallback(async (message, callback) => {
        if (typeof globalThis.handleRouteChangeConfirmation === 'function') {
            return globalThis.handleRouteChangeConfirmation(message, callback);
        }

        return callback(globalThis.confirm(message));
    }, []);

    const apolloProps = { client: apolloClient };
    const reduxProps = { store };
    const routerProps = { basename, getUserConfirmation };
    const styleProps = { initialState: styles };

    // perform blocking async work here
    useEffect(() => {
        if (initialized) return;

        // immediately invoke this async function
        (async () => {
            // Configure cache persistor
            const storeCode = storage.getItem('store_view_code') || 'default';
            apolloClient.persistor = isServer
                ? null
                : await createCachePersistor(storeCode, preInstantiatedCache);

            // restore persisted data to the Apollo cache
            await apolloClient.persistor?.restore();

            // attach the Apollo client to the Redux store
            await attachClient(apolloClient);

            // mark this routine as complete
            setInitialized(true);
        })();
    }, [apolloClient, createCachePersistor, initialized]);

    return {
        apolloProps,
        initialized,
        reduxProps,
        routerProps,
        styleProps,
        urlHasStoreCode
    };
};

/**
 * To improve initial load time, create an apollo cache object as soon as
 * this module is executed, since it doesn't depend on any component props.
 * The tradeoff is that we may be creating an instance we don't end up needing.
 */
const preInstantiatedCache = new InMemoryCache({
    // POSSIBLE_TYPES is injected into the bundle by webpack at build time.
    possibleTypes: POSSIBLE_TYPES,
    typePolicies
});
