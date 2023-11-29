import { v4 as uuidv4 } from 'uuid';
import { fbq } from "../utils";

const itemToEcommerce = item => ({
    id: item.product.sku,
    quantity: item.quantity,
    item_price: item.prices.price.value
});

export const addToCart = async (payload) => {
    const addedCartItem = payload.items.find(item => item.product.uid === payload.added.uid);
    fbq(
        'track',
        'AddToCart',
        {
            content_type: 'product',
            contents: [itemToEcommerce(addedCartItem)],
            value: addedCartItem.prices.price.value,
            currency: addedCartItem.prices.price.currency
        },
        {
            eventID: payload.meta_event_id || uuidv4()
        }
    );
}

export const checkoutView = async (payload) => {
    fbq(
        'track',
        'InitiateCheckout',
        {
            content_type: 'product',
            contents: payload.items?.map(itemToEcommerce) || [],
            num_items: payload.items?.length || 0,
            value: payload.prices.grand_total.value,
            currency: payload.prices.grand_total.currency
        },
        {
            eventID: payload.meta_event_id || uuidv4()
        }
    );
}

export const purchase = async (payload) => {
    fbq(
        'track',
        'Purchase',
        {
            content_type: 'product',
            contents: payload.items?.map(itemToEcommerce) || [],
            content_ids: payload.items?.map(item => item.product.sku).join(',') || '',
            num_items: payload.items?.length || 0,
            value: payload.prices.grand_total.value,
            currency: payload.prices.grand_total.currency
        },
        {
            eventID: payload.orderInfo?.meta_event_id || uuidv4()
        }
    );
}
