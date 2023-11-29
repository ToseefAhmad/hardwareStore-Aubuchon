export const ORDER_STATUS_CODES = {
    new_order: 'new',
    pending_payment: 'pending_payment',
    picked: 'picked',
    payment_review: 'payment_review',
    holded: 'holded',
    processing: 'processing',
    ready_for_pickup: 'ready_for_pickup',
    partially_picked: 'partially_picked',
    complete: 'complete',
    closed: 'closed',
    canceled: 'canceled'
};

export const ORDER_ITEM_STATUS_CODES = {
    cancelled: 'cancelled',
    ready_for_pickup: 'ready_for_pickup',
    delivered: 'delivered',
    bopis_completed: 'bopis_completed',
    boss_completed: 'boss_completed'
};

export const COMPLETED_ORDER_ITEM_STATUS_CODES = [
    ORDER_ITEM_STATUS_CODES.bopis_completed,
    ORDER_ITEM_STATUS_CODES.boss_completed,
    ORDER_ITEM_STATUS_CODES.delivered
];

export const ORDER_GROUP_STATUS_INFO = {
    canceled: {
        status_code: 'canceled',
        title: 'Order canceled'
    },
    complete: {
        status_code: 'complete',
        title: 'Your order has been picked up'
    },
    ready_for_pickup: {
        status_code: 'ready_for_pickup',
        title: 'Ready for Pickup!'
    },
    default: { status_code: 'new', title: 'Preparing order' }
};
