import dayjs from 'dayjs';

import { getTimeFormatPattern } from '@app/utils/timeFormat/getTimeFormatPattern';
import { normalizeTimeData } from '@app/utils/timeFormat/normalizeTimeData';

/**
 * @typedef {Object} PickupStoreSchedule
 *
 * @property {string} day
 * @property {boolean} status
 * @property {string} open
 * @property {string} close
 * @property {string} break_starts
 * @property {string} break_ends
 * @property {string} break_close
 */

/**
 * @param {PickupStoreSchedule} dayData
 * @param {boolean} forceFormatMinutes
 *
 * @return {{close: string, open: string}}
 */
export const formatDayData = ({ dayData, forceFormatMinutes }) => {
    const normalizedOpenTime = dayData.open
        ? normalizeTimeData(dayData.open)
        : null;
    const normalizedCloseTime = dayData.close
        ? normalizeTimeData(dayData.close)
        : null;

    const open = normalizedOpenTime
        ? dayjs(normalizedOpenTime).format(
              getTimeFormatPattern(normalizedOpenTime, forceFormatMinutes)
          )
        : null;
    const close = normalizedCloseTime
        ? dayjs(normalizedCloseTime).format(
              getTimeFormatPattern(normalizedCloseTime, forceFormatMinutes)
          )
        : null;

    return {
        open,
        close
    };
};
