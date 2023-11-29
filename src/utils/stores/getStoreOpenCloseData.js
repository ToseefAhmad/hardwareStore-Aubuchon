import dayjs from 'dayjs';

import { normalizeTimeData } from '@app/utils/timeFormat/normalizeTimeData.js';

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
 * @property {boolean} status
 * @property {string} open
 * @property {string} close
 * @property {string} break_starts
 * @property {string} break_ends
 * @property {string} break_close
 */

/**
 * @typedef {Object} PickupStoreSpecialDay
 *
 * @property {number} id
 * @property {string} name
 * @property {string} comment
 * @property {string} date_from
 * @property {string} date_to
 * @property {string} time_open
 * @property {string} time_close
 */

/**
 * @typedef {Object} TimeData
 *
 * @property {NormalizedTimeData|null} close
 * @property {NormalizedTimeData|null} open
 */

/**
 * @typedef {Object} GetOpenCloseDataResult
 *
 * @property {boolean} isOpen
 * @property {string} timeToOpen
 * @property {string} timeToClose
 */

/**
 * @param {Array<PickupStoreSchedule>} schedule
 * @param {Array<PickupStoreSpecialDay>} specialDays
 * @param {string} [timezone]
 *
 * @return {GetOpenCloseDataResult}
 */
export const getStoreOpenCloseData = ({
    schedule,
    specialDays,
    timezone = 'America/New_York'
}) => {
    const now = dayjs().tz(timezone);
    const scheduleDayData = schedule[now.day()];
    const scheduleDayOpenTime = scheduleDayData.open || '00:00';
    const scheduleDayCloseTime = scheduleDayData.close || '00:00';
    const isSunday = now.day() === 0;
    const isSundayClosed = isSunday && !schedule[0]?.status;

    /** @type TimeData */
    const time = {
        open: normalizeTimeData(scheduleDayOpenTime),
        close: normalizeTimeData(scheduleDayCloseTime)
    };
    let isOpen = false;
    let timeToClose = '';
    let timeToOpen = '';
    let specialDayComment = '';

    for (let i = 0; i < specialDays.length; i++) {
        const { date_from, date_to } = specialDays[i];

        if (now.isBetween(date_from, date_to, 'day', '[]')) {
            const { time_close } = specialDays[i];

            const normalizeTime = normalizeTimeData(time_close);
            specialDayComment = specialDays[i].comment;

            // If the special day goes all day - reset all time data,
            // otherwise just change the closing time
            time.close = normalizeTime.hour ? normalizeTime : null;
            time.open = time.close ? time.open : null;
            break;
        }
    }

    if (time.close) {
        const formattedTime = {
            open: dayjs(time.open).tz(timezone, true),
            close: dayjs(time.close).tz(timezone, true)
        };

        if (
            now.isBetween(
                formattedTime.open,
                formattedTime.close,
                'minutes',
                '[)'
            )
        ) {
            isOpen = true;
            timeToClose = formattedTime.close
                .format('h:mm a')
                .replace(/\s/g, '');
        } else {
            timeToOpen = formattedTime.open.format('h:mm a').replace(/\s/g, '');
        }
    }

    const storeWorkInfo = {
        specialDayComment,
        timeToOpen,
        timeToClose,
        isSundayClosed
    };

    return {
        isOpen,
        storeWorkInfo
    };
};
