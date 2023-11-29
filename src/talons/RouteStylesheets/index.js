import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import COLLECTION from './collection';

export const useRouteStylesheet = () => {
    const { pathname } = useLocation();

    const routeStylesheetMap = useMemo(() => {
        const map = new Map();

        COLLECTION.forEach(({ path, loadStylesheet }) => {
            map.set(path, loadStylesheet);
        });

        return map;
    }, []);

    const translatedPathName = useMemo(() => {
        let translated = pathname;

        if (translated === '/') {
            translated = '/home';
        }

        return translated;
    }, [pathname]);

    useEffect(() => {
        if (routeStylesheetMap.has(translatedPathName)) {
            routeStylesheetMap.get(translatedPathName)();
        }
    }, [translatedPathName, routeStylesheetMap]);
};
