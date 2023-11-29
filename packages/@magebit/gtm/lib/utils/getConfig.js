export const GTM_ENABLED = 'enabled';
export const GTM_LIST_PROPERTY_PLP = 'catalogPage';
export const GTM_LIST_PROPERTY_CROSSSELL = 'crossellBlock';
export const GTM_LIST_PROPERTY_PROMOTIONS = 'promotions';
export const GTM_LIST_PROPERTY_RELATED = 'relatedBlock';
export const GTM_LIST_PROPERTY_SEARCH = 'searchPage';
export const GTM_LIST_PROPERTY_UPSELL = 'upsellBlock';

/**
 * @type {{
 *     analytics_active: boolean,
 *     analytics_catalog_page: string,
 *     analytics_crosssell_block: string,
 *     analytics_promotions: string,
 *     analytics_related_block: string,
 *     analytics_search_page: string,
 *     analytics_upsell_block: string
 * }} DYNAMIC_CONFIG
 */
const DYNAMIC_CONFIG = GTM_SETTINGS || {};

/**
 * @type {{
 *     catalogPage: string,
 *     crosssellBlock: string,
 *     promotions: string,
 *     relatedBlock: string,
 *     searchPage: string,
 *     upsellBlock: string,
 * }} UPWARD_CONFIG
 */
const UPWARD_CONFIG = globalThis?.UPWARD?.gtmConfig || {};

const config = new Map([
    [GTM_ENABLED, !!UPWARD_CONFIG || !!DYNAMIC_CONFIG?.analytics_active],
    [GTM_LIST_PROPERTY_PLP, UPWARD_CONFIG?.catalogPage || DYNAMIC_CONFIG?.analytics_catalog_page],
    [GTM_LIST_PROPERTY_CROSSSELL, UPWARD_CONFIG?.crosssellBlock || DYNAMIC_CONFIG?.analytics_crosssell_block],
    [GTM_LIST_PROPERTY_PROMOTIONS, UPWARD_CONFIG?.promotions || DYNAMIC_CONFIG?.analytics_promotions],
    [GTM_LIST_PROPERTY_RELATED, UPWARD_CONFIG?.relatedBlock || DYNAMIC_CONFIG?.analytics_related_block],
    [GTM_LIST_PROPERTY_SEARCH, UPWARD_CONFIG?.searchPage || DYNAMIC_CONFIG?.analytics_search_page],
    [GTM_LIST_PROPERTY_UPSELL, UPWARD_CONFIG?.upsellBlock || DYNAMIC_CONFIG?.analytics_upsell_block]
]);

export const getConfig = (key = 'string') => {
    if (config.has(key)) {
        return config.get(key);
    }

    if (__DEV__) {
        console.error(`GTM config key "${key}" does not exist!`);
    }

    return null;
}
