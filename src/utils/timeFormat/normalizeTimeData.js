/**
 * @typedef {Object} NormalizedTimeData
 *
 * @property {number} [hour]
 * @property {number} [minute]
 */

/**
 * @param {string} str
 *
 * @return {NormalizedTimeData}
 */
export const normalizeTimeData = str => {
    const separator = ':';
    const result = {};

    const splitStr = str.split(separator);

    if (splitStr.length) {
        const [hour, minute] = splitStr;

        result.hour = +hour;
        result.minute = +minute;
    }

    return result;
};
