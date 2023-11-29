import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

const storage = new BrowserPersistence();

export const populateUPWARDPickupStore = () => {
    const phpPickupStore = globalThis?.UPWARD?.pickupStoreId;
    const phpPickupStoreBrand = globalThis?.UPWARD?.pickupStoreBrandUid;

    if (phpPickupStore && phpPickupStoreBrand) {
        storage.setItem('pickupStoreId', phpPickupStore);
        storage.setItem('pickupStoreBrandUid', phpPickupStoreBrand);
    }
};

export const savePickupStoreId = id => {
    storage.setItem('pickupStoreId', id);
};

export const retrievePickupStoreId = () => {
    return storage.getItem('pickupStoreId');
};

export const savePickupStoreBrandUid = id => {
    storage.setItem('pickupStoreBrandUid', id);
};

export const retrievePickupStoreBrandUid = () => {
    return storage.getItem('pickupStoreBrandUid');
};

export const savePickupStoreBrandIdentifier = id => {
    storage.setItem('pickupStoreBrandIdentifier', id);
};
