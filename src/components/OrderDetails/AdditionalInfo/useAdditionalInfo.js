import dayjs from 'dayjs';
import { useMemo } from 'react';

/**
 * AdditionalInfo component talon
 *
 * @param {OrderInfo} orderInfo
 * @param {boolean} completed
 */
export const useAdditionalInfo = ({ orderInfo, completed }) => {
    /**
     * Additional order info
     */
    const additionalInfo = useMemo(() => {
        const {
            curbside_delivered_at,
            pickup_type,
            billing_address,
            pickup_person,
            pickup_store: { city, region_code }
        } = orderInfo;
        const firstName = pickup_person.firstname || billing_address.firstname;
        const lastName = pickup_person.lastname || billing_address.lastname;
        const storeLocation = `${city}, ${region_code}`;

        const result = [
            {
                label: 'Pickup Type:',
                value: pickup_type
            },
            {
                label: 'Store Location:',
                value: storeLocation
            },
            {
                label: 'Pickup person:',
                value: `${firstName} ${lastName}`
            }
        ];

        if (curbside_delivered_at && completed) {
            const date = dayjs(curbside_delivered_at).format('M/D/YY');

            result.unshift({
                label: 'Picked up on',
                value: `${date} at ${city}, ${region_code}`
            });
        }

        return result;
    }, [orderInfo, completed]);

    return {
        additionalInfo
    };
};

/**
 * JSDoc type definitions
 */

/**
 *  @typedef OrderInfo
 *
 *  @property {string|null} curbside_delivered_at
 *  @property {string} pickup_type
 *  @property {Object} billing_address
 *  @property {string} billing_address.firstname
 *  @property {string} billing_address.lastname
 *  @property {Object} pickup_person
 *  @property {string} pickup_person.firstname
 *  @property {string} pickup_person.lastname
 *  @property {Object} pickup_store
 *  @property {string} pickup_store.city
 *  @property {string} pickup_store.region_code
 */
