import { get, set, del, createStore } from 'idb-keyval';

/**
 * Persistence layer based on IndexedDb
 */
export default class IdbPersistence {
    static KEY = 'HARDWARE_STORE_PERSISTENCE';

    constructor(idbStorage) {
        this.storage = idbStorage;
    }

    getItem(key) {
        return get(key, this.storage);
    }

    setItem(key, value) {
        return set(key, value, this.storage);
    }

    removeItem(key) {
        return del(key, this.storage);
    }
}

const ensureIdb = () => {
    return new Promise((resolve, reject) => {
        const dbTestKey = IdbPersistence.KEY + '_TEST';
        const dbReq = indexedDB.open(dbTestKey);
        dbReq.onsuccess = () => {
            indexedDB.deleteDatabase(dbTestKey);
            resolve(true);
        };
        dbReq.onerror = e => {
            reject(e);
        };
    });
};

export const getIdbPersistence = async store => {
    try {
        const idbTest = await ensureIdb();
        if (idbTest !== true) {
            console.error(idbTest);
            return null;
        }

        const storage = await createStore(IdbPersistence.KEY, store);
        return new IdbPersistence(storage);
    } catch (e) {
        console.error(e);
    }

    return null;
};
