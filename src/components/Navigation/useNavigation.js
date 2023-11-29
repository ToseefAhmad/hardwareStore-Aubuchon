import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCatalogContext } from '@magento/peregrine/lib/context/catalog';

import { useUserContext } from '@app/context/user';
import { useStoreConfig } from '@app/hooks/useStoreConfig';

export const useNavigation = () => {
    // Retrieve app state from context
    const [appState, { closeDrawer }] = useAppContext();
    const [catalogState, { actions: catalogActions }] = useCatalogContext();
    const [
        {
            currentUser,
            isSignedIn: isUserSignedIn,
            isGettingDetails: isUserGettingDetails
        }
    ] = useUserContext();
    const { pathname } = useLocation();

    const { storeConfig } = useStoreConfig({ fields: ['root_category_uid'] });

    const rootCategoryId = useMemo(() => {
        if (storeConfig) {
            return storeConfig.root_category_uid;
        }
    }, [storeConfig]);

    // Extract relevant data from app state
    const { drawer } = appState;
    const isOpen = drawer === 'nav';

    const { categories } = catalogState;
    const [categoryList, setCategoryList] = useState([]);
    const [categoryId, setCategoryId] = useState(rootCategoryId);
    const [view, setView] = useState('ROOT');
    const hasModal = view !== 'ROOT' && view !== 'CATEGORY';

    useEffect(() => {
        // On a fresh render with cold cache set the current category as root
        // Once the root category query completes.
        if (rootCategoryId && !categoryId) {
            setCategoryId(rootCategoryId);
        }
    }, [categoryId, rootCategoryId]);

    // Define local variables
    const category = categories[categoryId];
    const isTopLevel =
        categoryId === rootCategoryId && categoryList.length === 1;

    useEffect(() => {
        if (!category) return;

        const currentCategory = categoryList.some(
            listCategory => listCategory.uid === category?.uid
        );

        if (!currentCategory) {
            setCategoryList(list => [...list, category]);
        }
    }, [category, categoryList]);

    useEffect(() => {
        // Clear menu state if homepage
        if (pathname === '/') {
            setCategoryList([]);
            setView('ROOT');
            setCategoryId(rootCategoryId);
        }
    }, [pathname, rootCategoryId]);

    // Define handlers
    const handleBack = useCallback(() => {
        if (category && !isTopLevel) {
            setCategoryId(category.parentId);
            setCategoryList(list => [...list.splice(0, list.length - 1)]);
        } else if (view !== 'ROOT') {
            setView('ROOT');
        } else {
            closeDrawer();
        }
    }, [category, closeDrawer, isTopLevel, view]);

    const handleClose = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    const handleView = useCallback(
        view => {
            if (view === 'MENU') {
                setCategoryList([{ uid: rootCategoryId }]);
                setView('MENU');
                return;
            }

            setView(typeof view === 'string' ? view : 'ROOT');
        },
        [rootCategoryId]
    );

    return {
        catalogActions,
        handleBack,
        handleClose,
        isOpen,
        isTopLevel,
        setCategoryId,
        handleView,
        categoryList,
        currentUser,
        isUserSignedIn,
        isUserGettingDetails,
        view,
        hasModal
    };
};
