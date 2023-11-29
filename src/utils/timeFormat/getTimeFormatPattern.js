/**
 * @typedef {Object} NormalizedTimeData
 *
 * @property {number} [hour]
 * @property {number} [minute]
 */

/**
 * @param {NormalizedTimeData} normalizedTime
 * @param {boolean} forceFormatMinutes
 *
 * @return {string}
 */
export const getTimeFormatPattern = (normalizedTime, forceFormatMinutes) => {
    const shortTime = 'h A';
    const fullTime = 'h:mm A';

    if (forceFormatMinutes) {
        return fullTime;
    }

    return normalizedTime.minute ? fullTime : shortTime;
};
