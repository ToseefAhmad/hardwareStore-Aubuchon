import { arrayOf, number, shape, string } from 'prop-types';

import { IOrderProduct } from '@app/components/OrderProducts/types';

const IMoney = shape({
    currency: string,
    value: number
});

export const IOrderInfo = shape({
    id: string.isRequired,
    curbside_delivered_at: string,
    billing_address: shape({
        firstname: string.isRequired,
        lastname: string.isRequired
    }).isRequired,
    number: string.isRequired,
    order_date: string.isRequired,
    items: arrayOf(IOrderProduct).isRequired,
    payment_methods: arrayOf(
        shape({
            type: string.isRequired,
            name: string.isRequired,
            additional_data: arrayOf(
                shape({
                    name: string.isRequired,
                    value: string.isRequired
                })
            ).isRequired
        })
    ).isRequired,
    pickup_person: shape({
        firstname: string,
        lastname: string
    }).isRequired,
    pickup_store: shape({
        city: string.isRequired,
        region_code: string.isRequired
    }).isRequired,
    pickup_type: string.isRequired,
    status: string.isRequired,
    status_code: string.isRequired,
    total: shape({
        grand_total: IMoney.isRequired,
        discounts: arrayOf(
            shape({
                amount: IMoney.isRequired
            })
        ).isRequired,
        subtotal: IMoney.isRequired,
        total_tax: IMoney.isRequired
    })
});
