import { ORDER_STATUS_CODES } from '@app-constants';
import { useMemo } from 'react';

/**
 * StatusProgressBar component talon
 *
 * @param {string} statusCode
 */
export const useStatusProgressBar = ({ statusCode }) => {
    /**
     * Progress bar percentage values related to order status codes
     */
    const percentage = useMemo(() => {
        const { canceled, ready_for_pickup, complete } = ORDER_STATUS_CODES;

        switch (statusCode) {
            case canceled:
                return 0;
            case ready_for_pickup:
                return 75;
            case complete:
                return 100;
            default:
                return 25;
        }
    }, [statusCode]);

    return {
        percentage
    };
};
