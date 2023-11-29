import { arrayOf, number, shape, string } from 'prop-types';

export const IStoreListItem = {
    store: shape({
        id: number.isRequired,
        city: string.isRequired,
        region_code: string.isRequired,
        schedule: arrayOf(
            shape({
                uid: string.isRequired,
                open: string.isRequired,
                close: string.isRequired
            }).isRequired
        ).isRequired,
        specialDays: arrayOf(
            shape({
                id: number.isRequired,
                date_from: string.isRequired,
                date_to: string.isRequired,
                time_open: string.isRequired,
                time_close: string.isRequired
            }).isRequired
        ).isRequired
    }),
    product: shape({
        sku: string.isRequired,
        pickup_store_inventory: shape({
            qty: number.isRequired
        }).isRequired
    }).isRequired
};
