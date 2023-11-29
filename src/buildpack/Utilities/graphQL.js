const https = require('https');

const fetch = require('node-fetch');

const debug = require('@magento/pwa-buildpack/lib/util/debug').makeFileLogger(
    __filename
);

const graphQLQueries = require('../queries');

// To be used with `node-fetch` in order to allow self-signed certificates.
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const fetchQuery = query => {
    const targetURL = new URL('graphql', process.env.MAGENTO_BACKEND_URL);
    const headers = {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
        Accept: 'application/json',
        'User-Agent': 'pwa-buildpack',
        Host: targetURL.host
    };

    if (process.env.STORE_VIEW_CODE) {
        headers['store'] = process.env.STORE_VIEW_CODE;
    }

    debug('Fetching query: %s', query);

    return fetch(targetURL.toString(), {
        agent: targetURL.protocol === 'https:' ? httpsAgent : null,
        body: JSON.stringify({ query }),
        headers: headers,
        method: 'POST'
    })
        .then(result => {
            debug('Result received');
            debug('Status: %s', result.status);

            return result.json();
        })
        .catch(err => {
            debug('Error received: %s', err);

            console.error(err);

            throw err;
        })
        .then(json => {
            if (json && json.errors && json.errors.length > 0) {
                console.warn(
                    '\x1b[36m%s\x1b[0m',
                    'As of version 12.1.0, PWA Studio requires the appropriate PWA metapackage to be installed on the backend.\n' +
                        'For more information, refer to the 12.1.0 release notes here: https://github.com/magento/pwa-studio/releases/tag/v12.1.0'
                );

                return Promise.reject(
                    new Error(
                        json.errors[0].message +
                            ` (... ${json.errors.length} errors total)`
                    )
                );
            }

            return json.data;
        });
};

/**
 * An Async function that will asynchronously fetch the
 * pickup store config data from magento graphql server.
 *
 * @returns Promise that will resolve to the store config data.
 */
const getDefaultPickupStore = () => {
    return fetchQuery(graphQLQueries.getDefaultPickupStore).then(
        data => data.pickupStore
    );
};

/**
 * An Async function that will asynchronously fetch the
 * brand config data from magento graphql server.
 *
 * @returns Promise that will resolve to the store config data.
 */
const getPickupStoreBrands = () => {
    return fetchQuery(graphQLQueries.getPickupStoreBrands).then(
        data => data.pickupStoreBrands
    );
};

/**
 * An Async function that will asynchronously fetch the
 * gtm config data from magento graphql server.
 *
 * @returns Promise that will resolve to the store config data.
 */
const getGtmSettings = () => {
    return fetchQuery(graphQLQueries.getGtmSettings).then(
        data => data.storeConfig
    );
};

/**
 * An Async function that will asynchronously fetch the
 * store list branding data from magento graphql server.
 *
 * @returns Promise that will resolve to store list data.
 */
const getPickupStoreList = () => {
    return fetchQuery(graphQLQueries.getPickupStoreList).then(
        data => data.pickupStoreList
    );
};

module.exports = {
    getDefaultPickupStore,
    getGtmSettings,
    getPickupStoreBrands,
    getPickupStoreList
};
