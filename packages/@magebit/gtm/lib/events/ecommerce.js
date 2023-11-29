import { dataLayerPush } from "../utils";
import { getListName } from "./productsImpression";
import klevuApi from "@app/utils/Klevu";

const flatCategories = categoryArr => {
    const categories = {};

    categoryArr?.forEach((category, idx) => {
        categories[`item_category${idx > 0 ? idx + 1 : ''}`] = category.name;
    });

    return categories;
}

const itemToEcommerce = item => ({
    ...flatCategories(item.product.categories),
    item_brand: item.product.brand,
    item_id: item.product.id,
    item_name: item.product.name,
    brand: item.product.brand,
    price: item.prices.price.value,
    quantity: item.quantity
});

const payloadToEcommerce = payload => ({
    items: payload.items.map(itemToEcommerce)
});

export const infoStepEnter = async () => {
    dataLayerPush({
        event: 'checkout_info_step'
    });
}

export const continueAsGuest = async () => {
    dataLayerPush({
        event: 'checkout_continue_as_guest'
    });
}

export const lookupCustomer = async () => {
    dataLayerPush({
        event: 'checkout_lookup_customer'
    });
}

export const pickupStepEnter = async () => {
    dataLayerPush({
        event: 'checkout_pickup_step'
    });
}

export const selectShippingMethod = async () => {
    dataLayerPush({
        event: 'checkout_select_shipping_method'
    });
}

export const subscribeToTextUpdates = async () => {
    dataLayerPush({
        event: 'checkout_subscribe_to_text_update'
    });
}

export const selectPickupPerson = async () => {
    dataLayerPush({
        event: 'checkout_select_pickup_person'
    });
}

export const addShippingInfo = async (payload) => {
    dataLayerPush({
        event: 'add_shipping_info',
        ecommerce: payloadToEcommerce(payload)
    });
}

export const addPaymentInfo = async (payload) => {
    dataLayerPush({
        event: 'add_payment_info',
        ecommerce: payloadToEcommerce(payload)
    });
}

export const addToCart = async (payload) => {
    const addedCartItem = payload.items.find(item => item.product.uid === payload.added.uid);

    dataLayerPush({
        event: 'addToCart',
        ecommerce: {
            ...payloadToEcommerce(payload),
            add: {
                products: [{
                    ...flatCategories(payload.added.categories),
                    id: payload.added.sku,
                    item_id: payload.added.sku,
                    name: payload.added.name,
                    item_name: payload.added.name,
                    item_brand: payload.added.brand,
                    quantity: payload.added.quantity,
                    price: addedCartItem.prices.price.value
                }]
            },
            currencyCode: addedCartItem.prices.price.currency
        }
    })
}

export const checkoutView = async (payload) => {
    dataLayerPush({
        event: 'checkout',
        ecommerce: {
            ...payloadToEcommerce(payload),
            currencyCode: payload.items[0].prices.price.currency,
            checkout: {
                actionField: {
                    action: 'checkout',
                    description: 'shipping',
                    step: '1'
                },
                products: payload.items.map(item => ({
                    ...itemToEcommerce(item),
                    id: item.product.id,
                    name: item.product.name,
                    price: item.prices.price.value,
                    quantity: item.quantity
                }))
            }
        }
    });
}

export const purchase = async (payload) => {
    const taxes = payload.prices.applied_taxes;
    const tax = taxes.length > 1 ? taxes.map(taxEntry => taxEntry.amount.value) : taxes[0]?.amount?.value;
    const shippingAddresses = payload.shipping_addresses;
    const shipping =
        shippingAddresses.length > 1
            ? shippingAddresses.map(address => address.selected_shipping_method.amount.value)
            : shippingAddresses[0].selected_shipping_method.amount.value;
    const coupons = payload.applied_coupons?.length ? payload.applied_coupons : [];
    const coupon =
        coupons.length > 1
            ? coupons.map(coupon => coupon.code)
            : coupons[0]?.code;

    dataLayerPush({
        event: 'purchase',
        ecommerce: {
            purchase: {
                actionField: {
                    id: payload.orderInfo.order_number,
                    affiliation: payload.brand.name,
                    revenue: payload.prices.grand_total.value,
                    tax: tax || 0,
                    coupon,
                    shipping,
                },
                products: payload.items.map(item => ({
                    ...itemToEcommerce(item),
                    id: item.product.id,
                    name: item.product.name,
                    price: item.prices.price.value,
                    quantity: item.quantity
                }))
            },
            currencyCode: payload.prices.grand_total.currency,
        }
    });
}

export const productClick = async (payload) => {
    const listName = getListName(payload.origin);

    dataLayerPush({
        event: 'productClick',
        ecommerce: {
            click: {
                actionField: {
                    list: listName
                },
                products: [{
                    id: payload.sku,
                    name: payload.name,
                    category: payload.category,
                    list: listName,
                    position: payload.position
                }]
            }
        }
    });
}

export const productDetailView = async (payload) => {
    dataLayerPush({
        event: 'productDetail',
        ecommerce: {
            detail: {
                products: [{
                    id: payload.sku,
                    name: payload.name,
                    affiliation: payload.affiliation,
                    currency: payload.price_range.maximum_price.final_price.currency,
                    price: payload.price_range.maximum_price.final_price.value,
                    item_id: payload.sku,
                    item_name: payload.name,
                    item_brand: payload.brand,
                    ...flatCategories(payload.categories)
                }]
            },
            currencyCode: payload.price_range.maximum_price.final_price.currency
        }
    });
}

export const viewCart = async (payload) => {
    dataLayerPush({
        event: 'view_cart',
        ecommerce: payloadToEcommerce(payload)
    });
}

export const removeFromCart = async (payload) => {
    dataLayerPush({
        event: 'removeFromCart',
        ecommerce: {
            currencyCode: payload.currencyCode,
            remove: {
                products: payload.items.map(item => ({
                    ...flatCategories(item.product.categories),
                    item_brand: item.product.brand,
                    item_name: item.product.name,
                    item_id: item.product.sku,
                    price: item.prices.price.value,
                    quantity: item.quantity,
                    name: item.product.name,
                    id: item.product.sku
                }))
            }
        }
    });
}

export const klevuProductClick = async (payload) => {
    if (payload.origin === 'search') {
        klevuApi.trackSearchClick(payload);
    }
}

export const klevuSearchTerm = async (payload) => {
    dataLayerPush({
        event: 'VirtualPageview',
        klevusearchterm: `/search?klevusearchterm=${(payload || '').toLowerCase().replace(/\s/g, "+")}`
    });
}
