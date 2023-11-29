/**
 * This file is augmented at build time using the build target "Events".
 *
 * @see @magebit/events/lib/targets/Events.js
 */
/**
 * @type {Map<string, EventHandler[]>}
 */
const collection = new Map();

export default collection;

/**
 * @callback EventHandler
 * @param {{}} payload
 * @returns {void}
 */
