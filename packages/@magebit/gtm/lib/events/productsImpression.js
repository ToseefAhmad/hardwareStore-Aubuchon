import { dataLayerPush, getConfig } from "../utils";
import {
    GTM_LIST_PROPERTY_CROSSSELL,
    GTM_LIST_PROPERTY_PLP,
    GTM_LIST_PROPERTY_PROMOTIONS,
    GTM_LIST_PROPERTY_RELATED,
    GTM_LIST_PROPERTY_UPSELL,
    GTM_LIST_PROPERTY_SEARCH
} from "../utils/getConfig";

export const getListName = origin => {
    switch (origin) {
        case 'plp':
            return getConfig(GTM_LIST_PROPERTY_PLP);
        case 'promo':
            return getConfig(GTM_LIST_PROPERTY_PROMOTIONS);
        case 'crosssell':
            return getConfig(GTM_LIST_PROPERTY_CROSSSELL);
        case 'related':
            return getConfig(GTM_LIST_PROPERTY_RELATED);
        case 'upsell':
            return getConfig(GTM_LIST_PROPERTY_UPSELL);
        case 'search':
            return getConfig(GTM_LIST_PROPERTY_SEARCH);
        case 'pageBuilder':
            return 'Page Builder Widget'
        default:
            return origin;
    }
}

const buildPlpImpressionsFromPayload = payload => payload.items.map((item, position) => {
    const listName = getListName(payload.origin);
    const categories = {};

    item.simple_categories.forEach((category, idx) => {
        categories[`item_category${idx > 0 ? idx + 1 : ''}`] = category.name;
    });

    return {
        ...categories,
        name: item.name,
        item_name: item.name,
        item_brand: item.brand,
        item_id: item.sku,
        position: position + 1,
        affiliation: payload.affiliation,
        currency: item?.price_range?.maximum_price?.final_price?.currency,
        index: position,
        list: listName,
        item_list_name: listName,
        price: item?.price_range?.maximum_price?.final_price?.value
    }
});

const buildKlevuImpressionsFromPayload = payload => payload.items.map((item, position) => {
    const listName = getListName(payload.origin);
    const categories = {};

    (item?.category || '').split(';;').forEach((category, idx) => {
        categories[`item_category${idx > 0 ? idx + 1 : ''}`] = category;
    });

    return {
        ...categories,
        name: item.name,
        item_name: item.name,
        item_brand: item.brand,
        item_id: item.sku,
        position: position + 1,
        affiliation: payload.affiliation,
        currency: item.storeBaseCurrency,
        index: position,
        list: listName,
        item_list_name: listName,
        price: item.salePrice
    }
});

const productsImpression = async (payload) => {
    const firstItem = payload?.items?.length ? payload.items[0] : {};
    const impressions =
        'klevu_category' in firstItem
            ? buildKlevuImpressionsFromPayload(payload)
            : buildPlpImpressionsFromPayload(payload);

    dataLayerPush({
        event: 'productImpression',
        ecommerce: {
            impressions
        }
    });
}

export default productsImpression;
