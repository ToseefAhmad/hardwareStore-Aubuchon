import { node } from 'prop-types';
import React, { createContext, useContext, useCallback, useState } from 'react';

import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

const RecentlySearchedContext = createContext();
const RECENTLY_SEARCHED_KEY = 'RECENTLY_SEARCHED';
const storage = new BrowserPersistence();

const RecentlySearchedContextProvider = ({ children }) => {
    const data = storage.getItem(RECENTLY_SEARCHED_KEY) || [];

    const [recentlySearched, setRecentlySearched] = useState(data);

    const addRecentlySearched = useCallback(
        sku => {
            if (!sku) {
                return;
            }

            // If search term already not in recently viewed list, add to it
            if (!recentlySearched.includes(sku)) {
                const result = [...recentlySearched];
                // Remove first item if list reaches a certain limit, to prevent storage limits
                if (result.length >= 8) {
                    result.shift();
                }

                result.push(sku);
                setRecentlySearched(result);

                storage.setItem(RECENTLY_SEARCHED_KEY, result);
            }
        },
        [recentlySearched]
    );

    return (
        <RecentlySearchedContext.Provider
            value={[
                recentlySearched,
                { addRecentlySearched, setRecentlySearched }
            ]}
        >
            {children}
        </RecentlySearchedContext.Provider>
    );
};

RecentlySearchedContextProvider.propTypes = {
    children: node
};

export default RecentlySearchedContextProvider;

export const useRecentlySearchedContext = () =>
    useContext(RecentlySearchedContext);
