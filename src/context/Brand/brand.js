import { node } from 'prop-types';
import React, { createContext, useEffect, useContext, useState } from 'react';

import {
    retrievePickupStoreBrandUid,
    savePickupStoreBrandIdentifier
} from '@app/utils/stores/handleStoreStorage';

const BRAND_LIST = globalThis?.UPWARD?.brandList || DYNAMIC_BRAND_LIST;

const getBrandFromList = brandUid => {
    const uid = brandUid || DEFAULT_BRAND_ID;
    return (
        BRAND_LIST.find(brand => brand?.uid === uid) ||
        BRAND_LIST.find(() => true)
    );
};

const updateBrandColorVariables = brand => {
    const root = globalThis.document.documentElement;

    root.style.setProperty('--brand-primary-color', brand.primary_color);
    root.style.setProperty(
        '--brand-primary-hover-color',
        brand.primary_hover_color
    );
    root.style.setProperty(
        '--brand-primary-active-color',
        brand.primary_active_color
    );
    root.style.setProperty(
        '--brand-primary-light-color',
        `${brand.primary_color}1A`
    );
};

const BrandContext = createContext();

const BrandContextProvider = ({ children }) => {
    const [brand, setBrand] = useState(getBrandFromList());
    const [brandOverride, setBrandOverride] = useState(null);

    useEffect(() => {
        const currentPickupStoreBrand = getBrandFromList(
            retrievePickupStoreBrandUid()
        );
        setBrand(currentPickupStoreBrand);
    }, []);

    useEffect(() => {
        /*
         * Used to set brand colors for specific pages which branding do not match
         * current pickup store branding (like Store Details page and About page),
         * where the colors should not be updated globally
         * */
        if (brandOverride) {
            updateBrandColorVariables(brandOverride);
            return;
        }
        if (brand) {
            savePickupStoreBrandIdentifier(brand.identifier);
            updateBrandColorVariables(brand);
        }
    }, [brand, brandOverride]);

    return (
        <BrandContext.Provider
            value={[
                { brand, brandOverride, brandList: BRAND_LIST },
                { getBrandFromList, setBrand, setBrandOverride }
            ]}
        >
            {children}
        </BrandContext.Provider>
    );
};

BrandContextProvider.propTypes = {
    children: node
};

export default BrandContextProvider;

/**
 * @typedef {Object} Brand
 *
 * @property {string} uid Brand uid
 * @property {string} name Brand name
 * @property {string} identifier Brand identifier code
 * @property {string} logo Brand logo
 * @property {string} cms_about_us_page Brand About Us CMS Page identifier
 * @property {string} primary_color Brand primary color
 * @property {string} primary_hover_color Brand primary hover color
 * @property {string} primary_active_color Brand primary active color
 * @property {string} social_facebook Brand social media link for Facebook
 * @property {string} social_instagram Brand social media link for Instagram
 * @property {string} social_twitter Brand social media link for Twitter
 * @property {string} social_youtube Brand social media link for YouTube
 */

/**
 * @typedef {Object} BrandState
 *
 * @property {Brand} brand
 * @property {Brand} brandOverride
 * @property {Array<Brand>} brandList
 */

/**
 *  @typedef {Object} BrandActions
 *
 *  @property {function} getBrandFromList
 *  @property {function} setBrand
 *  @property {function} setBrandOverride
 */

/**
 * @returns {[BrandState, BrandActions]}
 */
export const useBrandContext = () => useContext(BrandContext);
