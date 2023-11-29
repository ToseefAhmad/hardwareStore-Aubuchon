import { useEffect, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { APP_ROUTER_PATHS } from '@app/constants';
import { useBrandContext } from '@app/context/Brand';

/*
 * This hook allows specific pages to have branding different from the current pickup store branding
 * */
export const useIndividualPageBranding = () => {
    const [{ brandList }, { setBrandOverride }] = useBrandContext();
    const { pathname } = useLocation();

    // If on About page, get its brand
    const aboutUsPageBrand = useMemo(
        () =>
            brandList.find(
                ({ cms_about_us_page }) => '/' + cms_about_us_page === pathname
            ),
        [pathname, brandList]
    );
    // If on Store Details page, get its brand
    const storeDetailsPageBrand = useMemo(() => {
        const pageData = matchPath(pathname, {
            path: APP_ROUTER_PATHS.storeDetailsPage,
            exact: true
        });
        if (!pageData) return null;

        const storeList =
            globalThis?.UPWARD?.pickupStoreList || DYNAMIC_STORE_LIST;
        const store = storeList.find(
            ({ url_key }) => url_key === pageData.params.id
        );
        return brandList.find(({ uid }) => uid === store?.brand.uid);
    }, [pathname, brandList]);

    // Updating brand colors if currently on About Us or Store Details page
    useEffect(() => {
        if (aboutUsPageBrand || storeDetailsPageBrand) {
            setBrandOverride(aboutUsPageBrand || storeDetailsPageBrand);
        } else {
            setBrandOverride(null);
        }
    }, [aboutUsPageBrand, storeDetailsPageBrand, setBrandOverride]);
};
