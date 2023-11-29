import { useCallback, useEffect } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

import { useRecentlySearchedContext } from '@app/context/recentlySearched';

export const useSearchBoxMobile = () => {
    const [{ drawer }, { closeDrawer }] = useAppContext();
    const [, { setRecentlySearched }] = useRecentlySearchedContext();
    const isOpen = drawer === 'searchbox';

    const handleCloseSearchBox = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    useEffect(() => {
        return closeDrawer;
    }, [closeDrawer]);

    const handleRemoveRecentlySearched = useCallback(() => {
        const storage = new BrowserPersistence();
        storage.removeItem('RECENTLY_SEARCHED');
        setRecentlySearched([]);
    }, [setRecentlySearched]);

    return {
        handleCloseSearchBox,
        isOpen,
        handleRemoveRecentlySearched
    };
};
