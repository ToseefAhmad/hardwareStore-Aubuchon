import { node } from 'prop-types';
import React, {
    createContext,
    useContext,
    useEffect,
    useCallback,
    useState
} from 'react';

import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

const RecentlyViewedProductsContext = createContext();
const RECENTLY_VIEWED_PRODUCTS_KEY = 'RECENTLY_VIEWED_PRODUCTS';
const storage = new BrowserPersistence();

const RecentlyViewedProductsContextProvider = ({ children }) => {
    const data = storage.getItem(RECENTLY_VIEWED_PRODUCTS_KEY) || [];

    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState(data);

    const addRecentlyViewedProduct = useCallback(
        sku => {
            if (!sku) {
                return;
            }

            // If product already not in recently viewed list, add to it
            if (!recentlyViewedProducts.includes(sku)) {
                const result = [...recentlyViewedProducts];
                // Remove first item if list reaches a certain limit, to prevent storage limits
                if (result.length >= 20) {
                    result.shift();
                }

                result.push(sku);
                setRecentlyViewedProducts(result);

                // ttl 10800000 ≈ 3 hours
                storage.setItem(RECENTLY_VIEWED_PRODUCTS_KEY, result, 10800000);
            }
        },
        [recentlyViewedProducts]
    );

    useEffect(() => {
        const item = storage.getRawItem(RECENTLY_VIEWED_PRODUCTS_KEY);

        if (item) {
            const { ttl, timeStored } = JSON.parse(item);
            const now = Date.now();

            if (now - timeStored > ttl) {
                storage.removeItem(RECENTLY_VIEWED_PRODUCTS_KEY);
                setRecentlyViewedProducts([]);
            }
        }
    }, []);

    return (
        <RecentlyViewedProductsContext.Provider
            value={[recentlyViewedProducts, { addRecentlyViewedProduct }]}
        >
            {children}
        </RecentlyViewedProductsContext.Provider>
    );
};

RecentlyViewedProductsContextProvider.propTypes = {
    children: node
};

export default RecentlyViewedProductsContextProvider;

export const useRecentlyViewedContext = () =>
    useContext(RecentlyViewedProductsContext);
