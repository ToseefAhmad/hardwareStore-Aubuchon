const { configureWebpack, graphQL } = require('@magento/pwa-buildpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const NoModulePlugin = require('webpack-nomodule-plugin').WebpackNoModulePlugin;
const webpack = require('webpack');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const themeConfig = require('./src/themes/themeConfig');
const { graphQL: customGraphQL } = require('./src/buildpack');
const { getBuildQueryData } = require('@magebit/pwa-studio-build-query');
const IconPathPlugin = require('./Webpack/plugins/IconPathPlugin');

const {
    getMediaURL,
    getStoreConfigData,
    getAvailableStoresConfigData,
    getPossibleTypes
} = graphQL;

const { getDefaultPickupStore, getGtmSettings, getPickupStoreBrands, getPickupStoreList } = customGraphQL;

const { DefinePlugin } = webpack;

const getCleanTemplate = templateFile => {
    return new Promise(resolve => {
        fs.readFile(templateFile, 'utf8', (err, data) => {
            resolve(
                data
                    .replace(
                        /(?<inlineddata><!-- Inlined Data -->.*\s<!-- \/Inlined Data -->)/gs,
                        ''
                    )
                    .replace(/(?<inlineddata><!-- UPWARD -->.*\s<!-- \/UPWARD -->)/gs, '')
                    .replace(/(?<inlineddata><!-- fbPixel -->.*\s<!-- \/fbPixel -->)/gs, '')
                    .replace(/(?<inlineddata><!-- fbPixel NS -->.*\s<!-- \/fbPixel NS -->)/gs, '')
                    .replace(/(?<inlineddata><!-- GTM -->.*\s<!-- \/GTM -->)/gs, '')
                    .replace(/(?<inlineddata><!-- GTM NS -->.*\s<!-- \/GTM NS -->)/gs, '')
                    .replace(
                        /(?<inlineddata><!-- Userway widget -->.*\s<!-- \/Userway widget -->)/gs,
                        ''
                    )
                    .replace(
                        /(?<inlineddata><!-- WKND tag -->.*\s<!-- \/WKND tag -->)/gs,
                        ''
                    )
            );
        });
    });
};

module.exports = async env => {
    /**
     * Set environment mode
     */
    process.env.NODE_ENV = (env && env.mode) || process.env.NODE_ENV || 'development';

    /**
     * configureWebpack() returns a regular Webpack configuration object.
     * You can customize the build by mutating the object here, as in
     * this example. Since it's a regular Webpack configuration, the object
     * supports the `module.noParse` option in Webpack, documented here:
     * https://webpack.js.org/configuration/module/#modulenoparse
     */
    const config = await configureWebpack({
        context: __dirname,
        vendor: [
            '@apollo/client',
            'apollo-cache-persist',
            'informed',
            'react',
            'react-dom',
            'react-feather',
            'react-redux',
            'react-router-dom',
            'redux',
            'redux-actions',
            'redux-thunk',
            '@react-aria',
            'nouislider'
        ],
        special: {
            'react-feather': {
                esModules: true
            }
        },
        env
    });

    config.entry = {
        polyfill: path.join(__dirname, 'src', 'polyfill.js'),
        ...config.entry
    };

    const storedData = process.env.NODE_ENV === 'production' && getBuildQueryData() || null;
    const mediaUrl = storedData && storedData.mediaUrl || await getMediaURL();
    const storeConfigData = storedData && storedData.storeConfigData || await getStoreConfigData();
    const { availableStores } = storedData && storedData.availableStores || await getAvailableStoresConfigData();
    const possibleTypes = storedData && storedData.possibleTypes || await getPossibleTypes();
    const pickupStore = storedData && storedData.pickupStore || await getDefaultPickupStore();
    const gtmSettings = storedData && storedData.gtmSettings || await getGtmSettings();
    const pickupStoreBrands = storedData && storedData.pickupStoreBrands || await getPickupStoreBrands();
    const pickupStoreList = storedData && storedData.pickupStoreList || await getPickupStoreList();
    const writeFile = promisify(fs.writeFile);

    /**
     * Loop the available stores when there is provided STORE_VIEW_CODE
     * in the .env file, because should set the store name from the
     * given store code instead of the default one.
     */
    const availableStore = availableStores.find(
        ({ store_code }) => store_code === process.env.STORE_VIEW_CODE
    );

    global.MAGENTO_MEDIA_BACKEND_URL = mediaUrl;
    global.LOCALE = storeConfigData.locale.replace('_', '-');
    global.AVAILABLE_STORE_VIEWS = availableStores;
    global.USERWAY_ACCOUNT_ID = process.env.USERWAY_ACCOUNT_ID;
    global.WUNDERKIND_TAG_URI = process.env.WUNDERKIND_TAG_URI;

    const htmlWebpackConfig = {
        filename: 'index.html',
        minify: {
            collapseWhitespace: true,
            removeComments: true
        }
    };

    // Strip UPWARD mustache from template file during watch
    if (
        process.env.npm_lifecycle_event &&
        process.env.npm_lifecycle_event.includes('watch')
    ) {
        const devTemplate = await getCleanTemplate('./template.html');

        // Generate new gitignored html file based on the cleaned template
        await writeFile('template.generated.html', devTemplate);
        htmlWebpackConfig.template = './template.generated.html';
    } else {
        htmlWebpackConfig.template = './template.html';
    }

    config.module.noParse = [
        /@adobe\/adobe\-client\-data\-layer/,
        /braintree\-web\-drop\-in/
    ];
    config.plugins = [
        ...config.plugins,
        new DefinePlugin({
            /**
             * Make sure to add the same constants to
             * the globals object in jest.config.js.
             */
            POSSIBLE_TYPES: JSON.stringify(possibleTypes),
            STORE_NAME: availableStore
                ? JSON.stringify(availableStore.store_name)
                : JSON.stringify(storeConfigData.store_name),
            STORE_VIEW_CODE: process.env.STORE_VIEW_CODE
                ? JSON.stringify(process.env.STORE_VIEW_CODE)
                : JSON.stringify(storeConfigData.code),
            AVAILABLE_STORE_VIEWS: JSON.stringify(availableStores),
            DEFAULT_LOCALE: JSON.stringify(global.LOCALE),
            DEFAULT_COUNTRY_CODE: JSON.stringify(
                process.env.DEFAULT_COUNTRY_CODE || 'US'
            ),
            __DEV__: process.env.NODE_ENV !== 'production',
            TAILWIND_CONFIG: JSON.stringify(themeConfig),
            DEFAULT_PICKUP_STORE: pickupStore.id,
            KLEVU_API_KEY: JSON.stringify(process.env.KLEVU_API_KEY),
            DEFAULT_BRAND_ID: JSON.stringify(pickupStore.brand?.uid),
            DYNAMIC_BRAND_LIST: process.env.NODE_ENV !== 'production' ? JSON.stringify(pickupStoreBrands) : null,
            DYNAMIC_STORE_LIST: process.env.NODE_ENV !== 'production' ? JSON.stringify(pickupStoreList) : null,
            GTM_SETTINGS: process.env.NODE_ENV !== 'production' ? JSON.stringify(gtmSettings) : null,
            GOOGLE_MAPS_API_KEY: JSON.stringify(
                process.env.GOOGLE_MAPS_API_KEY
            ),
            NON_CDN_TURNTO_URL: JSON.stringify(process.env.NON_CDN_TURNTO_URL),
            TEST_KEY: JSON.stringify(process.env.TEST_KEY),
            USERWAY_ACCOUNT_ID: JSON.stringify(process.env.USERWAY_ACCOUNT_ID),
            WUNDERKIND_BOUNCEX_MULTIPIXEL_URI: JSON.stringify(process.env.WUNDERKIND_BOUNCEX_MULTIPIXEL_URI)
        }),
        new IconPathPlugin({
            context: config.context,
        }),
        new HTMLWebpackPlugin(htmlWebpackConfig),
        new NoModulePlugin({
            filePatterns: ['/polyfill.**.js']
        }),
    ];

    /**
     * Add a split containing the common code between all the initially loaded files
     */
    config.optimization.splitChunks.cacheGroups.commons = {
        name: 'commons',
        chunks (chunk) {
            return chunk.name && (chunk.name.includes('client') || chunk.name.includes('RootCmp'));
        },
        minChunks: 2,
    };

    /**
     * Alias '@app' for the 'src' directory
     */
    config.resolve.alias['@app'] = path.resolve(__dirname, 'src');
    config.resolve.alias['@app-constants'] = path.resolve(
        __dirname,
        'src/constants'
    );

    return [config];
};
