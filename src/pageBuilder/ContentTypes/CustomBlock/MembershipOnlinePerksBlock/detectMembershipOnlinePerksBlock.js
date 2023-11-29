/**
 * Determine if the content is FAQ block or not
 *
 * @param {string} content
 * @returns {boolean}
 */
export const detectMembershipOnlinePerksBlock = content => {
    return /class="onlinePerks/gi.test(content);
};
