import { useMemo } from 'react';

import { formatDayData } from '@app/utils/timeFormat/formatDayData';

/**
 * @typedef {Object} NormalizedTimeData
 *
 * @property {number} [hour]
 * @property {number} [minute]
 */

/**
 * @typedef {Object} PickupStoreSchedule
 *
 * @property {string} day
 * @property {bool} status
 * @property {string} open
 * @property {string} close
 * @property {string} break_starts
 * @property {string} break_ends
 * @property {string} break_close
 */

/**
 * @param {PickupStoreSchedule[]} schedule
 */
export const useStoreSchedule = ({ schedule }) => {
    const formattedSchedule = useMemo(() => {
        const sunday = formatDayData({ dayData: schedule[0] });
        const monday = formatDayData({ dayData: schedule[1] });
        const saturday = formatDayData({ dayData: schedule[6] });

        return {
            sunday,
            monday,
            saturday
        };
    }, [schedule]);

    return {
        formattedSchedule
    };
};
