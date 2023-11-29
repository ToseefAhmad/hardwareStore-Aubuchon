const fs = require('fs');
const path = require('path');

const {
    graphQL: {
        getMediaURL,
        getStoreConfigData,
        getPossibleTypes,
        getAvailableStoresConfigData
    }
} = require('@magento/pwa-buildpack');

const {
    graphQL: {
        getDefaultPickupStore,
        getPickupStoreBrands,
        getGtmSettings,
        getPickupStoreList
    }
} = require(process.cwd() + '/src/buildpack');

if (!process.argv[2]) {
    throw new Error('Missing MEDIA argument.');
}

const FILE_NAME = 'buildQueryData.json';
const MEDIA_URL = process.argv[2];

const parseMedia = storeData => {
    storeData.mediaUrl = MEDIA_URL;
    storeData.storeConfigData.secure_base_media_url = MEDIA_URL;
    storeData.availableStores.availableStores = storeData.availableStores.availableStores.map(
        store => ({
            ...store,
            secure_base_media_url: MEDIA_URL
        })
    );
    const regex = /.*\/media\//;
    storeData.pickupStoreBrands = storeData.pickupStoreBrands.map(brand => ({
        ...brand,
        logo: brand.logo.replace(regex, MEDIA_URL)
    }));

    return storeData;
};

const storeBuildQueryData = async () => {
    const mediaUrl = await getMediaURL();
    const storeConfigData = await getStoreConfigData();
    const availableStores = await getAvailableStoresConfigData();
    const possibleTypes = await getPossibleTypes();
    const pickupStore = await getDefaultPickupStore();
    const pickupStoreBrands = await getPickupStoreBrands();
    const pickupStoreList = await getPickupStoreList();
    const gtmSettings = await getGtmSettings();

    const store = parseMedia({
        mediaUrl,
        storeConfigData,
        availableStores,
        possibleTypes,
        pickupStore,
        pickupStoreBrands,
        pickupStoreList,
        gtmSettings
    });

    fs.writeFileSync(
        path.join(process.cwd(), FILE_NAME),
        JSON.stringify(store, null, 4) + '\n'
    );
};

const getBuildQueryData = () => {
    try {
        return JSON.parse(fs.readFileSync(path.join(process.cwd(), FILE_NAME)));
    } catch (e) {
        return null;
    }
};

module.exports = {
    storeBuildQueryData,
    getBuildQueryData
};
