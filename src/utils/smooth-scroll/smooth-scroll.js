import { EASING_NAMES, EASING_FUNCTIONS } from './consts';

/**
 * A helper for calculating the scroll position on the current frame
 *
 * @param {number} start
 * @param {number} end
 * @param {number} elapsed
 * @param {number} duration
 * @param {function} easing
 *
 * @returns {number}
 */
const calcPosition = (start, end, elapsed, duration, easing) =>
    elapsed < duration
        ? start + (end - start) * easing(elapsed / duration)
        : end;

/**
 * Function for scrolling the element programmatically to the specified scroll point
 *
 * @param {HTMLElement} [container]
 * @param {Object} to
 * @param {number} [to.x]
 * @param {number} [to.y]
 * @param {number} [duration]
 * @param {string} [easing]
 *
 * @returns {Promise<void>}
 */
export const smoothScroll = ({
    container = document.scrollingElement || document.documentElement,
    to,
    duration = 1000,
    easing = EASING_NAMES.easeInOutCubic
}) => {
    return new Promise((resolve, reject) => {
        if (!EASING_FUNCTIONS[easing]) reject('Error: Unknown easing type!');

        let startTime;
        const start = {
            x: container.scrollLeft,
            y: container.scrollTop
        };

        const step = timestamp => {
            if (!startTime) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;
            const stepCoords = {
                x: 0,
                y: 0
            };

            if (!isNaN(to.x)) {
                stepCoords.x = calcPosition(
                    start.x,
                    to.x,
                    elapsed,
                    duration,
                    EASING_FUNCTIONS[easing]
                );
            }

            if (!isNaN(to.y)) {
                stepCoords.y = calcPosition(
                    start.y,
                    to.y,
                    elapsed,
                    duration,
                    EASING_FUNCTIONS[easing]
                );
            }

            container.scrollTo(stepCoords.x, stepCoords.y);

            if (elapsed < duration) {
                requestAnimationFrame(step);
            } else {
                resolve();
            }
        };

        requestAnimationFrame(step);
    });
};
